from django.http import HttpResponse, JsonResponse, QueryDict
from django.views.decorators.csrf import csrf_exempt

from demo.models import Category, Product

@csrf_exempt
def category_list(request):
    categories = Category.objects.all()
    categories_json = [cat.to_json() for cat in categories]
    return JsonResponse(categories_json, safe=False)

@csrf_exempt
def product_list(request):
    products = Product.objects.all()
    products_json = [prod.to_json() for prod in products]
    return JsonResponse(products_json, safe=False)

@csrf_exempt
def category_products(request, category_id):
    category = Category.objects.get(pk=category_id)
    products = Product.objects.filter(category=category)
    products_json = [prod.to_json() for prod in products]
    return JsonResponse(products_json, safe=False)

@csrf_exempt
def add_product(request):
    data = request.POST
    product = Product()
    product.name = data.get('name', '')

    category_name = data.get('category', '')
    category, _ = Category.objects.get_or_create(name=category_name)

    product.category = category
    product.save()
    return JsonResponse(product.to_json(), status=201)

@csrf_exempt
def product(request, product_id):
    try: 
        product = Product.objects.get(pk=product_id)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=404)
    if request.method == "GET":
        return JsonResponse(product.to_json())
    elif request.method == "POST":
        data = request.POST
        product.name = data.get('name', product.name)

        category_name = data.get('category', product.category.name)
        category, _ = Category.objects.get_or_create(name=category_name)

        product.category = category
        product.save()
        return JsonResponse(product.to_json(), safe=False)
    elif request.method == "DELETE":
        product.delete()
        return JsonResponse(product.to_json(), safe=False)

# @csrf_exempt

