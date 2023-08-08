from django import forms
from .models import Incricao


class FormIncricao(forms.ModelForm):
    class Meta:
        model = Incricao
        fields = [
            'modalidade',
            'email_1',
            'email_2',
            'fone_1',
            'fone_1_tipo',
            'fone_2',
            'fone_2_tipo',
            'fone_3',
            'fone_3_tipo',

            'cep',
            'estado',
            'cidade',
            'bairro',
            'endereco',
            'numero',
            'complemento',

        ]

