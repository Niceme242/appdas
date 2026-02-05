import React, { useState, useEffect, useRef } from 'react';
import './LaboratoireDepartement.css';
import { FaDna, FaFlask, FaStethoscope } from "react-icons/fa";

const LaboratoireDepartementV2 = () => {
  const [activeCategory, setActiveCategory] = useState('paternite');
  const [hoveredExam, setHoveredExam] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  // Données des catégories d'examens
  const examCategories = {
    paternite: {
      title: "Tests de Parenté",
      color: "#4a6fa5",
      icon: <FaDna size={36} className="text-primary" />,
      exams: [
        {
          id: 1,
          title: "Test de Paternité Standard",
          description: "Établissement de paternité avec une fiabilité de 99,9% pour une tranquillité d'esprit absolue.",
          time: "3-5 jours",
          accuracy: "99.9%",
          price: "299€",
          features: ["Résultats rapides", "Confidentialité totale", "Échantillons buccaux", "Support expert 24/7"]
        },
        {
          id: 2,
          title: "Test de Paternité Légal",
          description: "Test certifié pour une utilisation en procédure judiciaire avec chaîne de traçabilité complète.",
          time: "5-7 jours",
          accuracy: "99.99%",
          price: "499€",
          features: ["Valable en justice", "Documentation certifiée", "Prélèvement supervisé", "Rapport détaillé"]
        },
        {
          id: 3,
          title: "Test Fratrie",
          description: "Détermination du lien biologique entre frères et sœurs avec analyse ADN approfondie.",
          time: "5-8 jours",
          accuracy: "98%",
          price: "399€",
          features: ["Analyse complète", "Interprétation génétique", "Résultats détaillés", "Consultation incluse"]
        }
      ]
    },
    genetique: {
      title: "Tests Génétiques",
      color: "#16697a",
      icon: <FaFlask size={36} className="text-warning" />,
      exams: [
        {
          id: 4,
          title: "Dépistage Prénatal",
          description: "Détection non invasive des anomalies chromosomiques dès la 9ème semaine de grossesse.",
          time: "7-10 jours",
          accuracy: "99%",
          price: "699€",
          features: ["Sécurité maximale", "Précision élevée", "Conseil génétique", "Résultats complets"]
        },
        {
          id: 5,
          title: "Test de Prédisposition",
          description: "Analyse des prédispositions génétiques à certaines conditions de santé.",
          time: "10-14 jours",
          accuracy: "95%",
          price: "449€",
          features: ["Panel complet", "Rapport personnalisé", "Recommandations", "Suivi médical"]
        }
      ]
    },
    medical: {
      title: "Analyses Médicales",
      color: "#db5461",
      icon: <FaStethoscope size={36} className="text-success" />,
      exams: [
        {
          id: 6,
          title: "Profil Biochimique Complet",
          description: "Évaluation approfondie de plus de 50 paramètres sanguins pour un bilan santé complet.",
          time: "1-2 jours",
          accuracy: "99.8%",
          price: "189€",
          features: ["50+ paramètres", "Interprétation médicale", "Détection précoce", "Suivi numérique"]
        },
        {
          id: 7,
          title: "Panel Hormonal",
          description: "Analyse complète du profil hormonal pour l'équilibre endocrinien.",
          time: "3-4 jours",
          accuracy: "99.5%",
          price: "249€",
          features: ["10+ hormones", "Graphiques d'évolution", "Conseils personnalisés", "Téléconsultation"]
        }
      ]
    }
  };

  // Services du laboratoire
  const labServices = [
    { name: "Séquençage ADN", icon: "🔍", description: "Technologie de pointe" },
    { name: "Cytogénétique", icon: "🧫", description: "Analyse chromosomique" },
    { name: "Moléculaire", icon: "⚛️", description: "PCR et qPCR" },
    { name: "Toxicologie", icon: "⚠️", description: "Dépistage complet" },
    { name: "Immunologie", icon: "🛡️", description: "Tests sérologiques" },
    { name: "Microbiologie", icon: "🦠", description: "Culture et identification" }
  ];

  // Processus étape par étape - HORIZONTAL
  const processSteps = [
    { 
      step: 1, 
      title: "Commande en ligne", 
      description: "Choisissez votre test en quelques clics",
      icon: "🛒",
      details: "Sélectionnez le test ADN adapté à vos besoins"
    },
    { 
      step: 2, 
      title: "Kit de prélèvement", 
      description: "Livraison à domicile sous 24h",
      icon: "📦",
      details: "Kit stérile avec instructions détaillées"
    },
    { 
      step: 3, 
      title: "Prélèvement ADN", 
      description: "Simple, rapide et indolore",
      icon: "👄",
      details: "Écouvillon buccal - Aucune aiguille"
    },
    { 
      step: 4, 
      title: "Retour au labo", 
      description: "Enveloppe prépayée incluse",
      icon: "📮",
      details: "Retour gratuit et sécurisé"
    },
    { 
      step: 5, 
      title: "Analyse ADN", 
      description: "Par nos experts certifiés",
      icon: "🔬",
      details: "Technologie de séquençage de pointe"
    },
    { 
      step: 6, 
      title: "Résultats", 
      description: "Consultation sécurisée en ligne",
      icon: "📊",
      details: "Rapport détaillé sous 3-5 jours"
    }
  ];

  // Auto-rotation des étapes
  useEffect(() => {
  const interval = setInterval(() => {
    setActiveStep((prev) => (prev + 1) % processSteps.length);
  }, 4000);
  
  return () => clearInterval(interval);
}, [processSteps.length]); // ← ICI : processSteps.length doit être dans le tableau

  // Gestion du clic sur une étape
  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <div className="lab-container-v2">
      {/* Navigation fixe */}
     

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Expertise en <span className="highlight">Tests ADN</span> 
            <br />et Analyses de Laboratoire
          </h1>
          <p className="hero-subtitle">
            Des résultats précis, confidentiels et livrés rapidement 
            par notre équipe d'experts en génétique.
          </p>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Fiabilité</div>
            </div>
            <div className="stat">
              <div className="stat-number">10k+</div>
              <div className="stat-label">Tests réalisés</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
        
        {/* Effet de fond avec molécules animées */}
        <div className="molecule-background">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="molecule"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                fontSize: `${Math.random() * 20 + 10}px`
              }}
            >
              {['🧬', '🧪', '🔬', '⚗️', '🦠', '🩸'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
        </div>
      </section>

      {/* Section des tests */}
      <section id="tests" className="tests-section" ref={sectionRef}>
        <div className="section-header">
          <h2>Nos <span className="text-gradient">Tests Spécialisés</span></h2>
          <p className="section-subtitle">
            Des solutions d'analyse ADN adaptées à chaque besoin
          </p>
        </div>

        {/* Filtres de catégories */}
        <div className="category-filters">
          {Object.entries(examCategories).map(([key, category]) => (
            <button
              key={key}
              className={`category-filter ${activeCategory === key ? 'active' : ''}`}
              onClick={() => setActiveCategory(key)}
              style={{ '--category-color': category.color }}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-text">{category.title}</span>
            </button>
          ))}
        </div>

        {/* Grille des tests className="swiper-next" variant="outline-primary" */}
        <div className="exams-grid">
          {examCategories[activeCategory].exams.map((exam) => (
            <div
              key={exam.id}
              className={`exam-card ${hoveredExam === exam.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredExam(exam.id)}
              onMouseLeave={() => setHoveredExam(null)}
              style={{ '--card-color': examCategories[activeCategory].color }}
            >
              <div className="card-header">
                <div className="exam-icon">{examCategories[activeCategory].icon}</div>
                <div className="exam-badges">
                  <span className="badge time">{exam.time}</span>
                  <span className="badge accuracy">{exam.accuracy}</span>
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="exam-title">{exam.title}</h3>
                <p className="exam-description">{exam.description}</p>
                
                <div className="exam-features">
                  {exam.features.map((feature, idx) => (
                    <div key={idx} className="feature">
                      <div className="feature-dot"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card-footer">
                <div className="price">
                  <span className="price-amount">{exam.price}</span>
                  <span className="price-note">TTC</span>
                </div>
                <button className="card-button">
                  Commander
                  <i className="bi bi-arrow-right"></i>
                </button>
              </div>
              
              {/* Effet de surbrillance */}
              <div className="card-highlight"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Section processus - HORIZONTAL */}
      <section id="processus" className="process-section-horizontal">
        <div className="section-header">
          <h2>Processus <span className="text-gradient">ADN en 6 Étapes</span></h2>
          <p className="section-subtitle">
            Découvrez comment nos tests ADN fonctionnent, du début à la fin
          </p>
        </div>

        {/* Timeline horizontale */}
        <div className="horizontal-timeline">
          {/* Ligne de connexion */}
          <div className="timeline-line">
            <div 
              className="timeline-progress" 
              style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
            ></div>
          </div>
          
          {/* Étapes */}
          <div className="timeline-steps">
            {processSteps.map((step, index) => (
              <div 
                key={step.step}
                className={`timeline-step ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
                onClick={() => handleStepClick(index)}
              >
                <div className="step-indicator">
                  <div className="step-number">{step.step}</div>
                  <div className="step-icon">{step.icon}</div>
                </div>
                <div className="step-content">
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Détails de l'étape active */}
        <div className="step-details-container">
          <div className="step-details-card">
            <div className="details-header">
              <div className="details-icon">{processSteps[activeStep].icon}</div>
              <div>
                <h3 className="details-title">{processSteps[activeStep].title}</h3>
                <div className="details-step">Étape {processSteps[activeStep].step}/6</div>
              </div>
            </div>
            <div className="details-body">
              <p className="details-text">{processSteps[activeStep].details}</p>
              <div className="details-tips">
                {activeStep === 0 && (
                  <ul className="tips-list">
                    <li>✅ Choisissez parmi 10+ tests ADN</li>
                    <li>✅ Paiement sécurisé en ligne</li>
                    <li>✅ Confirmation immédiate par email</li>
                  </ul>
                )}
                {activeStep === 1 && (
                  <ul className="tips-list">
                    <li>✅ Kit stérile et certifié</li>
                    <li>✅ Instructions illustrées incluses</li>
                    <li>✅ Suivi de livraison en temps réel</li>
                  </ul>
                )}
                {activeStep === 2 && (
                  <ul className="tips-list">
                    <li>✅ Prélèvement en 30 secondes</li>
                    <li>✅ Aucune douleur ni gêne</li>
                    <li>✅ Échantillon stable 30 jours</li>
                  </ul>
                )}
                {activeStep === 3 && (
                  <ul className="tips-list">
                    <li>✅ Enveloppe retour prépayée</li>
                    <li>✅ Traçabilité complète</li>
                    <li>✅ Réception confirmée par SMS</li>
                  </ul>
                )}
                {activeStep === 4 && (
                  <ul className="tips-list">
                    <li>✅ Analyse sous 48h ouvrables</li>
                    <li>✅ Double vérification par experts</li>
                    <li>✅ Contrôle qualité strict</li>
                  </ul>
                )}
                {activeStep === 5 && (
                  <ul className="tips-list">
                    <li>✅ Accès sécurisé en ligne</li>
                    <li>✅ Rapport détaillé et clair</li>
                    <li>✅ Support téléphonique inclus</li>
                  </ul>
                )}
              </div>
            </div>
            <div className="details-footer">
              <button className="details-button">
                <i className="bi bi-download"></i>
                Télécharger le guide
              </button>
              <div className="step-navigation">
                <button 
                  className="nav-button prev"
                  onClick={() => setActiveStep(prev => prev > 0 ? prev - 1 : processSteps.length - 1)}
                >
                  <i className="bi bi-chevron-left"></i>
                  Précédent
                </button>
                <button 
                  className="nav-button next"
                  onClick={() => setActiveStep(prev => prev < processSteps.length - 1 ? prev + 1 : 0)}
                >
                  Suivant
                  <i className="bi bi-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
          
          {/* Visualisation ADN */}
          <div className="dna-visualization">
            <div className="dna-animation">
              <div className="dna-strand">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i}
                    className={`dna-base ${i === activeStep * 2 ? 'active' : ''} ${i < activeStep * 2 ? 'completed' : ''}`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <div className="base-connector"></div>
                    <div className="base-node">
                      {['A', 'T', 'C', 'G'][i % 4]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="dna-label">
              <span className="dna-text">Séquence ADN</span>
              <span className="dna-progress">
                Progression: {Math.round(((activeStep + 1) / processSteps.length) * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Indicateurs de progression */}
        <div className="progress-indicators">
          {processSteps.map((_, index) => (
            <button
              key={index}
              className={`progress-dot ${index === activeStep ? 'active' : ''} ${index < activeStep ? 'completed' : ''}`}
              onClick={() => handleStepClick(index)}
              aria-label={`Aller à l'étape ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Section services */}
      <section id="services" className="services-section">
        <div className="section-header">
          <h2>Expertises <span className="text-gradient">Laboratoires</span></h2>
          <p className="section-subtitle">
            Technologies de pointe pour des analyses précises
          </p>
        </div>

        <div className="services-grid">
          {labServices.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon-wrapper">
                <div className="service-icon">{service.icon}</div>
                <div className="icon-orbital"></div>
              </div>
              <h4 className="service-name">{service.name}</h4>
              <p className="service-description">{service.description}</p>
              <div className="service-tech">
                {index % 3 === 0 && "NGS • Sanger • Microarray"}
                {index % 3 === 1 && "Caryotype • FISH • MLPA"}
                {index % 3 === 2 && "PCR • qPCR • Séquençage"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section CTA */}
      <section className="cta-section">
        <div className="cta-card">
          <div className="cta-content">
            <h2 className="cta-title">Prêt à commencer votre analyse ?</h2>
            <p className="cta-text">
              Notre équipe d'experts est à votre disposition pour répondre 
              à toutes vos questions et vous accompagner dans votre démarche.
            </p>
            
            <div className="cta-buttons">
              <button className="cta-button primary">
                <i className="bi bi-whatsapp"></i>
                Chat en direct
              </button>
              <button className="cta-button secondary">
                <i className="bi bi-telephone"></i>
                01 23 45 67 89
              </button>
            </div>
          </div>
          
          <div className="cta-visual">
            <div className="dna-helix">
              <div className="helix-strand"></div>
              <div className="helix-strand"></div>
              <div className="helix-base"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LaboratoireDepartementV2;