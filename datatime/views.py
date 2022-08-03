from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from django.views import View
from jalali_date import datetime2jalali, date2jalali

from datatime.forms import SearchForm


# from datatime.forms import TestForm

#
class DatePicker(View):
    # def get(self, request, *arg, **kwargs):
    def get(self, request):
        print(request.GET)
        form = SearchForm
        return render(request, 'data.html', {'form': form})

    def post(self, request):
        print(request.POST)
        if request.is_ajax():
            print(dict(request.POST.items()))  # محتویات درخواست مشاهده کنید
        return JsonResponse({'Hi': 'Hi'})


def date_picker(request):
    print(dict(request.POST.items()))
    if request.method == 'POST':
        extra_field = request.POST['data_form']
        extra_field_count = (len(extra_field.split('&')) - 2)/2
        x=0
        # data = extra_field.split('&')
        # data = [x for each in data if ]
        # for word in extra_field.split('&'):
        #     if word.startswith('ip_st')
        # k = map(extra_field.split('&'),key=lambda x:x[1])
        search_form = SearchForm(request.POST, extra=extra_field_count)
        # search_form = Search_form(request.POST)
        # print(search_form.fields)
        if search_form.is_valid():
            print('clean', search_form.cleaned_data['ip_start_0'])
        else:
            print(search_form['ip_start_0.)'])

    else:
        search_form = SearchForm()
    return render(request, 'data.html', {'form': search_form})
