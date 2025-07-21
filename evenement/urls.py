from django.urls import path
from .views import liste_evenements, creer_evenement, modifier_evenement, supprimer_evenement, categories

urlpatterns = [
    path("api/evenements", liste_evenements, name="api_liste_evenements"),
    path("api/categories", categories, name="api_categories_evenements"),
    path("api/creer", creer_evenement, name="api_creer_evenement"),
    path("api/modifier/<int:event_id>/", modifier_evenement, name="api_modifier_evenement"),
    path("api/supprimer/<int:event_id>/", supprimer_evenement, name="api_supprimer_evenement"),
]
