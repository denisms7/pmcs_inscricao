from django.urls import path
from .views import PagEdital, PagConcluida, PagInscreva

urlpatterns = [
    path('', PagEdital, name='pag_edital'),
    path('concluido', PagConcluida, name='pag_concluida'),
    path('inscreva-se', PagInscreva.as_view(), name='pag_inscreva'),
]