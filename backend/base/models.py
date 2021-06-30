from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import  SET_NULL
from django.utils.text import slugify

# Create your models here.
class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, unique=True)
    image = models.ImageField(upload_to='products/', blank=True)
    brand = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=200,blank=True)
    description = models.TextField(blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    numReviews =models.IntegerField(blank=True, default=0, null=True) 
    price =  models.DecimalField(max_digits=7,decimal_places=2, blank=True, null=True)
    countInStock = models.IntegerField(blank=True,default=0, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    slug= models.SlugField(max_length=255, unique=True,blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        else :
            self.slug = slugify(self.name)
        super(Product, self).save(*args, **kwargs)


class Review(models.Model):
    product = models.ForeignKey(Product,on_delete=SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=SET_NULL, null=True)
    name = models.CharField(max_length=200,blank=True)
    rating = models.IntegerField(null=True, blank=True,default=0)
    comment = models.TextField(blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=300, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2,blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2,blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2,blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.createdAt)

class OrderItem(models.Model):
    product = models.ForeignKey(Product,on_delete=SET_NULL, null=True)
    order = models.ForeignKey(Order,on_delete=SET_NULL, null=True)
    name = models.CharField(max_length=200,blank=True)
    qty = models.IntegerField(null=True, blank=True,default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2,blank=True)
    image = models.CharField(max_length=200,blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.name)

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE,null=True,blank=True)
    address = models.CharField(max_length=200,blank=True)
    city = models.CharField(max_length=200,blank=True)
    postalCode = models.CharField(max_length=200,blank=True)
    country = models.CharField(max_length=200,blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2,blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.address)
        
    