from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CreateStory,
    RetrieveDisasterInfo,
    RetrieveMediaInfo,
    RetrieveStoryInfo,
    RetrieveCharityInfo,
    RetrieveDonationInfo,
    RetrieveDisasterTypeInfo,
)

router = DefaultRouter()

urlpatterns = [
    path("create-story/", CreateStory.as_view(), name="create-story"),
    path("get-disaster/", RetrieveDisasterInfo.as_view(), name="disaster"),
    path("get-media/", RetrieveMediaInfo.as_view(), name="media"),
    path("get-story/", RetrieveStoryInfo.as_view(), name="story"),
    path("get-charity/", RetrieveCharityInfo.as_view(), name="charity"),
    path("get-donation/", RetrieveDonationInfo.as_view(), name="donation"),
    path("get-disaster-type/", RetrieveDisasterTypeInfo.as_view(), 
         name="disaster-type"),
    path("", include(router.urls)),
]