from django.conf.urls import url
from django.urls import path, include, re_path

from .views import DatePicker, date_picker

urlpatterns = [
    # path('', DatePicker.as_view(), name='date_picker'),
    path('', date_picker, name='date_picker'),
    # path('?<str:from_time>$?<str:to_time>', DatePicker.as_view(), name='date_picker'),
    # url(r'^(?P<data_text>\w+)/$', DatePicker.as_view(),),
]



