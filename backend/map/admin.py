from django.contrib import admin
from .models import Disaster, Media, Story, Charity, Donation, DisasterType

admin.site.register(Disaster)
admin.site.register(DisasterType)
admin.site.register(Media)
admin.site.register(Story)
admin.site.register(Charity)
admin.site.register(Donation)