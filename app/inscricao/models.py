from django.db import models
from django.utils.translation import gettext_lazy as _


class Incricao(models.Model):
    MODALIDADE_CHOICES = [
        ('1', _('Solo')),
        ('2', _('Dupla')),
        ('3', _('Grupo')),
        ('4', _('Outros')),
    ]

    data = models.DateTimeField(auto_now_add=True, verbose_name=_('Data'))
    modalidade = models.PositiveSmallIntegerField(choices=MODALIDADE_CHOICES, verbose_name=_('Modalidade'), null=True, blank=True)

    def __str__(self):
        return f" - {self.modalidade}"