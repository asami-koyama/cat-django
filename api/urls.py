from django.urls import path, include
from rest_framework import routers
from .views import CatViewSet

router = routers.DefaultRouter()
router.register('cats', CatViewSet)

urlpatterns = [
      path('', include(router.urls)),
]
