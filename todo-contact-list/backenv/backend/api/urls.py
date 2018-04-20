from django.urls import path

from api import views

urlpatterns = [
    path('todos/', views.todo_list),
    path('add_todo/', views.add_todo),
    path('todo_detail/<int:todo_id>', views.todo_detail),
    path('contacts/', views.contact_list),
    path('add_contact/', views.add_contact),
    path('contact_detail/<int:contact_id>', views.contact_detail)
]