from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Cat, User, Offer, Chat


class CatSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = Cat
        fields = (
            "id",
            "name",
            "status",
            "location",
            "protected_date",
            "age_year",
            "age_month",
            "gender",
            "pattern",
            "color",
            "note",
            "img",
            "user",
            "created_at",
            "updated_at",
        )


class UserSerializer(serializers.ModelSerializer):
    date_joined = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "email",
            "user_type",
            "is_staff",
            "is_active",
            "date_joined",
        )

    def validate_password(self, value: str) -> str:
        """
        ハッシュ値に変換する
        """
        return make_password(value)


class OfferSerializer(serializers.ModelSerializer):
    cat = CatSerializer(read_only=True)
    cat_id = serializers.PrimaryKeyRelatedField(
        queryset=Cat.objects.all(), write_only=True
    )
    adopter = UserSerializer(read_only=True)
    adopter_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True
    )
    supporter = UserSerializer(read_only=True)
    supporter_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True
    )
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    def create(self, validated_date):
        validated_date["cat"] = validated_date.get("cat_id", None)
        if validated_date["cat"] is None:
            raise serializers.ValidationError("cat not found.")

        validated_date["adopter"] = validated_date.get("adopter_id", None)
        if validated_date["adopter"] is None:
            raise serializers.ValidationError("adopter not found.")

        validated_date["supporter"] = validated_date.get("supporter_id", None)
        if validated_date["supporter"] is None:
            raise serializers.ValidationError("supporter not found.")

        del validated_date["adopter_id"]
        del validated_date["cat_id"]
        del validated_date["supporter_id"]

        return Offer.objects.create(**validated_date)

    class Meta:
        model = Offer
        fields = (
            "id",
            "cat",
            "cat_id",
            "adopter",
            "adopter_id",
            "supporter",
            "supporter_id",
            "created_at",
            "updated_at",
        )


class ChatSerializer(serializers.ModelSerializer):
    cat = CatSerializer(read_only=True)
    cat_id = serializers.PrimaryKeyRelatedField(
        queryset=Cat.objects.all(), write_only=True, allow_null=True
    )
    adopter = UserSerializer(read_only=True)
    adopter_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True
    )
    supporter = UserSerializer(read_only=True)
    supporter_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), write_only=True
    )
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M", read_only=True)

    def create(self, validated_date):
        validated_date["cat"] = validated_date.get("cat_id", None)
        validated_date["adopter"] = validated_date.get("adopter_id", None)
        if validated_date["adopter"] is None:
            raise serializers.ValidationError("adopter not found.")

        validated_date["supporter"] = validated_date.get("supporter_id", None)
        if validated_date["supporter"] is None:
            raise serializers.ValidationError("supporter not found.")

        del validated_date["cat_id"]
        del validated_date["adopter_id"]
        del validated_date["supporter_id"]

        return Chat.objects.create(**validated_date)

    class Meta:
        model = Chat
        fields = (
            "id",
            "adopter_id",
            "adopter",
            "supporter_id",
            "supporter",
            "sender",
            "messeage",
            "cat_id",
            "cat",
            "is_readed",
            "created_at",
            "updated_at",
        )
