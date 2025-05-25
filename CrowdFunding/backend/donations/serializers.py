from rest_framework import serializers
from .models import Donation
from users.serializers import UserSerializer

class DonationSerializer(serializers.ModelSerializer):
    donor = UserSerializer(read_only=True)

    class Meta:
        model = Donation
        fields = ('id', 'project', 'donor', 'amount', 'message',
                 'is_anonymous', 'created_at')
        read_only_fields = ('id', 'donor', 'created_at')

class DonationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = ('project', 'amount', 'message', 'is_anonymous') 