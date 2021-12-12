from django.urls import path, include, re_path
from . views import *
from rest_framework.routers import DefaultRouter
#from knox import views as knox_views
from knox.views import LogoutView
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

router = DefaultRouter(trailing_slash=False)
router.register('student_info/?', StudentInfoViewSet, basename='student_info'),
router.register('class_info', StudentClassInfoViewSet, basename='class_info'),
router.register('attendance', AttendanceViewSet, basename='attendance'),

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register', RegisterAPI.as_view(), name='register'),
   # path('api/logoutall', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/user', UserAPIView.as_view()),
    path('api/login', LoginView.as_view()),
    path('api/logout', LogoutView.as_view(), name='knox_logout'),
    re_path('.*', TemplateView.as_view(template_name="index.html"), name="index")
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                        document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL,
                        document_root=settings.STATIC_ROOT)

