from django.shortcuts import render
import datetime

def Hino(request):
    return render(request, 'inscricao/edital.html')
