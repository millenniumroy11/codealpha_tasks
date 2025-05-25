from django.db import models
from django.conf import settings

class Donation(models.Model):
    project = models.ForeignKey('projects.Project', on_delete=models.CASCADE, related_name='donations')
    donor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='donations')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    message = models.TextField(blank=True)
    is_anonymous = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.donor.username} donated ${self.amount} to {self.project.title}"

    class Meta:
        ordering = ['-created_at']
