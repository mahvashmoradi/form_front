# Generated by Django 3.2.5 on 2022-08-01 05:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TestModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('date', models.DateField()),
                ('date_time', models.DateTimeField()),
                ('get_created_jalali', models.DateTimeField()),
            ],
        ),
    ]
