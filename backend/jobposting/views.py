import json
import pickle
from django.db.models import Q
from django.forms import ValidationError
from django.forms.models import model_to_dict
from django.shortcuts import render
from rest_framework import status
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import viewsets, authentication, permissions
from jobposting.models import (
    Job,
    Company,
    Industry,
    Location,
    Requirements,
)
from jobposting.serializers import (
    JobSerializer,
    CompanySerializer,
    IndustrySerializer,
    LocationSerializer,
    RequirementsSerializer
)
# Create your views here.
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))
model = pickle.load(open('model.pkl', 'rb'))

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all().order_by('job_id')
    serializer_class = JobSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

class IndustryViewSet(viewsets.ModelViewSet):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class RequirementsViewSet(viewsets.ModelViewSet):
    queryset = Requirements.objects.all()
    serializer_class = RequirementsSerializer

class RequirementsByID(APIView):
    queryset = Requirements.objects.all()

    def get(self, request, job_id):
        queryset = self.queryset.filter(job_id=job_id)
        serializer = RequirementsSerializer(queryset)
        return Response(data=serializer.data)

class LocationsInState(APIView):
    queryset = Location.objects.all()
    
    def get(self, request, state, *args, **kwargs):
        queryset = self.queryset.filter(state=state)
        serializer = LocationSerializer(queryset, many=True)
        return Response(data=serializer.data)

class LocationsInCountry(APIView):
    queryset = Location.objects.all()
    
    def get(self, request, country, *args, **kwargs):
        queryset = self.queryset.filter(country=country)
        serializer = LocationSerializer(queryset, many=True)
        return Response(data=serializer.data)

class LocationsInCity(APIView):
    queryset = Location.objects.all()
    
    def get(self, request, city, *args, **kwargs):
        queryset = self.queryset.filter(city=city)
        serializer = LocationSerializer(queryset, many=True)
        return Response(data=serializer.data)

class JobByID(APIView):
    queryset = Job.objects.all()

    def get(self, request, job_id):
        queryset = self.queryset.filter(job_id=job_id)
        serializer = JobSerializer(queryset)
        return Response(data=serializer.data)

class FilterJobsByCity(APIView):
    queryset = Job.objects.all()

    def get(self, request, city):
        queryset = self.queryset.filter(located_in__city=city)
        serializer = JobSerializer(queryset, many=True)
        return Response(data=serializer.data)

class FilterJobsByState(APIView):
    queryset = Job.objects.all()

    def get(self, request, state):
        queryset = self.queryset.filter(located_in__state=state)
        serializer = JobSerializer(queryset, many=True)
        return Response(data=serializer.data)

class FilterJobsByCountry(APIView):
    queryset = Job.objects.all()

    def get(self, request, country):
        queryset = self.queryset.filter(located_in__country=country)
        serializer = JobSerializer(queryset, many=True)
        return Response(data=serializer.data)

class SearchJobs(APIView):
    queryset = Job.objects.all()

    def get(self, request):
        keywords = request.query_params.get('keywords')
        city = request.query_params.get('city')
        state = request.query_params.get('state')
        country = request.query_params.get('country')
        queryset = self.queryset.filter(
            Q(title__icontains=keywords) |
            Q(function__icontains=keywords) |
            Q(benefits__icontains=keywords) |
            Q(description__icontains=keywords)
        )
        serializer = JobSerializer(queryset, many=True)
        return Response(data=serializer.data)

class CreateJob(APIView):
    def post(self, request):
        location, created = Location.objects.get_or_create(**request.data['location'])
        industry, created = Industry.objects.get_or_create(**request.data['industry'])
        company, created = Company.objects.get_or_create(industry=industry, **request.data['company'])
        job, created = Job.objects.get_or_create(located_in=location, posted_by=company, **request.data['job'])
        reqs, created = Requirements.objects.get_or_create(job=job, **request.data['reqs'])
        return Response(data=model_to_dict(job), status=status.HTTP_200_OK)
        # except:
        #     return Response(status=status.HTTP_400_BAD_REQUEST)

class PredictFraud(APIView):
    def get(self, request):
        title, description, requirements = (
            request.get('title'),
            request.get('description'),
            request.get('requirements'),
        )
        X = vectorizer([f"{title} {description} {requirements}"])
        pred = model.predict(X)
        return Response(data=pred, status=status.HTTP_200_OK)
