from django import forms
from .models import Membre

class MembreForm(forms.ModelForm):
    class Meta:
        model = Membre
        fields = ["nom", "prenom", "email", "statut", "telephone", "sexe", "adresse", "date_naissance"]
        widgets = {
            "date_naissance": forms.DateInput(attrs={"type": "date"}),
        }
