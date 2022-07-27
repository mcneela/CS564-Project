from django.shortcuts import render
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
