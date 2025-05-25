from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters import rest_framework as filters
from .models import Project
from .serializers import ProjectSerializer, ProjectCreateSerializer

# Create your views here.

class ProjectFilter(filters.FilterSet):
    min_target = filters.NumberFilter(field_name="target_amount", lookup_expr='gte')
    max_target = filters.NumberFilter(field_name="target_amount", lookup_expr='lte')
    status = filters.CharFilter(field_name="status")
    creator = filters.NumberFilter(field_name="creator")

    class Meta:
        model = Project
        fields = ['min_target', 'max_target', 'status', 'creator']

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_class = ProjectFilter
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'target_amount', 'current_amount']

    def get_serializer_class(self):
        if self.action == 'create':
            return ProjectCreateSerializer
        return ProjectSerializer

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    @action(detail=True, methods=['get'])
    def donations(self, request, pk=None):
        project = self.get_object()
        donations = project.donations.all()
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data)
