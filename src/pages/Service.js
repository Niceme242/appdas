import React, { useState, useEffect, useRef } from 'react';
import { FaTools } from 'react-icons/fa';
import './DataServices.css';
import { 
  FaDatabase, 
  FaChartLine, 
  FaCode,
  FaPenFancy,
  FaBrain,
  FaNetworkWired,
  FaCogs,
  FaUsers
} from "react-icons/fa";
import { 
  FiCheck,
  FiChevronRight,
  FiChevronLeft
} from "react-icons/fi";
import fondsevice from '../assets/img/fondservice.jpg';

const DataAnalyticsServices = () => {
  const [activeCategory, setActiveCategory] = useState('bigdata');
  const [hoveredService, setHoveredService] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  // Données des catégories de services
  const serviceCategories = {
    
  dataIA: {
    title: "Data & IA",
    color: "#f3ab46",
    icon: <FaDatabase size={36} className="text-logo-vert" />,
    services: [
      {
        id: 1,
        title: "Intégration IA",
        description: "Développement de solutions IA personnalisées pour automatiser vos processus et augmenter votre productivité.",
        time: "4-12 semaines",
        features: ["Chatbots intelligents", "Automatisation RPA", "Computer Vision", "Traitement NLP"],
        technologies: ["Python", "TensorFlow", "PyTorch", "OpenAI API"]
      },
      {
        id: 2,
        title: "Analyse de données & Big Data",
        description: "Exploitation de vos données massives pour extraire des insights actionnables et créer des avantages compétitifs.",
        time: "3-8 semaines",
        accuracy: "99.9%",
        price: "À partir de 6.500€/mois",
        features: ["Data Mining", "Analyse prédictive", "Data Visualization", "Reporting intelligent"],
        technologies: ["Apache Spark", "Hadoop", "Power BI", "Tableau"]
      },
      {
        id: 3,
        title: "Data Science & Machine",
        description: "Modèles d'apprentissage automatique pour la prévision, la classification et l'optimisation de vos opérations.",
        time: "4-10 semaines",
        accuracy: "95%+",
        price: "À partir de 7.000€/mois",
        features: ["Modèles prédictifs", "Deep Learning", "Recommandation", "Optimisation"],
        technologies: ["Scikit-learn", "Keras", "MLflow", "AWS SageMaker"]
      }
    ]
  },

  
  gestionEquipements: {
    title: "Gestion des Équipements",
    color: "#8B4513", // Marron/terre pour équipements physiques
    icon: <FaTools size={36} className="text-logo-vert" />,
    services: [
      {
        id: 9,
        title: "Gestion de Parc Informatique",
        description: "Suivi et maintenance de l'ensemble de vos équipements IT : postes de travail, serveurs, périphériques.",
        time: "Audit en 1 semaine",
        coverage: "100% du parc",
        price: "À partir de 800€/mois",
        features: [
          "Inventaire automatique",
          "Maintenance préventive",
          "Gestion des garanties",
          "Cycle de vie des équipements",
          "Reporting d'utilisation"
        ],
        technologies: ["GLPI", "OCS Inventory", "Snipe-IT", "Lansweeper"]
      },
      {
        id: 10,
        title: "Infrastructure Physique & Câblage",
        description: "Conception, installation et maintenance de votre infrastructure réseau physique et de vos salles serveurs.",
        time: "Installation 2-4 semaines",
        compliance: "Normes TIA-942",
        price: "À partir de 1.500€/mois",
        features: [
          "Câblage structuré",
          "Climatisation salle serveur",
          "Alimentation électrique sécurisée",
          "Systèmes d'extinction incendie",
          "Contrôle d'accès physique"
        ],
        technologies: ["Racks 19\"", "PDU intelligentes", "Onduleurs", "Fibre optique", "Cuivre Cat6A"]
      },
      {
        id: 11,
        title: "Maintenance Préventive & Corrective",
        description: "Contrats de maintenance pour garantir la disponibilité et la performance de vos installations techniques.",
        time: "Intervention sous 4h",
        availability: "99.5%",
        price: "À partir de 1.200€/mois",
        features: [
          "Visites régulières programmées",
          "Maintenance corrective urgente",
          "Stock de pièces de rechange",
          "Support téléphonique dédié",
          "Rapports d'intervention"
        ],
        technologies: ["Contrats SLA", "Ticketing", "Monitoring", "Documentation technique"]
      }
    ]
  },

  
  devWebMobile: {
    title: "Développement Web & Mobile",
    color: "#8e44ad",
    icon: <FaCode size={36} className="text-logo-vert" />, // FaCode est souvent déjà importé
    services: [
      {
        id: 7,
        title: "Applications Web Sur Mesure",
        description: "Développement d'applications web performantes et scalables adaptées à vos processus métiers.",
        time: "6-12 semaines",
        price: "À partir de 15.000€",
        features: [
          "Applications React.js/Next.js",
          "Backend Node.js/Python",
          "Bases de données optimisées",
          "APIs REST/GraphQL",
          "Tests automatisés"
        ],
        technologies: ["React", "Next.js", "Node.js", "Python Django", "PostgreSQL", "MongoDB"]
      },
      {
        id: 8,
        title: "Applications Mobiles Cross-Platform",
        description: "Création d'applications mobiles natives et cross-platform pour iOS et Android avec une seule codebase.",
        time: "8-16 semaines",
        stores: "App Store & Play Store",
        price: "À partir de 20.000€",
        features: [
          "Applications React Native/Flutter",
          "Design UX/UI optimisé",
          "Notifications push",
          "Paiements in-app",
          "Analytics intégrés"
        ],
        technologies: ["React Native", "Flutter", "Firebase", "Apple Pay", "Google Pay", "Stripe"]
      },
      {
        id: 9,
        title: "E-commerce & Plateformes SaaS",
        description: "Développement de boutiques en ligne et plateformes SaaS avec gestion admin complète et analytics.",
        time: "10-20 semaines",
        revenue: "Optimisation conversion",
        price: "À partir de 25.000€",
        features: [
          "Plateformes e-commerce complètes",
          "Systèmes de paiement sécurisés",
          "Gestion des stocks et commandes",
          "Espace client personnalisé",
          "Dashboard analytique"
        ],
        technologies: ["Shopify API", "WooCommerce", "Stripe", "PayPal", "OAuth", "WebSockets"]
      }
    ]
  },

    bigdata: {
  title: "Réseau & Système",
  color: "#4a90e2",
  icon: <FaNetworkWired size={36} className="text-logo-vert" />,
  services: [
    {
      id: 4,
      title: "Réseau & Sécurité IT",
      description: "Infrastructure réseau sécurisée et performante pour votre entreprise.",
      time: "Mise en place en continue",
      features: ["Firewall", "VPN", "Monitoring", "Wi-Fi Pro"],
      technologies: ["Zabbix", "Nagios", "PRTG", "SolarWinds", "Grafana"]
    },
    {
      id: 5,
      title: "Support IT",
      description: "Assistance technique et gestion des incidents.",
      time: "Mise en place en continue",
      features: ["Helpdesk", "Maintenance", "Formation", "SLA"],
      technologies: ["Jira Service Desk", "Freshdesk", "Zendesk", "ServiceNow"]
    },
    {
      id: 6,
      title: "Infrastructure Cloud & Serveurs",
      description: "Gestion de vos serveurs et solutions cloud pour une infrastructure moderne et scalable.",
      time: "Migration en 3-8 semaines",
      features: ["Virtualisation", "Cloud Hybride", "Backup Automatisé", "Haute Disponibilité"],
      technologies: ["VMware", "Hyper-V", "AWS", "Azure", "Proxmox", "Docker"]
    }
  ]
},
    

  communicationDigitale: {
    title: "Communication Digitale",
    color: "#e74c3c",
    icon: <FaUsers size={36} className="text-logo-vert" />, // Utilise FaNetworkWired
    services: [
      {
        id: 1,
        title: "Stratégie Digitale",
        description: "Développement de votre stratégie de marque sur les canaux digitaux.",
        time: "Mise en place en continue",
        features: ["Identité digitale", "Positionnement", "Contenus", "Plan média"],
        technologies: ["Brandwatch", "Hootsuite", "Canva", "Adobe Cloud"]
      },
      {
        id: 2,
        title: "Marketing Digital",
        description: "Campagnes publicitaires et gestion des réseaux sociaux.",
        time: "Mise en place en continue",
        features: ["Facebook/Instagram Ads", "LinkedIn", "Vidéo", "Community"],
        technologies: ["Meta Ads", "Google Ads", "LinkedIn Ads", "Buffer"]
      },
      {
        id: 3,
        title: "SEO & Référencement",
        description: "Optimisation pour Google et augmentation de votre visibilité.",
        time: "Mise en place en continue",
        features: ["SEO technique", "Contenus optimisés", "Backlinks", "Local SEO"],
        technologies: ["Google Analytics", "SEMrush", "Ahrefs", "Search Console"]
      }
    ]
  },


  designUX: {
    title: "Design & UI/UX",
    color: "#9b59b6", // Violet pour créativité
    icon: <FaPenFancy size={36} className="text-logo-vert" />, // Utilise FaDatabase
    services: [
      {
        id: 1,
        title: "Design d'Interface UI",
        description: "Création d'interfaces utilisateur modernes, intuitives et esthétiques pour vos applications.",
        time: "3-6 semaines",
        deliverables: "Maquettes + Design System",
        price: "À partir de 5.000€",
        features: [
          "Design d'interface moderne",
          "Système de design complet",
          "Prototypes interactifs",
          "Responsive design",
          "Guidelines UI"
        ],
        technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Zeplin"]
      },
      {
        id: 2,
        title: "Expérience Utilisateur UX",
        description: "Optimisation de l'expérience utilisateur pour une navigation intuitive et efficace.",
        time: "4-8 semaines",
        satisfaction: "+50% d'engagement",
        price: "À partir de 6.500€",
        features: [
          "Audit UX existant",
          "User research & personas",
          "User flows & wireframes",
          "Tests utilisateurs",
          "Optimisation conversion"
        ],
        technologies: ["UserTesting", "Hotjar", "Optimal Workshop", "Miro", "Maze"]
      },
      {
        id: 3,
        title: "Identité Visuelle & Branding",
        description: "Création ou refonte de votre identité visuelle pour une marque cohérente et impactante.",
        time: "5-10 semaines",
        consistency: "Guide de marque complet",
        price: "À partir de 8.000€",
        features: [
          "Logo & identité visuelle",
          "Chartre graphique",
          "Packaging & print design",
          "Brand guidelines",
          "Assets digitaux"
        ],
        technologies: ["Adobe Illustrator", "Photoshop", "InDesign", "Canva", "Procreate"]
      }
    ]
  },

    
  };

  // Processus étape par étape
  const processSteps = [
    { 
      step: 1, 
      title: "Audit de services", 
      description: "Analyse approfondie de vos données et objectifs",
      icon: <FaChartLine />,
      details: "Nous évaluons vos données existantes, identifions les opportunités et définissons les objectifs business.",
      duration: "1-2 semaines"
    },
    { 
      step: 2, 
      title: "Architecture", 
      description: "Conception de l'infrastructure optimale",
      icon: <FaNetworkWired />,
      details: "Développement de l'architecture technique, choix des technologies et plan de migration.",
      duration: "2-3 semaines"
    },
    { 
      step: 3, 
      title: "Data Preparation", 
      description: "Nettoyage et préparation des données",
      icon: <FaCogs />,
      details: "Collecte, nettoyage et transformation des données pour les rendre exploitables.",
      duration: "3-4 semaines"
    },
    { 
      step: 4, 
      title: "Développement IA/ML", 
      description: "Création des modèles d'intelligence artificielle",
      icon: <FaBrain />,
      details: "Développement et entraînement des algorithmes de machine learning sur vos données.",
      duration: "4-6 semaines"
    },
    { 
      step: 5, 
      title: "Intégration & Tests", 
      description: "Déploiement et validation des solutions",
      icon: <FaCode />,
      details: "Intégration dans vos systèmes existants et tests approfondis de performance.",
      duration: "2-3 semaines"
    },
    { 
      step: 6, 
      title: "Formation & Support", 
      description: "Accompagnement et optimisation continue",
      icon: <FaUsers />,
      details: "Formation de vos équipes et mise en place du support technique et de l'amélioration continue.",
      duration: "Continue"
    }
  ];

  // Auto-rotation des étapes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [processSteps.length]);

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
    <div className="data-services-container">
      {/* Hero Section */}
      

      {/* Section des services */}
      <section id="services" className="services-section" ref={sectionRef}>
        <div className="section-header">
          <h2>Nos <span className="text-gradient">Solutions Data & IA</span></h2>
          <p className="section-subtitle">
            Des services complets d'analyse de données adaptés à vos besoins métier
          </p>
        </div>

        {/* Filtres de catégories */}
        <div className="category-filters">
          {Object.entries(serviceCategories).map(([key, category]) => (
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

        {/* Grille des services */}
        <div className="services-grid">
          {serviceCategories[activeCategory].services.map((service) => (
            <div
              key={service.id}
              className={`service-card ${hoveredService === service.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
              style={{ '--card-color': serviceCategories[activeCategory].color }}
            >
              <div className="card-header">
                <div className="service-icon">{serviceCategories[activeCategory].icon}</div>
                <div className="service-badges">
                  <span className="badge time">{service.time}</span>
                  <span className="badge accuracy">{service.accuracy} précision</span>
                </div>
              </div>
              
              <div className="card-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                
                <div className="tech-stack">
                  <h4>Technologies utilisées:</h4>
                  <div className="tech-tags">
                    {service.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                
                <div className="service-features">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="feature">
                      <FiCheck className="feature-check" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
                            
              
              {/* Effet de surbrillance */}
              <div className="card-highlight"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Section processus */}
      <section id="processus" className="process-section">
        <div className="section-header">
          <h2>Notre <span className="text-gradient">Méthodologie</span></h2>
          <p className="section-subtitle">
            Une approche structurée pour garantir le succès de vos projets data
          </p>
        </div>

        <div className="process-timeline">
          <div className="timeline-line">
            <div 
              className="timeline-progress" 
              style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
            ></div>
          </div>
          
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
                  <div className="step-duration">{step.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Détails de l'étape active */}
        <div className="step-details">
          <div className="step-details-card">
            <div className="details-header">
              <div className="details-icon">{processSteps[activeStep].icon}</div>
              <div>
                <h3 className="details-title">{processSteps[activeStep].title}</h3>
                <div className="details-step">Phase {processSteps[activeStep].step}/6</div>
              </div>
            </div>
            
            <div className="details-body">
              <p className="details-text">{processSteps[activeStep].details}</p>
              
              <div className="details-deliverables">
                <h5>Livrables :</h5>
                <ul className="deliverables-list">
                  {activeStep === 0 && (
                    <>
                      <li><FiCheck /> Rapport d'audit data complet</li>
                      <li><FiCheck /> Plan de stratégie data</li>
                      <li><FiCheck /> Recommandations d'amélioration</li>
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                      <li><FiCheck /> Architecture technique détaillée</li>
                      <li><FiCheck /> Diagramme de flux de données</li>
                      <li><FiCheck /> Plan de migration cloud</li>
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                      <li><FiCheck /> Dataset nettoyé et préparé</li>
                      <li><FiCheck /> Documentation des transformations</li>
                      <li><FiCheck /> Qualité des données certifiée</li>
                    </>
                  )}
                  {activeStep === 3 && (
                    <>
                      <li><FiCheck /> Modèles ML entraînés</li>
                      <li><FiCheck /> Documentation des algorithmes</li>
                      <li><FiCheck /> Tests de performance</li>
                    </>
                  )}
                  {activeStep === 4 && (
                    <>
                      <li><FiCheck /> Solution intégrée et testée</li>
                      <li><FiCheck /> Documentation utilisateur</li>
                      <li><FiCheck /> Plan de maintenance</li>
                    </>
                  )}
                  {activeStep === 5 && (
                    <>
                      <li><FiCheck /> Formation des équipes</li>
                      <li><FiCheck /> Support technique mis en place</li>
                      <li><FiCheck /> Plan d'optimisation continue</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            
            <div className="details-footer">
              
              <div className="step-navigation">
                <button 
                  className="nav-button prev"
                  onClick={() => setActiveStep(prev => prev > 0 ? prev - 1 : processSteps.length - 1)}
                >
                  <FiChevronLeft className="me-2" />
                  Phase précédente
                </button>
                <button 
                  className="nav-button next"
                  onClick={() => setActiveStep(prev => prev < processSteps.length - 1 ? prev + 1 : 0)}
                >
                  Phase suivante
                  <FiChevronRight className="ms-2" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Visualisation Data */}
          <div className="data-visualization">
            <div className="data-flow-animation">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className={`data-stream ${i <= activeStep * 1.5 ? 'active' : ''}`}
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <div className="stream-line"></div>
                  <div className="stream-node">
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'][i]}
                  </div>
                </div>
              ))}
            </div>
            <div className="data-label">
              <img src={fondsevice} alt="Data Icon" className="data-icon" />
              <span className="data-text">Flux de données en temps réel</span>
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
              aria-label={`Aller à la phase ${index + 1}`}
            />
          ))}
        </div>
        
       
      </section>
    </div>
  );
};

export default DataAnalyticsServices;