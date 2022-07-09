from django.db import models

# Create your models here.
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

class Company(models.Model):
    company_id = models.AutoField(primary_key=True)
    profile = models.TextField()
    has_logo = models.BooleanField(default=False)


