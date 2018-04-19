from django.urls import path

from api import views

urlpatterns = [
    path('contacts/', views.contact_list),
    path('add_contact/', views.add_contact),
    path('contact_detail/<int:contact_id>', views.contact_detail)
]