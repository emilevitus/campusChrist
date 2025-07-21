import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const AjoutEvent = () => {
  const [categories, setCategories] = useState([]);
  const [formDataState, setFormDataState] = useState({
    nom: "",
    description: "",
    heure: "12:00",
    date: "",
    lieu: "",
    capacite: 100,
    statut: "A venir",
    categorie: "",
    image: null,
    imageURL: "",
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/evenements/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() =>
        toast({
          title: "Erreur",
          description: "Échec du chargement des catégories",
          variant: "destructive",
        })
      );
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormDataState((prev) => ({
            ...prev,
            image: file,
            imageURL: reader.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormDataState((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(formDataState).forEach(([key, value]) => {
      if (key === "imageURL") return;

      if (key === "categorie") {
        formData.append("categorie_id", parseInt(value, 10));
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/evenements/api/creer", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Succès",
          description: "Événement ajouté avec succès!",
        });
        // Optionnel : reset du formulaire ici si tu veux
        // setFormDataState({ ... });
      } else {
        const err = await response.json();
        toast({
          title: "Erreur",
          description: "Échec de l’ajout : " + JSON.stringify(err),
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de contacter le serveur.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center text-blue-700">Créer un événement</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nom">Nom</Label>
              <Input name="nom" value={formDataState.nom} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input name="description" value={formDataState.description} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input type="date" name="date" value={formDataState.date} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="heure">Heure</Label>
              <Input type="time" name="heure" value={formDataState.heure} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="lieu">Lieu</Label>
              <Input name="lieu" value={formDataState.lieu} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="capacite">Participants attendus</Label>
              <Input type="number" name="capacite" value={formDataState.capacite} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="statut">Statut</Label>
              <select
                name="statut"
                value={formDataState.statut}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md p-2"
              >
                <option value="A venir">A venir</option>
                <option value="En cours">En cours</option>
                <option value="Termine">Terminé</option>
                <option value="Annule">Annulé</option>
              </select>
            </div>
            <div>
              <Label htmlFor="categorie">Catégorie</Label>
              <select
                name="categorie"
                value={formDataState.categorie}
                onChange={handleChange}
                className="w-full mt-1 border rounded-md p-2"
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
            <div>
              <Label htmlFor="image">Image</Label>
              <Input type="file" name="image" accept="image/*" onChange={handleChange} />
              {formDataState.imageURL && (
                <img
                  src={formDataState.imageURL}
                  alt="Prévisualisation"
                  className="mt-2 w-full h-40 object-cover rounded-md"
                />
              )}
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Ajouter l'événement
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AjoutEvent;