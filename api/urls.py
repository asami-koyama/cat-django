from django.urls import path, include
from rest_framework import routers
from .views import (
    CatViewSet,
    CatRUDViewSet,
    CatRViewSet,
    ChatViewSet,
    OfferViewSet,
    UserViewSet,
    ChatRUDViewSet,
    OfferRUDViewSet,
)


router = routers.DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
    path("cats/", CatViewSet.as_view()),
    path("catsRUD/<str:pk>/", CatRUDViewSet.as_view()),
    path("cat/<str:pk>/", CatRViewSet.as_view()),
    path("offers/", OfferViewSet.as_view()),
    path("chats/", ChatViewSet.as_view()),
    path("chatsRUD/<str:pk>/", ChatRUDViewSet.as_view()),
    path("offersRUD/<str:pk>/", OfferRUDViewSet.as_view()),
    path("users/", UserViewSet.as_view()),
]
