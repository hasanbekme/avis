from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MyTokenObtainPairView,
    SignUpView,
    UpdateProfileView,
    UpdateProfilePictureView,
    ChangePasswordView,
    RetrieveProfileInfo,
    UserViewsSet,
)

router = DefaultRouter()
router.register(r"users", UserViewsSet)

urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signup"),
    path("me/", RetrieveProfileInfo.as_view(), name="me"),
    path("update-profile/", UpdateProfileView.as_view(), name="update_profile"),
    path(
        "update-profile-picture/",
        UpdateProfilePictureView.as_view(),
        name="update_profile_picture",
    ),
    path("change-password/", ChangePasswordView.as_view(), name="change_password"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", include(router.urls)),
]
