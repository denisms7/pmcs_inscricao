from django.urls import path
from .views import PagEdital

urlpatterns = [
    path('', PagEdital, name='pag_edital'),
]