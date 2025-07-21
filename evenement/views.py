from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response

from membre.models import Membre
from .models import Evenement,CategorieEvenement
from .serializers import EvenementSerializer,CategorieEvenementSerializer
from django.core.mail import send_mail
from rest_framework.parsers import MultiPartParser, FormParser

@api_view(["GET"])
def liste_evenements(request):
    evenements = Evenement.objects.all()
    serializer = EvenementSerializer(evenements, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def categories(request):
    categories = CategorieEvenement.objects.all()
    serializer = CategorieEvenementSerializer(categories, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser]) #permet d'accepeter les fichiers
def creer_evenement(request):
    data = request.data.copy()
    image = request.FILES.get("image")  # Récupérer le fichier image
    if image:
        data["image"] = image

    serializer = EvenementSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        membres = Membre.objects.all()
        for membre in membres:
            send_mail(
                "Evenements crees",
                f"Bonjour {membre.nom},\n\n un nouvel evenement a ete publie sur votre site Campuschrist,vous pouvez le consulter a tout moment.",
                "campuschrist5@gmail.com",
                [membre.email],
                fail_silently=False,
            )
        return Response({"message": "Événement créé avec succès !"}, status=201)
    return Response(serializer.errors, status=400)

@api_view(["PUT", "PATCH"])
def modifier_evenement(request, event_id):
    evenement = Evenement.objects.get(id=event_id)
    serializer = EvenementSerializer(evenement, data=request.data, partial=True)
    print("Reçu :", request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    if not serializer.is_valid():
        print("Erreurs serializer :", serializer.errors)
        return Response(serializer.errors, status=400)
    return Response(serializer.errors, status=400)

@api_view(["DELETE"])
def supprimer_evenement(request, event_id):
    evenement = Evenement .objects.get(id=event_id)
    evenement.delete()
    return Response({"message": "evenement supprimé"}, status=204)