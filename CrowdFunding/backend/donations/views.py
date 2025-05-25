from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters import rest_framework as filters
from .models import Donation
from .serializers import DonationSerializer, DonationCreateSerializer
from projects.models import Project

# Create your views here.

class DonationFilter(filters.FilterSet):
    min_amount = filters.NumberFilter(field_name="amount", lookup_expr='gte')
    max_amount = filters.NumberFilter(field_name="amount", lookup_expr='lte')
    project = filters.NumberFilter(field_name="project")
    donor = filters.NumberFilter(field_name="donor")

    class Meta:
        model = Donation
        fields = ['min_amount', 'max_amount', 'project', 'donor']

class DonationViewSet(viewsets.ModelViewSet):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filterset_class = DonationFilter
    ordering_fields = ['created_at', 'amount']

    def get_serializer_class(self):
        if self.action == 'create':
            return DonationCreateSerializer
        return DonationSerializer

    def perform_create(self, serializer):
        donation = serializer.save(donor=self.request.user)
        project = Project.objects.get(id=donation.project.id)
        project.current_amount += donation.amount
        project.save()
