import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Users, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ModifierEvenement from "./Modifier_event";

export function Events() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const fetchEvents = () => {
    fetch("http://127.0.0.1:8000/evenements/api/evenements")
      .then((res) => res.json())
      .then((data) => {
        console.log("Données récupérées :", data);
        setEvents(data);
      })
      .catch((error) => console.error("Erreur récupération événements :", error));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const deleteEvenement = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/evenements/api/supprimer/${id}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        alert("Événement supprimé avec succès !");
        fetchEvents();
      } else {
        alert("Erreur lors de la suppression !");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Une erreur s'est produite !");
    }
  };

  const handleModifierClick = (event) => {
    setSelectedEvent(event);
    setShowForm(true);
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Événements</h1>
          <p className="text-slate-600 mt-2">Planifiez et gérez les événements de votre communauté</p>
        </div>
        <Button onClick={() => navigate("/admin/Ajout_event")}>
          <Plus className="h-4 w-4 mr-2" />
          Nouvel événement
        </Button>
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <img
                src={`http://127.0.0.1:8000${event.image}`}
                alt={`Illustration pour ${event.nom}`}
                className="mb-4 w-full h-48 object-cover rounded-md"
              />

              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-slate-900">{event.nom}</h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    event.statut === "Confirmé"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {event.statut}
                </span>
              </div>

              <p className="text-slate-600 mb-4">{event.description}</p>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                  <Calendar className="h-4 w-4 mr-3 text-slate-400" />
                  {new Date(event.date).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <div className="flex items-center text-sm text-slate-600">
                  <Clock className="h-4 w-4 mr-3 text-slate-400" />
                  {event.heure}
                </div>

                <div className="flex items-center text-sm text-slate-600">
                  <MapPin className="h-4 w-4 mr-3 text-slate-400" />
                  {event.lieu}
                </div>

                <div className="flex items-center text-sm text-slate-600">
                  <Users className="h-4 w-4 mr-3 text-slate-400" />
                  {event.capacite} participants attendus
                </div>
              </div>

              <div className="flex space-x-2 mt-6 pt-4 border-t border-slate-200">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleModifierClick(event)}
                >
                  Modifier
                </Button>
                <Button variant="outline" size="sm">Participants</Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
                      deleteEvenement(event.id);
                    }
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-600">Aucun événement trouvé.</p>
      )}

      {showForm && selectedEvent && (
        <ModifierEvenement
          evenement={selectedEvent}
          onCancel={() => setShowForm(false)}
          onUpdated={() => {
            setShowForm(false);
            fetchEvents();
          }}
        />
      )}
    </div>
  );
}