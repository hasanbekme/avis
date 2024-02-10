from rest_framework.filters import BaseFilterBackend
from rest_framework import filters
from account.models import Profile


class CustomIdFilter(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        search_key: str = request.query_params.get("search")
        if not search_key or not search_key.isdigit():
            return queryset
        found = Profile.objects.filter(id=int(search_key))
        if found.count() > 0:
            return found
        else:
            return queryset


class CustomUserFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        grade = request.query_params.get("grade")
        if grade:
            queryset = queryset.filter(grade=grade)
        return queryset