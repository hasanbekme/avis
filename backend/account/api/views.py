from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import viewsets, permissions, generics, pagination, filters
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import (
    MyTokenObtainPairSerializer,
    ProfileSerializer,
    UpdateProfileSerializer,
    UpdateProfilePictureSerializer,
    ChangePasswordSerializer,
    add_custom_claims,
    UserSerializer,
)
from .filters import CustomIdFilter, CustomUserFilter

User = get_user_model()

class SignUpView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = ProfileSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        refresh = add_custom_claims(user, refresh)
        return Response({"refresh": str(refresh), "access": str(refresh.access_token)})


class RetrieveProfileInfo(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user


class UpdateProfileView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateProfileSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user


class UpdateProfilePictureView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateProfilePictureSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user


class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = ChangePasswordSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # check old password
            if not self.object.check_password(serializer.data.get("current_password")):
                return Response({"current_password": "Wrong password."}, status=400)
            # set the new password
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response("Success. ", status=200)

        return Response(serializer.errors, status=400)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserPagination(pagination.PageNumberPagination):
    page_szie = 20
    page_size_query_param = "per_page"
    max_page_size = 10000


class UserViewsSet(viewsets.ModelViewSet):
    queryset = User.objects.order_by("first_name")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    pagination_class = UserPagination
    filter_backends = (
        CustomUserFilter,
        CustomIdFilter,
        filters.SearchFilter,
    )
    search_fields = ["id", "username", "first_name", "last_name"]

    def get_serializer_class(self):
        if self.action == "list":
            return UserSerializerList
        else:
            return UserSerializer
