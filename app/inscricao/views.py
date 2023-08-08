from django.shortcuts import render
import datetime

def PagEdital(request):
    return render(request, 'inscricao/edital.html')
