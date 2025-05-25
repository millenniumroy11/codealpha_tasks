from rest_framework import serializers
from .models import Project
from users.serializers import UserSerializer

class ProjectSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    current_amount = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Project
        fields = ('id', 'title', 'description', 'creator', 'target_amount',
                 'current_amount', 'start_date', 'end_date', 'status',
                 'image', 'created_at', 'updated_at')
        read_only_fields = ('id', 'creator', 'current_amount', 'created_at', 'updated_at')

class ProjectCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('title', 'description', 'target_amount', 'start_date',
                 'end_date', 'status', 'image') 