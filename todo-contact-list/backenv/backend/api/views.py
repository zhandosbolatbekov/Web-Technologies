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
    elif request.method == "DELETE":
        contact.delete()
        return JsonResponse(contact.to_json())
