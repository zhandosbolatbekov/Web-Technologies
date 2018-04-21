from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('categories/', views.category_list, name="category_list"),
    path('categories/<int:category_id>/', views.category_detail, name='category_detail'),
    path('edit_product/<int:product_id>/', views.edit_product, name='edit_product'),
    path('save_product/<int:product_id>', views.save_product, name='save_product'),
    path('delete_product/<int:product_id>', views.delete_product, name='delete_product'),
    path('new_product/', views.new_product, name='new_product'),
    path('add_product/', views.add_product, name='add_product')
]