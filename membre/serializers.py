from django.core.serializers import serialize
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from unicodedata import category
from membre.models import  Membre

class MembreSerializer(ModelSerializer):
    class Meta:
        model=Membre
        fields=['id','nom','prenom','mot_de_passe','email','statut','approbation','telephone','sexe','adresse','date_naissance','date_inscription']
