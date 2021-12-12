"""school_management_system URL Configuration
The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls.i18n import i18n_patterns

urlpatterns = [
    path('admin', admin.site.urls),
    path('', include('students.urls')),
    path('api/', include('knox.urls')),
]

urlpatterns += i18n_patterns ()

admin.site.site_url = 'https://simple-school-system.herokuapp.com' 
admin.site.site_header = 'STUDENT MANAGEMENT DASHBOARD'
