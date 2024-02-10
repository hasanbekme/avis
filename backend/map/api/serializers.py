from rest_framework import serializers
from map.models import (
    Disaster,
    Media,
    Story,
    Charity,
    Donation,
    DisasterType,
    Profile,
)


class CharitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Charity
        fields = "__all__"


class DonationSerializer(serializers.ModelSerializer):

    charity = CharitySerializer()

    class Meta:
        model = Donation
        fields = "__all__"


class DisasterTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DisasterType
        fields = "__all__"


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = "__all__"


class DisasterSerializer(serializers.ModelSerializer):
    disaster_type = DisasterTypeSerializer()
    media = MediaSerializer(many=True)
    donations = DonationSerializer(many=True)

    class Meta:
        model = Disaster
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["first_name", "last_name", "picture"]


class StorySerializer(serializers.ModelSerializer):
    profile = ProfileSerializer()

    class Meta:
        model = Story
        fields = "__all__"
