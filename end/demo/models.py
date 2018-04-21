from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }
    
class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    def __str__(self):
        return self.name
    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'category': self.category.to_json()
        }

