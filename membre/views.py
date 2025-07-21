from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Membre
from django.contrib.auth.hashers import check_password
from .serializers import MembreSerializer
from django.core.mail import send_mail

@api_view(["GET"])
def liste_membres_api(request):
    membres = Membre.objects.all()
    serializer = MembreSerializer(membres, many=True)
    return Response(serializer.data)

@api_view(["POST"])
def inscription_api(request):
    serializer = MembreSerializer(data=request.data)
    if serializer.is_valid():
        membre = serializer.save()
        membre.set_password(serializer.validated_data["mot_de_passe"])  # Crypte le mot de passe
        membre.save()  # Enregistre avec le mot de passe crypté
        send_mail(
            "Confirmation de demande d'adhésion",
            f"Bonjour {membre.nom},\n\nVotre demande d'adhésion a bien été reçue. Elle sera traitée sous 48h.",
            "campuschrist5@gmail.com",
            [membre.email],
            fail_silently=False,
        )
        if membre.approbation == "Approuvé":
            send_mail(
                "Confirmation d'adhésion",
                f"Bonjour {membre.nom},\n\nVotre inscription a été approuvée ! 🎉",
                "campuschrist5@gmail.com",
                [membre.email],
                fail_silently=False,
            )
        elif membre.approbation == "Rejeté":
            send_mail(
                "Refus d'adhésion",
                f"Bonjour {membre.nom},\n\nVotre demande d'inscription a été refusée.",
                "campuschrist5@gmail.com",
                [membre.email],
                fail_silently=False,
            )

        return Response({"message": "Inscription réussie ! Email envoyé."}, status=201)
    return Response(serializer.errors, status=400)


@api_view(["PUT", "PATCH"])
def modifier_membre_api(request, membre_id):
    membre = Membre.objects.get(id=membre_id)
    serializer = MembreSerializer(membre, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

@api_view(["DELETE"])
def supprimer_membre_api(request, membre_id):
    membre = Membre.objects.get(id=membre_id)
    membre.delete()
    return Response({"message": "Membre supprimé"}, status=204)


@api_view(["POST"])
def connexion(request):
    email = request.data.get("email")
    mot_de_passe = request.data.get("password")
    try:
        membre = Membre.objects.get(email=email)

        # Vérification sécurisée du mot de passe
        if check_password(mot_de_passe, membre.mot_de_passe):
            return Response({"message": "Connexion réussie", "membre_id": membre.id}, status=200)
        else:
            return Response({"error": "Mot de passe incorrect"}, status=400)

    except Membre.DoesNotExist:
        return Response({"error": "Email non trouvé"}, status=400)