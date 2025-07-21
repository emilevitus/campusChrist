import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ConnexionMembre = () => {
  const [email, setEmail] = useState("");
  const [mot_de_passe, setmot_de_passe] = useState("");
  const [afficher, setAfficher] = useState(false);
  const navigate = useNavigate();

  const handleConnexion = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !mot_de_passe) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs.",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/membres/api/connexion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: mot_de_passe }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("membreConnecte", JSON.stringify(data));
        toast({ title: "Connexion réussie", description: "Bienvenue sur Campus du Christ." });
        setTimeout(() => navigate("/profil"), 1000);
      } else {
        toast({
          title: "Erreur",
          description: data.error || "Échec de l'authentification",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Erreur réseau",
        description: "Impossible de contacter le serveur.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <Card className="rounded-xl shadow-lg">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-2xl font-bold text-center text-blue-700">Connexion Membre</h2>
          <form onSubmit={handleConnexion} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="ex: jean@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="mot_de_passe">Mot de passe</Label>
              <div className="flex gap-2">
                <Input
                  type={afficher ? "text" : "password"}
                  id="mot_de_passe"
                  placeholder="Votre mot de passe"
                  value={mot_de_passe}
                  onChange={(e) => setmot_de_passe(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAfficher((prev) => !prev)}
                >
                  {afficher ? "Masquer" : "Afficher"}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Se connecter
            </Button>
          </form>

          <Button
            variant="ghost"
            className="w-full mt-2 text-blue-600 underline"
            onClick={() => navigate("/")}
          >
            🏠 Retour à l’accueil
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnexionMembre;