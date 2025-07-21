from django.core.mail import send_mail
from django.utils.timezone import now
from .models import Membre
from datetime import timedelta

def verifier_demandes_non_traitees():
    membres_en_attente = Membre.objects.filter(approbation="En attente")
    for membre in membres_en_attente:
        if now - membre.date_inscription >= timedelta(minutes=5):
            send_mail(
                "Rappel : Votre demande d'adhésion",
                f"Bonjour {membre.nom},\n\nNous n'avons pas encore traité votre demande. Un administrateur devrait vous répondre sous peu.",
                "campuschrist5@gmail.com",
                [membre.email],
                fail_silently=False,
            )


def approuver_automatiquement_membre():
    membres_en_attente = Membre.objects.filter(approbation="En attente")
    for membre in membres_en_attente:
        if now - membre.date_inscription >= timedelta(minutes=10):
            membre.approbation = "Approuvé"
            membre.save()
            send_mail(
                "Votre demande d'adhésion a été approuvée",
                f"Bonjour {membre.nom},\n\nVotre demande d'adhésion a été automatiquement approuvée.",
                "campuschrist5@gmail.com",
                [membre.email],
                fail_silently=False,
            )