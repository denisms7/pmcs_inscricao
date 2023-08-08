from django.shortcuts import render
from django.contrib import messages
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView, UpdateView, DeleteView
import datetime
from .models import Incricao
from .form import FormIncricao

def PagEdital(request):
    return render(request, 'inscricao/edital.html')

def PagConcluida(request):
    return render(request, 'inscricao/ficha_concluida.html')


class PagInscreva(CreateView):
    model = Incricao
    form_class = FormIncricao
    template_name = 'inscricao/ficha.html'
    success_url = reverse_lazy('pessoa-busca')

    def form_valid(self, form):
        url = super().form_valid(form)

        messages.success(self.request, "Registro salvo com sucesso.")
        return url
