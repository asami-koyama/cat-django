from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Cat , User

class CatSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Cat
        fields = ('id', 'name', 'status', 'location', 'protected_date','age','gender','pattern','color','note','img','created_at','updated_at')

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