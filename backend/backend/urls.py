"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from jobposting import views
from jobposting.views import (
    LocationsInCity,
    LocationsInState,
    LocationsInCountry
)

router = routers.DefaultRouter()
router.register(r'jobs', views.JobViewSet)
router.register(r'companies', views.CompanyViewSet)
router.register(r'industries', views.IndustryViewSet)
router.register(r'locations', views.LocationViewSet)
router.register(r'requirements', views.RequirementsViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/locations/', include(router.urls)),
    path('api/v1/locations/city/<str:city>/', LocationsInCity.as_view()),
    path('api/v1/locations/state/<str:state>/', LocationsInState.as_view()),
    path('api/v1/locations/country/<str:country>/', LocationsInCountry.as_view())
]
