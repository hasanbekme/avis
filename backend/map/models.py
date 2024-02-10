from django.db import models
from account.models import Profile

# Create your models here.
class DisasterType(models.Model):
    name = models.CharField(max_length=200)
    icon = models.ImageField(upload_to="disaster-types/", blank=True)

    class Meta:
        verbose_name_plural = "Disaster Types"

    def __str__(self):
        return self.name

class Disaster(models.Model):
    name = models.CharField(max_length=200)
    latitude = models.FloatField()
    longitude = models.FloatField()
    text = models.TextField(null=True, blank=True)
    disaster_type = models.ForeignKey(DisasterType, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Media(models.Model):
    pub_date = models.DateTimeField(auto_now_add=True)
    disaster = models.ForeignKey(Disaster, on_delete=models.CASCADE, related_name="media")
    source = models.FileField(upload_to="disasters/")

    class Meta:
        verbose_name_plural = "Media"

class Story(models.Model):
    disaster = models.ForeignKey(Disaster, on_delete=models.CASCADE, null=True, blank=True)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    text = models.TextField(null=True)
    image = models.ImageField(upload_to="stories/")

    class Meta:
        verbose_name_plural = "Stories"

    def __str__(self):
        return f"Story by {self.profile}"

class Charity(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(null=True)

    class Meta:
        verbose_name_plural = "Charities"

    def __str__(self):
        return self.name

class Donation(models.Model):
    charity = models.ForeignKey(Charity, on_delete=models.CASCADE)
    disaster = models.ForeignKey(Disaster, on_delete=models.CASCADE, related_name="donations")
    link = models.URLField()