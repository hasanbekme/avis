from django.urls import path, include

urlpatterns = [
    path('account/', include('account.api.urls')),
    path('map/', include('map.api.urls')),
]