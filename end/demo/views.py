from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from demo.models import Category, Product

# Create your views here.
def index(request):
    return render(request, 'index.html')

def category_list(request):
    categories = Category.objects.all()
    return render(request, 'category_list.html', {'categories': categories})

def category_detail(request, category_id):
    needcat = Category.objects.get(pk=category_id)
    products = Product.objects.filter(category=needcat)
    print(products)
    return render(request, 'category_detail.html', {'products': products})

def edit_product(request, product_id):
    product = Product.objects.get(pk=product_id)
    return render(request, 'edit_product.html', {'product': product})
    
@csrf_exempt    
def save_product(request, product_id):
    data = request.POST
    product = Product.objects.get(pk=product_id)
    product.name = data.get('name', product.name)

    category_name = data.get('category', product.category.name)
    category, _ = Category.objects.get_or_create(name=category_name)

    product.category = category
    product.save()

    return category_list(request)

@csrf_exempt
def delete_product(request, product_id):
    product = Product.objects.get(pk=product_id)
    product.delete()

    return category_list(request)

def new_product(request):
    return render(request, 'new_product.html')

@csrf_exempt
def add_product(request):
    data = request.POST
    product = Product()
    product.name = data.get('name', '')

    category_name = data.get('category', 'Others')
    category, _ = Category.objects.get_or_create(name=category_name)

    product.category = category
    product.save()

    return category_list(request)
