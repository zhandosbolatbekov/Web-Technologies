from django.http import HttpResponse, JsonResponse, QueryDict
from django.views.decorators.csrf import csrf_exempt

from api.models import Contact, Todo

@csrf_exempt
def contact_list(request):
    contacts = Contact.objects.all()
    contacts_json = [con.to_json() for con in contacts]
    return JsonResponse(contacts_json, safe=False)

@csrf_exempt
def add_contact(request):
    data = request.POST
    contact = Contact()
    contact.name = data.get('name', '')
    contact.phone = data.get('phone', '')
    contact.avatar = data.get('avatar', '')
    contact.save()
    return JsonResponse(contact.to_json(), status=201)

@csrf_exempt
def contact_detail(request, contact_id):
    try: 
        contact = Contact.objects.get(pk=contact_id)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=404)
    if request.method == "GET":
        return JsonResponse(contact.to_json())
    elif request.method == "POST":
        data = request.POST
        contact.name = data.get('name', contact.name)
        contact.phone = data.get('phone', contact.phone)
        contact.avatar = data.get('avatar', contact.avatar)
        contact.save()
        return JsonResponse(contact.to_json())
    elif request.method == "OPTIONS":
        contact.delete()
        return JsonResponse(contact.to_json())

@csrf_exempt
def todo_list(request):
    todos = Todo.objects.all()
    todos_json = [todo.to_json() for todo in todos]
    return JsonResponse(todos_json, safe=False)

@csrf_exempt
def add_todo(request):
    data = request.POST
    todo = Todo()
    todo.title = data.get('title', '')
    todo.deadline = data.get('deadline', '')
    todo.save()
    return JsonResponse(todo.to_json(), status=201)

@csrf_exempt
def todo_detail(request, todo_id):
    try:
        todo = Todo.objects.get(pk=todo_id)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=404)
    if request.method == "GET":
        return JsonResponse(todo.to_json())
    elif request.method == "POST":
        data = request.POST
        todo.title = data.get('title', todo.title)
        todo.deadline = data.get('deadline', todo.deadline)
        todo.save()
        return JsonResponse(todo.to_json())
    elif request.method == "OPTIONS":
        todo.delete()
        return JsonResponse(todo.to_json())


