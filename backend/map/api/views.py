from rest_framework import generics, permissions

from .serializers import (
    DisasterSerializer,
    MediaSerializer,
    StorySerializer,
    CharitySerializer,
    DonationSerializer,
    DisasterTypeSerializer,
)

from map.models import (
    Disaster,
    DisasterType,
    Media,
    Story,
    Charity,
    Donation,
)

# Create API view
class CreateStory(generics.CreateAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

# Retrieving information
class RetrieveMediaInfo(generics.ListAPIView):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer

    def get_object(self):
        return self.request.user

class RetrieveDisasterInfo(generics.ListAPIView):
    queryset = Disaster.objects.all()
    serializer_class = DisasterSerializer

    def get_object(self):
        return self.request.user
    
class RetrieveDisasterTypeInfo(generics.ListAPIView):
    queryset = DisasterType.objects.all()
    serializer_class = DisasterTypeSerializer

    def get_object(self):
        return self.request.user

class RetrieveStoryInfo(generics.ListAPIView):
    queryset = Story.objects.all()
    serializer_class = StorySerializer

    def get_object(self):
        return self.request.user

class RetrieveCharityInfo(generics.ListAPIView):
    queryset = Charity.objects.all()
    serializer_class = CharitySerializer

    def get_object(self):
        return self.request.user
    
class RetrieveDonationInfo(generics.ListAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    def get_object(self):
        return self.request.user