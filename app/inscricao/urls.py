from django.urls import path
from .views import PagEdital, PagConcluida, PagInscreva

urlpatterns = [
    path('', PagEdital, name='inicio'),
    path('concluido', PagConcluida, name='pag_concluida'),
    path('inscreva-se', PagInscreva.as_view(), name='pag_inscreva'),
]