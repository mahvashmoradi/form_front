from datetimewidget.widgets import TimeWidget
from dateutil.utils import today
from django import forms
from django.forms import Widget, Select, SelectDateWidget, SplitHiddenDateTimeWidget, SplitDateTimeWidget, TimeInput, \
    DateTimeInput
from jalali_date.fields import JalaliDateField, SplitJalaliDateTimeField, JalaliDateTimeField
from jalali_date.widgets import AdminJalaliDateWidget, AdminSplitJalaliDateTime
from pkg_resources import _

# from django_jalali.db import models as jmodels

# class SearchForm(forms.Form):
#     widgets = {
#         'delivery_date': forms.DateInput(attrs={'id': 'datepicker'}),
#     }
#     time_start = JalaliDateTimeField(widget=AdminJalaliDateWidget)
#     date_time = SplitJalaliDateTimeField(widget=AdminSplitJalaliDateTime)
#     time = forms.TimeField(widget=TimeWidget)
#     time_2 = forms.TimeField(widget=TimeInput)
#     delivery_date = forms.DateTimeField(widget=DateTimeInput(attrs={'id': 'start_date_jalali'})),
#     delivery_date_2 = forms.CharField()

# time_test = forms.TimeField(widget=MinimalSplitDateTimeMultiWidget())
# from django import forms
# from jalali_date.fields import JalaliDateField, SplitJalaliDateTimeField
# from jalali_date.widgets import AdminJalaliDateWidget, AdminSplitJalaliDateTime
# from pkg_resources import _
#
# from datatime.models import TestModel
#

# class TestForm(forms.ModelForm):
#     class Meta:
#         model = TestModel
#         fields = ('name', 'date', 'date_time', 'get_time')
#
#     def __init__(self, *args, **kwargs):
#         super(TestForm, self).__init__(*args, **kwargs)
#         self.fields['date'] = JalaliDateField(label=_('date'),  # date format is  "yyyy-mm-dd"
#                                               widget=AdminJalaliDateWidget  # optional, to use default datepicker
#                                               )
#
#         # you can added a "class" to this field for use your datepicker!
#         # self.fields['date'].widget.attrs.update({'class': 'jalali_date-date'})
#
#         self.fields['date_time'] = SplitJalaliDateTimeField(label=_('date time'),
#                                                             widget=AdminSplitJalaliDateTime
#                                                             # required, for decompress DatetimeField to
#                                                             # JalaliDateField and JalaliTimeField
#                                                             )
from django import forms
from django.forms import ModelForm
from .models import Offer


class TimeInput(forms.TimeInput):
    input_type = 'time'
    # format_key = '%H:%M:%S'
    # attr = {'initial':'00:00:00'}


# class SearchForm(forms.ModelForm):
#
#     class Meta:
#         model = Offer
#         fields = '__all__'
#         widgets = {
#                 'expiration_date': TimeInput(),
#             }

class SearchForm(forms.Form):
    date_start = JalaliDateField(widget=AdminJalaliDateWidget, initial=today)
    # time_start = forms.TimeField(widget=TimeInput)
    # date_end = JalaliDateField(widget=AdminJalaliDateWidget)
    # time_end = forms.TimeField(widget=TimeInput)
    # ip_start = forms.GenericIPAddressField(required=False, empty_value=None)
    # ip_end = forms.GenericIPAddressField(required=False, empty_value=None)

    def __init__(self, *args, **kwargs):
        extra_fields = kwargs.pop('extra', 0)
        print(extra_fields)
        super(SearchForm, self).__init__(*args, **kwargs)
        # self.fields['extra_field_count'].initial = extra_fields

        for index in range(int(extra_fields)):
            print('extraa')
            self.fields['ip_start_{index}'.format(index=index)] = forms.GenericIPAddressField(required=False, empty_value=None)
            self.fields['ip_end_{index}'.format(index=index)] = forms.GenericIPAddressField(required=False, empty_value=None)
            # print(self.fields)
