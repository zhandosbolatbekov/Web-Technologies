from django.urls import path
from api import views

urlpatterns = [
    path('categories/', views.category_list),
    path('categories/<int:category_id>/', views.category_products),
    path('products/', views.product_list),
    path('add_product/', views.add_product),
    path('product/<int:product_id>/', views.product)
]