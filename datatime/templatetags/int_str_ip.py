from django import template

register = template.Library()
import ipaddress


@register.simple_tag
def change_display(value):
    print(value)
    f=template.Variable(value)
    ip = str(ipaddress.ip_address(f))
    return ip
# @register.tag
# class change_display(template.Node):
#     def __init__(self, value):
#         self.date_to_be_formatted = template.Variable(value)
#
#     def render(self, context):
#         try:
#             actual_date = self.date_to_be_formatted.resolve(context)
#             return actual_date
#         except template.VariableDoesNotExist:
#             return ''
