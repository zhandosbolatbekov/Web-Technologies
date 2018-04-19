from django.db import models

# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    avatar = models.URLField(max_length=1000)
    def to_json(self):
        return {
      'id': self.id,
      'name': self.name,
      'phone': self.phone,
      'avatar': self.avatar,
    }
    def __str__(self):
        return self.name

class Todo(models.Model):
    title = models.CharField(max_length=200)
    deadline = models.CharField(max_length=200)
    def to_json(self):
        return {
      'id': self.id,
      'title': self.title,
      'deadline': self.deadline,
    }
    def __str__(self):
        return self.title