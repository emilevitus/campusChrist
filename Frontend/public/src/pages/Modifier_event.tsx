import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface Evenement {
  id: number;
  titre: string;
  lieu: string;
  description?: string;
  date: string;
  heure?: string;
  statut?: string;
  categorie?: number | { id: number; nom: string };
  image?: string; // on ignore à l'envoi mais garde dans le type
}

interface Categorie {
  id: number;
  nom: string;
}

interface Props {
  evenement: Evenement;
  onCancel: () => void;
  onUpdated: () => void;
}

const ModifierEvenement: React.FC<Props> = ({ evenement, onCancel, onUpdated }) => {
  const [formData, setFormData] = useState(evenement);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/evenements/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Erreur chargement catégories :", err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { image, ...rest } = formData; // on retire "image" ici

    const payload = {
      ...rest,
      categorie:
        typeof formData.categorie === "object"
          ? formData.categorie.id
          : formData.categorie,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/evenements/api/modifier/${formData.id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        toast({
          title: "Événement modifié",
          description: "Les informations de l’événement ont été mises à jour.",
        });
        onUpdated();
      } else {
        toast({
          title: "Erreur",
          description: "Échec de la modification.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur serveur",
        description: "Impossible de modifier l’événement.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-slate-800">
        Modifier l’événement : {formData.titre}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Titre</Label>
          <Input
            name="titre"
            value={formData.titre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Lieu</Label>
          <Input
            name="lieu"
            value={formData.lieu}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Heure (optionnel)</Label>
          <Input
            type="time"
            name="heure"
            value={formData.heure || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Description</Label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            rows={4}
          />
        </div>
        <div>
          <Label>Statut</Label>
          <select
            name="statut"
            value={formData.statut || ""}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">-- Choisir --</option>
            <option value="A venir">À venir</option>
            <option value="En cours">En cours</option>
            <option value="Termine">Terminé</option>
            <option value="Annule">Annulé</option>
          </select>
        </div>
        <div>
          <Label>Catégorie</Label>
          <select
            name="categorie"
            value={
              typeof formData.categorie === "object"
                ? formData.categorie.id
                : formData.categorie || ""
            }
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">-- Choisir une catégorie --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between gap-4">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="w-full"
          >
            Annuler
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ModifierEvenement;