import React, { useState, useEffect, useRef } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaLinkedin,
  FaFacebookF,
  FaPaperPlane,
  FaCheckCircle,
  FaInstagram
} from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import './contact.css';

const EMAILJS_SERVICE_ID = "service_lws";
const EMAILJS_TEMPLATE_ID = "template_uzhfj6i";
const EMAILJS_PUBLIC_KEY = "HZW3zAKPkHytszYlk";

if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Composant ContactForm séparé
const ContactForm = () => {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
    phone: false,
    company: false,
    subject: false,
    message: false
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });

  const contactSubjects = [
    'Demande d\'information',
    'Devis pour un projet',
    'Support technique',
    'Partenaire commercial',
    'Autre demande'
  ];

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleLabelClick = (fieldName) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Valider tous les champs requis
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const isValid = requiredFields.every(field => {
      if (field === 'email') {
        return formData[field] && validateEmail(formData[field]);
      }
      return formData[field];
    });

    if (!isValid) {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      const allTouched = {};
      requiredFields.forEach(field => {
        allTouched[field] = true;
      });
      setTouchedFields(prev => ({ ...prev, ...allTouched }));
      setIsSubmitting(false);
      return;
    }

    // Construire le message formaté
    const fullMessage = `
📩 **Nouveau message de contact**

**Informations du contact :**
- **Nom :** ${formData.name}
- **Email :** ${formData.email}
- **Téléphone :** ${formData.phone || 'Non fourni'}
- **Entreprise :** ${formData.company || 'Non fournie'}

**Sujet :** ${formData.subject}

**Message :**
${formData.message}

-------------------------
Envoyé depuis le formulaire de contact DAS
`;

    try {
      // Utiliser la même configuration EmailJS que le footer
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          message: fullMessage  // SEULE VARIABLE DU TEMPLATE
        },
        EMAILJS_PUBLIC_KEY
      );

      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });

      // Afficher le message de succès
      setIsSubmitted(true);

      // Réinitialiser après 5 secondes
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      
      // Gestion d'erreur utilisateur
      alert('Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
      
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="col-lg-7">
      <div className="contact-form-card">
        <div className="form-header mb-4">
          <h3 className="fw-bold mb-2">
            <FaPaperPlane className="me-2 text-logo-vert" />
            Envoyez-nous un message
          </h3>
          <p className="text-muted">
            Remplissez ce formulaire et nous vous répondrons dans les plus brefs délais.
          </p>
        </div>

        {isSubmitted ? (
          <div className="alert alert-success text-center py-4">
            <FaCheckCircle size={48} className="mb-3" />
            <h4 className="fw-bold">Message envoyé avec succès !</h4>
            <p className="mb-0">
              Merci pour votre message. Nous vous répondrons dans les 24 heures.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label 
                  className="form-label fw-semibold" 
                  onClick={() => handleLabelClick('name')}
                  htmlFor="name-field"
                >
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name-field"
                  name="name"
                  className={`form-control touch-friendly ${touchedFields.name && !formData.name ? 'is-invalid' : ''}`}
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  autoComplete="name"
                />
                {touchedFields.name && !formData.name && (
                  <div className="invalid-feedback">Le nom est requis</div>
                )}
              </div>
              <div className="col-md-6">
                <label 
                  className="form-label fw-semibold"
                  onClick={() => handleLabelClick('email')}
                  htmlFor="email-field"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email-field"
                  name="email"
                  className={`form-control touch-friendly ${touchedFields.email && (!formData.email || !validateEmail(formData.email)) ? 'is-invalid' : ''}`}
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  autoComplete="email"
                />
                {touchedFields.email && (!formData.email || !validateEmail(formData.email)) && (
                  <div className="invalid-feedback">
                    {!formData.email ? 'L\'email est requis' : 'Email invalide'}
                  </div>
                )}
              </div>
            </div>

            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label 
                  className="form-label fw-semibold"
                  onClick={() => handleLabelClick('phone')}
                  htmlFor="phone-field"
                >
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone-field"
                  name="phone"
                  className="form-control touch-friendly"
                  placeholder="+242 06 540 99 59"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoComplete="tel"
                />
              </div>
              <div className="col-md-6">
                <label 
                  className="form-label fw-semibold"
                  onClick={() => handleLabelClick('company')}
                  htmlFor="company-field"
                >
                  Entreprise
                </label>
                <input
                  type="text"
                  id="company-field"
                  name="company"
                  className="form-control touch-friendly"
                  placeholder="Nom de votre société"
                  value={formData.company}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoComplete="organization"
                />
              </div>
            </div>

            <div className="mb-4">
              <label 
                className="form-label fw-semibold"
                onClick={() => handleLabelClick('subject')}
                htmlFor="subject-field"
              >
                Sujet *
              </label>
              <select
                id="subject-field"
                name="subject"
                className={`form-select touch-friendly ${touchedFields.subject && !formData.subject ? 'is-invalid' : ''}`}
                value={formData.subject}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              >
                <option value="">Sélectionnez un sujet</option>
                {contactSubjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </select>
              {touchedFields.subject && !formData.subject && (
                <div className="invalid-feedback">Veuillez sélectionner un sujet</div>
              )}
            </div>

            <div className="mb-4">
              <label 
                className="form-label fw-semibold"
                onClick={() => handleLabelClick('message')}
                htmlFor="message-field"
              >
                Message *
              </label>
              <textarea
                id="message-field"
                name="message"
                className={`form-control touch-friendly ${touchedFields.message && !formData.message ? 'is-invalid' : ''}`}
                rows="6"
                placeholder="Décrivez votre projet ou votre demande..."
                value={formData.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              ></textarea>
              {touchedFields.message && !formData.message && (
                <div className="invalid-feedback">Le message est requis</div>
              )}
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <p className="small text-muted mb-0">* Champs obligatoires</p>
              <button
                type="submit"
                className="btn btn-primary degradient-logo-vert px-4 py-2 touch-friendly-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message <FiSend className="ms-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// Composant principal ContactPage
const ContactPage = () => {
  const [submitError, setSubmitError] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Supprimer setAnimatedElements car il n'est pas utilisé
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Notre adresse',
      details: ['13 Rue NKO', 'Plateaux des 15 ans', 'Brazzaville Congo'],
      color: 'primary'
    },
    {
      icon: <FaPhone />,
      title: 'Téléphone',
      details: ['+242 06 540 99 59', '+237 677 20 26 53'],
      color: 'success'
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      details: ['info@das-congo.com', 'contact@das-congo.com'],
      color: 'warning'
    },
    {
      icon: <FaClock />,
      title: 'Horaires',
      details: ['Lundi - Vendredi: 8h-16h', 'Samedi: 8h-14h'],
      color: 'info'
    }
  ];

  const socialLinks = [
    { 
      icon: <FaLinkedin />, 
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/company/data-analytics-solutions-congo/' 
    },
    { 
      icon: <FaFacebookF />, 
      label: 'Facebook', 
      url: 'https://www.facebook.com/share/1ARV9QjBJy/?mibextid=wwXIfr' 
    },
    { 
      icon: <FaInstagram />, 
      label: 'Instagram', 
      url: 'https://www.instagram.com/data_analytitics_solutions?igsh=dDN1ZXp2MjE1dDg2&utm_source=qr'
    }
  ];

  return (
    <div className="contact-page-container">
      <section className="contact-hero py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h1 className="display-4 fw-bold mb-4">
                <span className="text-gradient">Contactez</span>-nous
              </h1>
              <p className="lead mb-4">
                Nous sommes là pour répondre à toutes vos questions sur nos solutions d'analyse de données.
                Discutons de votre projet !
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <span className="badge bg-primary p-2">Réponse sous 24h</span>
                <span className="badge bg-success p-2">Support 7j/7</span>
                <span className="badge bg-warning p-2">Expert dédié</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {(submitError || submitMessage) && (
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className={`alert ${submitError ? 'alert-danger' : 'alert-success'} alert-dismissible fade show`} role="alert">
                {submitMessage}
                <button type="button" className="btn-close" onClick={() => {
                  setSubmitError(false);
                  setSubmitMessage('');
                }}></button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="contact-info-section py-5">
        <div className="container">
          <div className="row g-4">
            {contactInfo.map((info, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <div className={`contact-info-card border-${info.color}`}>
                  <div className={`contact-icon bg-${info.color}`}>
                    {info.icon}
                  </div>
                  <h5 className="mt-3 mb-2">{info.title}</h5>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="mb-1 small">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-form-section py-5">
        <div className="container">
          <div className="row g-5">
            {/* Utilisation du composant ContactForm */}
            <ContactForm />

            <div className="col-lg-5">
              <div className="map-container mb-4">
                <div className="map-placeholder">
                  <div className="map-content text-center p-4">
                    <FaMapMarkerAlt size={48} className="text-primary mb-3 text-logo-vert" />
                    <h5 className="fw-bold mb-2 text-white">Notre siège social</h5>
                    <p className="mb-0 text-white">
                      13 Rue NKO, Plateaux des 15 ans<br />
                      Brazzaville Congo
                    </p>
                  </div>
                </div>
              </div>

              <div className="social-links-card mb-4">
                <h5 className="fw-bold mb-3">Suivez-nous</h5>
                <div className="d-flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-link"
                    >
                      <div className="social-icon">
                        {social.icon}
                      </div>
                      <span className="social-label">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="additional-info-card">
                <h5 className="fw-bold mb-3">Informations utiles</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <strong>Délai de réponse :</strong> Sous 24h ouvrées
                  </li>
                  <li className="mb-2">
                    <strong>Support urgent :</strong> Appelez le +242 06 540 99 59
                  </li>
                  <li className="mb-2">
                    <strong>Email de secours :</strong> info@das-congo.com
                  </li>
                  <li>
                    <strong>Horaires support :</strong> Lun-Ven 8h-16h, Sam 8h-14h
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section py-5 bg-light">
        <div className="container">
          <div className="row mb-4">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="fw-bold mb-3">Questions fréquentes</h2>
              <p className="text-muted">
                Retrouvez les réponses aux questions les plus courantes
              </p>
            </div>
          </div>
          
          <div className="row g-4">
            <div className="col-md-6">
              <div className="faq-item">
                <h5 className="fw-semibold">Quel est le délai de réponse ?</h5>
                <p className="text-muted mb-0">
                  Nous nous engageons à répondre à toutes les demandes dans un délai de 24 heures 
                  ouvrées. Pour les urgences, utilisez notre numéro dédié.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="faq-item">
                <h5 className="fw-semibold">Proposez-vous des démonstrations ?</h5>
                <p className="text-muted mb-0">
                  Oui, nous organisons des démonstrations personnalisées en ligne. 
                  Réservez une date par email.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="faq-item">
                <h5 className="fw-semibold">Quels sont vos horaires de support ?</h5>
                <p className="text-muted mb-0">
                  Notre support technique est disponible du lundi au vendredi de 8h à 16h, 
                  et le samedi de 8h à 14h pour les urgences.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="faq-item">
                <h5 className="fw-semibold">Comment devenir partenaire ?</h5>
                <p className="text-muted mb-0">
                  Pour toute demande de partenariat, sélectionnez "Partenariat commercial" 
                  dans le formulaire de contact. Notre équipe vous recontactera rapidement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .contact-page-container {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.5rem;
          cursor: pointer;
          user-select: none;
          padding: 2px 0;
        }
        
        .form-label:hover {
          color: #0d6efd;
        }
        
        .touch-friendly {
          padding: 0.75rem 1rem !important;
          min-height: 48px !important;
          font-size: 16px !important;
          line-height: 1.5 !important;
          border: 2px solid #dee2e6;
          border-radius: 8px;
          transition: all 0.2s ease;
          width: 100%;
          background-color: white;
          cursor: text;
          touch-action: manipulation;
        }
        
        .touch-friendly:focus,
        .touch-friendly.focused {
          border-color: #0d6efd !important;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
          outline: none;
        }
        
        .touch-friendly:hover {
          border-color: #adb5bd;
        }
        
        textarea.form-control {
          min-height: 150px;
          resize: vertical;
          padding-top: 0.75rem;
          padding-bottom: 0.75rem;
        }
        
        .form-select.touch-friendly {
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 16px 12px;
          padding-right: 2.5rem;
        }
        
        .touch-friendly-btn {
          min-height: 48px !important;
          min-width: 120px !important;
          padding: 0.75rem 1.5rem !important;
          font-size: 16px !important;
          border-radius: 8px;
          cursor: pointer;
          user-select: none;
          touch-action: manipulation;
        }
        
        .touch-friendly-btn:active {
          transform: translateY(1px);
        }
        
        .degradient-logo-vert {
          background: linear-gradient(135deg, #3b82f6, #10b981);
          border: none;
          color: white;
          transition: all 0.2s ease;
        }
        
        .degradient-logo-vert:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(16, 185, 129, 0.4);
        }
        
        .degradient-logo-vert:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none !important;
        }
        
        .form-control.is-invalid,
        .form-select.is-invalid {
          border-color: #dc3545 !important;
        }
        
        .form-control.is-invalid:focus,
        .form-select.is-invalid:focus {
          box-shadow: 0 0 0 0.25rem rgba(220, 53, 69, 0.25) !important;
        }
        
        .invalid-feedback {
          display: block;
          color: #dc3545;
          font-size: 0.875em;
          margin-top: 0.25rem;
        }
        
        .alert {
          animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @media (max-width: 768px) {
          .touch-friendly {
            min-height: 52px !important;
            padding: 0.875rem 1rem !important;
          }
          
          .touch-friendly-btn {
            min-height: 52px !important;
            min-width: 140px !important;
          }
          
          textarea.form-control {
            min-height: 120px;
          }
          
          .form-label {
            font-size: 1rem;
            margin-bottom: 0.375rem;
          }
        }
        
        @media (max-width: 480px) {
          .touch-friendly {
            min-height: 56px !important;
          }
        }
        
        @supports (-webkit-overflow-scrolling: touch) {
          .touch-friendly {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;