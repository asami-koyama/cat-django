from django.urls import path, include
from rest_framework import routers
from .views import CatViewSet#, OfferViewSet, ChatViewSet


router = routers.DefaultRouter()
router.register('cats', CatViewSet)
'''
router.register('offers', OfferViewSet)
router.register('chats', ChatViewSet)
'''
urlpatterns = [
      path('', include(router.urls)),
]

