from django.db import models

# Create your models here.

class Industry(models.Model):
    industry_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=32)

class Company(models.Model):
    company_id = models.AutoField(primary_key=True)
    profile = models.TextField()
    has_logo = models.BooleanField(default=False)
    industry = models.ForeignKey(Industry, on_delete=models.CASCADE)

class Location(models.Model):
    location_id = models.AutoField(primary_key=True)
    city = models.CharField(max_length=24)
    state = models.CharField(max_length=24)
    country = models.CharField(max_length=24)

class Job(models.Model):
    job_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=64)
    function = models.CharField(max_length=64)
    salary_min = models.FloatField()
    salary_max = models.FloatField()
    department = models.CharField(max_length=64)
    benefits = models.TextField()
    description = models.TextField()
    fraudulent = models.BooleanField(default=False)
    telecommuting = models.BooleanField(default=False)
    has_question = models.BooleanField(default=False)
    posted_by = models.ForeignKey(Company, on_delete=models.CASCADE)
    located_in = models.ForeignKey(Location, on_delete=models.CASCADE)

class Requirements(models.Model):
    description = models.TextField()
    education = models.CharField(max_length=24)
    experience = models.CharField(max_length=24)
    employment_type = models.CharField(max_length=24)
    job = models.OneToOneField(Job, on_delete=models.CASCADE, primary_key=True)
