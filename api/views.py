from rest_framework import viewsets

from .models import Cat, User
from .serializers import CatSerializer, UserSerializar


# Create your views here.

class CatViewSet(viewsets.ModelViewSet):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializar