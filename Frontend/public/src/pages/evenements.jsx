import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 
const EventAdmin = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    nom: '',
    description: '',
    heure: '12:00',
    date: '',
    lieu: '',
    capacite: 0,
    statut: 'En cours',
    image: null,
    imageURL: ''
  });
 
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: file, imageURL: reader.result }));
      };
      if (file) reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setEvents(prev => prev.map(ev => (ev.id === formData.id ? { ...formData } : ev)));
    } else {
      const newEvent = {
        ...formData,
        id: Date.now().toString(),
      };
      setEvents(prev => [...prev, newEvent]);
    }
    resetForm();
  };
 
  const handleEdit = (id) => {
    const ev = events.find(e => e.id === id);
    setFormData({ ...ev });
  };
 
  const handleDelete = (id) => {
    if (window.confirm('Supprimer cet événement ?')) {
      setEvents(prev => prev.filter(ev => ev.id !== id));
    }
  };
 
  const resetForm = () => {
    setFormData({
      id: null,
      nom: '',
      description: '',
      heure: '12:00',
      date: '',
      lieu: '',
      capacite: 0,
      statut: 'En cours',
      image: null,
      imageURL: ''
    });
  };
 
  return (
    <div className="container py-4">
      <h2 className="mb-4">🎛️ Gestion des événements de l'Église</h2>
      <form onSubmit={handleSubmit} className="card p-4 mb-4">
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input type="text" name="nom" className="form-control" value={formData.nom} onChange={handleChange} required />
        </div>
 
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleChange} required />
        </div>
 
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Heure</label>
            <input type="time" name="heure" className="form-control" value={formData.heure} onChange={handleChange} required />
          </div>
          <div className="col">
            <label className="form-label">Date</label>
            <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} required />
          </div>
        </div>
 
        <div className="mb-3">
          <label className="form-label">Lieu</label>
          <input type="text" name="lieu" className="form-control" value={formData.lieu} onChange={handleChange} required />
        </div>
 
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Capacité</label>
            <input type="number" name="capacite" className="form-control" value={formData.capacite} onChange={handleChange} required />
          </div>
          <div className="col">
            <label className="form-label">Statut</label>
            <select name="statut" className="form-select" value={formData.statut} onChange={handleChange} required>
              <option value="En cours">En cours</option>
              <option value="A venir">A vénir</option>
              <option value="Terminé">Terminé</option>
              <option value="Annulé">Annulé</option>
              <option value="Complet">Complet</option>
            </select>
          </div>
        </div>
 
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" name="image" className="form-control" onChange={handleChange} accept="image/*" />
        </div>
 
        {formData.imageURL && (
          <div className="mb-3">
            <label className="form-label">Aperçu de l'image</label><br />
            <img src={formData.imageURL} alt="aperçu" style={{ maxWidth: '200px' }} />
          </div>
        )}
       
 
        <button type="submit" className="btn btn-primary me-2">
          {formData.id ? 'Modifier' : 'Ajouter'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={resetForm}>Réinitialiser la page</button>
      </form>
 
      <h4>📅 Liste des événements</h4>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Nom</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Lieu</th>
            <th>Capacité</th>
            <th>Statut</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map(ev => (
              <tr key={ev.id}>
                <td>{ev.nom}</td>
                <td>{ev.date}</td>
                <td>{ev.heure}</td>
                <td>{ev.lieu}</td>
                <td>{ev.capacite}</td>
                <td>{ev.statut}</td>
                <td>{ev.description}</td>
                <td>
                  {ev.imageURL && <img src={ev.imageURL} alt="event" style={{ maxWidth: '100px' }} />}
                </td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(ev.id)}>
                    Modifier
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(ev.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">Aucun événement enregistré.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
 
export default EventAdmin;
 