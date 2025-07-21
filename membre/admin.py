from django.contrib import admin
from django.core.mail import send_mail
from .models import Membre

class MembreAdmin(admin.ModelAdmin):
    list_display = ("nom", "prenom", "email","statut","approbation", "date_inscription")
    list_filter = ("approbation",)
    search_fields = ("nom", "prenom", "email","statut")
    actions = ["approuver_membre", "rejeter_membre"]

    def approuver_membre(self, request, queryset):
        queryset.update(approbation="Approuvé")

        for membre in queryset:
            print(f"Envoi de l'email à {membre.email}")
            send_mail(
                "Confirmation d'adhésion",
                f"Bonjour {membre.nom},\n\nVotre inscription a été approuvée ! 🎉",
                "campuschrist5@gmail.com",
                [membre.email],
                fail_silently=False,
            )

    def rejeter_membre(self, request, queryset):
        queryset.update(approbation="Rejeté")

        for membre in queryset:
            print(f"Envoi de l'email de refus à {membre.email}")
            send_mail(
                "Refus d'adhésion",
                f"Bonjour {membre.nom},\n\nVotre demande d'inscription a été refusée. Contactez-nous pour plus d'informations.",
                "campuschrist5@gmail.com",
                [membre.email],
                fail_silently=False,
            )

admin.site.register(Membre, MembreAdmin)