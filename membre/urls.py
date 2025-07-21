from django.urls import path
from .views import liste_membres_api, inscription_api, modifier_membre_api, supprimer_membre_api,connexion

urlpatterns = [
    path("api/membres", liste_membres_api, name="api_liste_membres"),
    path("api/adhesion", inscription_api, name="api_ajouter_membre"),
    path("api/modifier/<int:membre_id>/", modifier_membre_api, name="api_modifier_membre"),
    path("api/supprimer/<int:membre_id>/", supprimer_membre_api, name="api_supprimer_membre"),
    path("api/connexion", connexion, name="connexion"),
]