from django.contrib.auth.hashers import make_password
from django.db import models

class Membre(models.Model):
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    mot_de_passe=models.CharField(max_length=128,default=make_password("defaultpassword"))
    email = models.EmailField(unique=True)
    statut = models.CharField(
        max_length=15,
        choices=[("Baptisé", "Baptisé"), ("Non Baptisé", "Non Baptisé")],
        default="Non Baptisé"
    )
    approbation = models.CharField(
        max_length=15,
        choices=[("En attente", "En attente"), ("Approuvé", "Approuvé"), ("Rejeté", "Rejeté")],
        default="En attente"
    )

    telephone = models.CharField(max_length=20, blank=True, null=True)
    sexe = models.CharField(
        max_length=10,
        choices=[("Homme", "Homme"), ("Femme", "Femme")]
    )
    adresse = models.TextField()
    date_naissance = models.DateField()

    date_inscription = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.prenom} {self.nom} - {self.statut}"

    def set_password(self, raw_password):
        """Crypte le mot de passe avant de l’enregistrer"""
        self.mot_de_passe = make_password(raw_password)
