from django.contrib import admin

# Register your models here.
# from django.contrib import admin
# from django.forms import JSONField
# from jalali_date import datetime2jalali, date2jalali
# from jalali_date.admin import ModelAdminJalaliMixin, StackedInlineJalaliMixin, TabularInlineJalaliMixin
#
# from datatime.models import TestModel
#
#
# # class MyInlines1(TabularInlineJalaliMixin, admin.TabularInline):
# #     model = SecendModel
# #
# #
# # class MyInlines2(StackedInlineJalaliMixin, admin.StackedInline):
# #     model = ThirdModel
#
#
# @admin.register(TestModel)
# class FirstModelAdmin(ModelAdminJalaliMixin, admin.ModelAdmin):
#     # show jalali date in list display
#     list_display = ['name', 'get_created_jalali']
#
#     # inlines = (MyInlines1, MyInlines2,)
#     # raw_id_fields = ('name',)
#     # readonly_fields = ('name', 'date_field',)
#     # you can override formfield, for example:
#     # formfield_overrides = {
#     #     JSONField: {'widget': JSONEditor},
#     # }
#
#     def get_created_jalali(self, obj):
#         return datetime2jalali(obj.created).strftime('%y/%m/%d _ %H:%M:%S')
#
#     get_created_jalali.short_description = 'تاریخ ایجاد'
#     get_created_jalali.admin_order_field = 'created'