from django.contrib.auth.models import User, Group
from rest_framework import serializers
from jobposting.models import (
    Job,
    Company,
    Industry,
    Location,
    Requirements,
)

class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry 
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    industry = IndustrySerializer()
    
    class Meta:
        model = Company
        fields = '__all__'

    def create(self, validated_data):
        job = Job.objects.create(
            **validated_data
        )
        return job

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location 
        fields = '__all__'

class JobSerializer(serializers.ModelSerializer):
    located_in = LocationSerializer()
    posted_by = CompanySerializer()

    class Meta:
        model = Job
        fields = '__all__'

class RequirementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Requirements
        fields = '__all__'
