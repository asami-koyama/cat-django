from rest_framework import viewsets
from rest_framework import generics
from django.shortcuts import get_object_or_404
from .models import Cat, User, Offer, Chat
from .serializers import CatSerializer, UserSerializer, OfferSerializer, ChatSerializer
from django.db import models
from django.db.models import Q

# Create your views here.
class CatViewSet(generics.ListCreateAPIView):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer

    def get_queryset(self):
        queryset = Cat.objects.all()
        user = self.request.query_params.get("user", None)
        # userのidを渡された場合、userの登録した猫を返す
        if user is not None:
            queryset = queryset.filter(user=user)
        return queryset


# 猫のデータの更新・削除
class CatRUDViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer


# 特定の猫のデータを返す
class CatRViewSet(generics.RetrieveAPIView):
    queryset = Cat.objects.all()
    serializer_class = CatSerializer


class UserViewSet(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        id = self.request.query_params.get("id", None)
        # idを渡された場合、該当のデータを返す
        if id is not None:
            queryset = queryset.filter(id=id)
        return queryset


class ChatViewSet(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer

    def get_queryset(self):
        queryset = Chat.objects.all()
        adopter = self.request.query_params.get("adopter", None)
        supporter = self.request.query_params.get("supporter", None)
        sender = self.request.query_params.get("sender", None)
        # adopterとsupporterの両方を渡された場合、該当のデータを返す
        if adopter is not None and supporter is not None:
            queryset = queryset.filter(
                adopter__in=[adopter, supporter], supporter__in=[adopter, supporter]
            )
            queryset = queryset.order_by("created_at")
        # senderかつ、adopterもしくはsupporterのどちらかが渡された場合
        elif sender is not None and (adopter is not None or supporter is not None):
            # adopterの方が渡された場合、adopterが受信した未読のデータを返す
            if adopter is not None:
                queryset = queryset.filter(adopter=adopter)
            # supporterの方が渡された場合、supporterが受信した未読のデータを返す
            else:
                queryset = queryset.filter(supporter=supporter)
            queryset = queryset.filter(~Q(sender=sender), is_readed="False")
        # adopterのみ渡された場合、会話相手ごとの作成日が最新のデータを返す
        elif adopter is not None:
            main_queryset = queryset.filter(adopter=adopter)
            sub_queryset = queryset.filter(
                supporter=models.OuterRef("supporter"),
                created_at__gt=models.OuterRef("created_at"),
            )
            queryset = (
                main_queryset.filter(~models.Exists(sub_queryset))
                .order_by("created_at")
                .reverse()
            )
        # supporterのみ渡された場合、会話相手ごとの作成日が最新のデータを返す
        elif supporter is not None:
            main_queryset = queryset.filter(supporter=supporter)
            sub_queryset = queryset.filter(
                adopter=models.OuterRef("adopter"),
                created_at__gt=models.OuterRef("created_at"),
            )
            queryset = (
                main_queryset.filter(~models.Exists(sub_queryset))
                .order_by("created_at")
                .reverse()
            )

        return queryset


# チャットデータの更新・削除
class ChatRUDViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class OfferViewSet(generics.ListCreateAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer

    def get_queryset(self):
        queryset = Offer.objects.all()
        adopter = self.request.query_params.get("adopter", None)
        supporter = self.request.query_params.get("supporter", None)
        cat = self.request.query_params.get("cat", None)
        if adopter is not None and cat is not None:
            queryset = queryset.filter(adopter=adopter, cat=cat)
        elif supporter is not None and cat is not None:
            queryset = queryset.filter(supporter=supporter, cat=cat)
        elif adopter is not None:
            queryset = queryset.filter(adopter=adopter)
        elif supporter is not None:
            queryset = queryset.filter(supporter=supporter)

        return queryset


# オファーデータの更新・削除
class OfferRUDViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
