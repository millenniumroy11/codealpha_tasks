from django.contrib import admin
from .models import Donation

@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('donor', 'project', 'amount', 'is_anonymous', 'created_at')
    list_filter = ('is_anonymous', 'created_at')
    search_fields = ('donor__username', 'project__title', 'message')
    readonly_fields = ('created_at',)
