from django.db import models
# from django_jalali.db import models as jmodels
#
# # Create your models here.
# class TestModel(models.Model):
#     # name = models.CharField(max_length=150)
#     # date = models.DateField()
#     # date_time = models.DateTimeField()
#     # get_created_jalali = models.DateTimeField()
#     # get_time = models.TimeField()
#     objects = jmodels.jManager()
#     name = models.CharField(max_length=200)
#     date = jmodels.jDateField()
#
#     def __str__(self):
#         return "%s, %s" % (self.name, self.date)
#
# class BarTime(models.Model):
#     objects = jmodels.jManager()
#     name = models.CharField(max_length=200)
#     datetime = jmodels.jDateTimeField()
#
#     def __str__(self):
#         return "%s, %s" % (self.name, self.datetime)

from django.db import models


class Offer(models.Model):
    expiration_date = models.TimeField(null=True)
