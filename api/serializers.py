from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Cat, User#, Offer, Chat

class CatSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Cat
        fields = ('id', 'name', 'status', 'location', 'protected_date','age_year','age_month','gender','pattern','color','note','img','user','created_at','updated_at')

class UserSerializar(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    class Meta:
        model = User
        firld = ('id','username','email','user_type','is_staff','is_active','date_joined')
    
    def validate_password(self,value:str) ->str:
        """
        ハッシュ値に変換する
        """
        return make_password(value)
'''
class OfferSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Offer
        fields = ('id', 'cat', 'adopter', 'supporter', 'created_at','updated_at')


class ChatSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Chat
        fields = ('id', 'sender', 'receiver', 'messeage', 'is_readed','created_at','updated_at')
'''
