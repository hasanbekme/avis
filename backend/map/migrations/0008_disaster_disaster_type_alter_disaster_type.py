# Generated by Django 5.0.2 on 2024-02-10 00:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('map', '0007_disastertype_alter_disaster_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='disaster',
            name='disaster_type',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='map.disastertype'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='disaster',
            name='type',
            field=models.CharField(choices=[('EQ', 'Earthquake'), ('WF', 'Wildfires'), ('VC', 'Volcano'), ('SM', 'Storm'), ('HC', 'Hurricane'), ('DF', 'Deforestation'), ('FD', 'Flood')], max_length=2),
        ),
    ]