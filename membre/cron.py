from django_cron import CronJobBase, Schedule
from .tache import verifier_demandes_non_traitees, approuver_automatiquement_membre

class GestionDemandesCron(CronJobBase):
    RUN_EVERY_MINS = 60  # Toutes les heures

    schedule = Schedule(run_every_mins=RUN_EVERY_MINS)
    code = "membre.gestion_demandes"

    def do(self):
        verifier_demandes_non_traitees()
        approuver_automatiquement_membre()