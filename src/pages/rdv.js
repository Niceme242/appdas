import React, { useState } from "react";
import { FaCalendarAlt, FaUser, FaEnvelope, FaPhone, FaStethoscope } from "react-icons/fa";

export default function RendezVous() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    date: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire envoyé :", formData);
    setSubmitted(true);
    // Ici tu peux envoyer les données vers ton backend avec fetch/axios
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center py-16 px-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* Illustration médecin */}
        <div className="hidden md:flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=900&q=80"
            alt="Médecin illustration"
            className="rounded-2xl shadow-lg w-full md:w-4/5 transform transition hover:scale-105"
          />
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center flex items-center justify-center gap-2">
            <FaStethoscope /> Prendre rendez-vous
          </h2>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nom */}
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 hover:shadow-md transition">
                <FaUser className="text-blue-600 w-5 h-5" />
                <input
                  type="text"
                  name="nom"
                  placeholder="Votre nom complet"
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className="w-full focus:outline-none text-gray-700"
                />
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 hover:shadow-md transition">
                <FaEnvelope className="text-blue-600 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full focus:outline-none text-gray-700"
                />
              </div>

              {/* Téléphone */}
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 hover:shadow-md transition">
                <FaPhone className="text-blue-600 w-5 h-5" />
                <input
                  type="tel"
                  name="telephone"
                  placeholder="Votre numéro de téléphone"
                  value={formData.telephone}
                  onChange={handleChange}
                  required
                  className="w-full focus:outline-none text-gray-700"
                />
              </div>

              {/* Date */}
              <div className="flex items-center gap-3 border rounded-xl px-4 py-3 hover:shadow-md transition">
                <FaCalendarAlt className="text-blue-600 w-5 h-5" />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full focus:outline-none text-gray-700"
                />
              </div>

              {/* Service */}
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full border rounded-xl px-4 py-3 hover:shadow-md transition focus:outline-none text-gray-700"
              >
                <option value="">Sélectionnez un service</option>
                <option value="Consultation générale">Consultation générale</option>
                <option value="Pédiatrie">Pédiatrie</option>
                <option value="Cardiologie">Cardiologie</option>
                <option value="Chirurgie">Chirurgie</option>
              </select>

              {/* Message */}
              <textarea
                name="message"
                placeholder="Votre message (optionnel)"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 hover:shadow-md transition focus:outline-none text-gray-700"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition transform hover:scale-105"
              >
                Envoyer ma demande
              </button>
            </form>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-green-600 mb-4">
                Merci ! ✅
              </h3>
              <p className="text-gray-700">
                Votre demande de rendez-vous a été envoyée. Nous vous contacterons bientôt.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
