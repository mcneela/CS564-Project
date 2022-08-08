import csv

from django.core.management import BaseCommand
from jobposting.models import (
    Industry,
    Company,
    Job,
    Location,
    Requirements
)

def make_hash(obj):
    return tuple((k, v) for k, v in list(obj.__dict__.items())[1:])

class Command(BaseCommand):
    help = 'Load a job posting csv file into the database'

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str)

    def handle(self, *args, **kwargs):
        used_job_ids = {}
        path = kwargs['path']
        req_list, industries, companies, jobs, locations = [], [], [], [], []
        industry_set, req_set, company_set, job_set, location_set = {}, {}, {}, {}, {}
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
                industry_obj = Industry(name=industry)
                if make_hash(industry_obj) in industry_set:
                    industry_obj = industry_set[make_hash(industry_obj)]
                else:
                    industries.append(industry_obj)
                    industry_set[make_hash(industry_obj)] = industry_obj
                company_obj = Company(
                    profile=company_profile.strip(),
                    has_logo=bool(int(has_company_logo)),
                    industry=industry_obj
                )
                if make_hash(company_obj) in company_set:
                    company_obj = company_set[make_hash(company_obj)]
                else:
                    companies.append(company_obj)
                    company_set[make_hash(company_obj)] = company_obj
                try:
                    country, state, city = location.split(",")
                    country, state, city = country.strip(), state.strip(), city.strip()
                except:
                    country, state, city = None, None, None
                location_obj = Location(
                    city=city,
                    state=state,
                    country=country
                )
                if make_hash(location_obj) in location_set:
                    location_obj = location_set[make_hash(location_obj)]
                else:
                    locations.append(location_obj)
                    location_set[make_hash(location_obj)] = location_obj
                try:
                    salary_min, salary_max = salary_range.split("-")
                    salary_min, salary_max = int(salary_min), int(salary_max) 
                except:
                    salary_min, salary_max = None, None
                job_obj = Job(
                    title=title.strip(),
                    function=function.strip(),
                    salary_min=salary_min,
                    salary_max=salary_max,
                    department=department.strip(),
                    benefits=benefits.strip(),
                    description=description.strip(),
                    fraudulent=bool(int(fraudulent)),
                    telecommuting=bool(int(telecommuting)),
                    has_question=bool(int(has_questions)),
                    posted_by=company_obj,
                    located_in=location_obj
                )
                if make_hash(job_obj) in job_set:
                    job_obj = job_set[make_hash(job_obj)]
                else:
                    jobs.append(job_obj)
                    job_set[make_hash(job_obj)] = job_obj
                    requirements_obj = Requirements(
                        description=requirements.strip(),
                        education=required_education.strip(),
                        experience=required_experience.strip(),
                        employment_type=employment_type.strip(),
                        job=job_obj
                    )
                    if make_hash(requirements_obj) in req_set:
                        requirements_obj = req_set[make_hash(requirements_obj)]
                    else:
                        req_set[make_hash(requirements_obj)] = requirements_obj
                        req_list.append(requirements_obj)
            Industry.objects.bulk_create(industries)
            Company.objects.bulk_create(companies)
            Location.objects.bulk_create(locations)
            Job.objects.bulk_create(jobs)
            Requirements.objects.bulk_create(req_list)
    print("Loaded database successfully!")
