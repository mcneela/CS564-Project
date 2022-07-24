import csv

from django.core.management import BaseCommand
from jobposting.models import (
    Industry,
    Company,
    Job,
    Location,
    Requirements
)


class Command(BaseCommand):
    help = 'Load a job posting csv file into the database'

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str)

    def handle(self, *args, **kwargs):
        used_job_ids = {}
        path = kwargs['path']
        with open(path, 'r') as infile:
            reader = csv.reader(infile, delimiter=',')
            for i, row in enumerate(reader):
                if i == 0:
                    # this is the header, so skip it
                    continue
                (
                    job_id,
                    title,
                    location,
                    department,
                    salary_range,
                    company_profile,
                    description,
                    requirements,
                    benefits,
                    telecommuting,
                    has_company_logo,
                    has_questions,
                    employment_type,
                    required_experience,
                    required_education,
                    industry,
                    function,
                    fraudulent
                ) = row
                industry_obj, created = Industry.objects.get_or_create(name=industry)
                company_obj, created = Company.objects.get_or_create(
                    profile=company_profile,
                    has_logo=bool(has_company_logo),
                    industry=industry_obj
                )
                try:
                    country, state, city = location.split(",")
                except:
                    country, state, city = None, None, None
                location_obj, created = Location.objects.get_or_create(
                    city=city,
                    state=state,
                    country=country
                )
                try:
                    salary_min, salary_max = salary_range.split("-")
                    salary_min, salary_max = int(salary_min), int(salary_max) 
                except:
                    salary_min, salary_max = None, None
                job_obj, created = Job.objects.get_or_create(
                    title=title,
                    function=function,
                    salary_min=salary_min,
                    salary_max=salary_max,
                    department=department,
                    benefits=benefits,
                    description=description,
                    fraudulent=bool(fraudulent),
                    telecommuting=bool(telecommuting),
                    has_question=bool(has_questions),
                    posted_by=company_obj,
                    located_in=location_obj
                )
                if not job_obj.job_id in used_job_ids:
                    used_job_ids[job_obj.job_id] = True
                    requirements_obj, created = Requirements.objects.get_or_create(
                        description=requirements,
                        education=required_education,
                        experience=required_experience,
                        employment_type=employment_type,
                        job=job_obj
                    )

print("Loaded database successfully!")
