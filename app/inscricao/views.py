from django.shortcuts import render
from django.contrib import messages
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views.generic.list import ListView
import datetime
from .models import Incricao
from .form import FormIncricao

def PagEdital(request):
    return render(request, 'inscricao/inicio.html')

def PagConcluida(request):
    return render(request, 'inscricao/ficha_concluida.html')


class PagInscreva(CreateView):
    model = Incricao
    form_class = FormIncricao
    template_name = 'inscricao/ficha.html'
    success_url = reverse_lazy('inicio')

    def form_valid(self, form):
        self.show_toast = True
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['show_toast'] = getattr(self, 'show_toast', False)
        return context


class PagAcompanhe(ListView):
    paginate_by = 20
    model = Incricao
    template_name = 'inscricao/acompanhe.html'
