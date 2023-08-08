from django.db import models
from django.utils.translation import gettext_lazy as _

class Incricao(models.Model):
    MODALIDADE_CHOICES = [
        (1, _('Solo')),
        (2, _('Dupla')),
        (3, _('Grupo')),
        (4, _('Outros')),
    ]

    CONTATOS_CHOICES = [
        (1, _('Telefone')),
        (2, _('WhatsApp')),
    ]


    data = models.DateTimeField(auto_now_add=True, verbose_name=_('Data'))
    modalidade = models.PositiveSmallIntegerField(choices=MODALIDADE_CHOICES, verbose_name=_('Modalidade'))
    nome_artistico = models.CharField(max_length=255, verbose_name=_('Nome Artístico'))

    # E-mail
    email_1 = models.EmailField(max_length=150, verbose_name=_('E-mail 01'))
    email_2 = models.EmailField(max_length=150, verbose_name=_('E-mail 02'), null=True, blank=True)
    
    # Contato
    fone_1 = models.CharField(max_length=15, verbose_name=_('Contato 01'))
    fone_1_tipo = models.PositiveSmallIntegerField(verbose_name=_('Contato 01 Tipo'), default=1, choices=CONTATOS_CHOICES)

    fone_2 = models.CharField(max_length=15, verbose_name=_('Contato 02'), null=True, blank=True)
    fone_2_tipo = models.PositiveSmallIntegerField(verbose_name=_('Contato 02 Tipo'), default=1, choices=CONTATOS_CHOICES, null=True, blank=True)

    fone_3 = models.CharField(max_length=15, verbose_name=_('Contato 03'), null=True, blank=True)
    fone_3_tipo = models.PositiveSmallIntegerField(verbose_name=_('Contato 03 Tipo'), default=1, choices=CONTATOS_CHOICES, null=True, blank=True)


    # Endereço
    cep = models.CharField(max_length=8, verbose_name='CEP')
    estado = models.CharField(max_length=2, verbose_name=_('Estado'))
    cidade = models.CharField(max_length=200, verbose_name=_('Cidade'))
    bairro = models.CharField(max_length=200, verbose_name=_('Bairro'))
    endereco = models.CharField(max_length=250, verbose_name=_('Endereço'))
    numero = models.IntegerField(default=0, verbose_name=_('Número'))
    complemento = models.CharField(max_length=250, verbose_name=_('Complemento'), null=True, blank=True)

    def __str__(self):
        return f" - {self.modalidade}"