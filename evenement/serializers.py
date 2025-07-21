from rest_framework import serializers
from .models import Evenement, CategorieEvenement

class CategorieEvenementSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategorieEvenement
        fields = ['id', 'nom']

class EvenementSerializer(serializers.ModelSerializer):
    categorie = CategorieEvenementSerializer(read_only=True)
    categorie_id = serializers.PrimaryKeyRelatedField(
        queryset=CategorieEvenement.objects.all(),
        source='categorie',
        write_only=True
    )

    class Meta:
        model = Evenement
        fields = ['id', 'nom', 'description', 'heure', 'date', 'lieu', 'capacite', 'statut', 'image', 'categorie', 'categorie_id']