from django.shortcuts import render
from rest_framework import viewsets
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
