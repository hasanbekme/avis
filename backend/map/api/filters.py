from rest_framework.filters import BaseFilterBackend
from rest_framework import filters
from map.models import Question


class CustomIdFilter(BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        search_key: str = request.query_params.get("search")
        if not search_key or not search_key.isdigit():
            return queryset
        found = Question.objects.filter(id=int(search_key))
        if found.count() > 0:
            return found
        else:
            return queryset


class CustomQuestionFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        category = request.query_params.get("category")
        if category:
            queryset = queryset.filter(category=category)
        return queryset