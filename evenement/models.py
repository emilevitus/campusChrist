
from django.db import models
class CategorieEvenement(models.Model):
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=15, choices=[("Concert", "Concert"), ("Conference", "Conference"),("Croisade", "Croisade"),("Congres", "Congres")])

    def __str__(self):
        return self.nom

class Evenement(models.Model):
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=200)
    description = models.TextField()
    heure = models.TimeField(default="12:00:00")
    date = models.DateTimeField()
    lieu = models.CharField(max_length=255)
    capacite = models.IntegerField(default=100)
    statut = models.CharField(max_length=15, choices=[("A venir", "A venir"), ("En cours", "En cours"),("Termine", "Termine"),("Annule", "Annule")])
    image = models.ImageField(upload_to="evenements_images/", null=True, blank=True)
    categorie = models.ForeignKey(CategorieEvenement, on_delete=models.SET_NULL, null=True, blank=True, related_name="evenements")


    def __str__(self):
        return self.nom


