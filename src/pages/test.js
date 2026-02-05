import React, { useState } from 'react';
import { 
  FiCheck, FiChevronLeft, FiChevronRight, FiDownload,
  FiSearch, FiLayers, FiFilter, FiCpu, FiZap, FiUsers 
} from 'react-icons/fi';
import './test.css'; // Fichier CSS à créer

const ProcessSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  const processSteps = [
    {
      step: '01',
      title: 'Audit & Analyse',
      description: 'Analyse approfondie de votre écosystème data',
      duration: '1-2 semaines',
      icon: <FiSearch size={24} />,
      details: 'Nous commençons par comprendre votre environnement data actuel, identifions les données disponibles, les sources, les silos et les points de friction. Cette phase nous permet d\'établir une vision claire de votre maturité data et de définir les objectifs précis de votre projet.'
    },
    {
      step: '02',
      title: 'Architecture',
      description: 'Conception de l\'architecture technique',
      duration: '2-3 semaines',
      icon: <FiLayers size={24} />,
      details: 'Nous concevons une architecture data robuste et scalable, choisissons les technologies appropriées (cloud, bases de données, outils d\'analyse) et définissons les flux de données. L\'objectif est de créer un écosystème data cohérent et performant.'
    },
    {
      step: '03',
      title: 'Préparation',
      description: 'Nettoyage et préparation des données',
      duration: '2-4 semaines',
      icon: <FiFilter size={24} />,
      details: 'Cette phase cruciale consiste à nettoyer, transformer et préparer vos données pour l\'analyse. Nous gérons les valeurs manquantes, standardisons les formats, détectons les anomalies et créons des datasets de qualité prêts pour l\'analyse.'
    },
    {
      step: '04',
      title: 'Modélisation',
      description: 'Développement des modèles analytiques',
      duration: '3-5 semaines',
      icon: <FiCpu size={24} />,
      details: 'Nous développons et entraînons des modèles d\'intelligence artificielle et de machine learning adaptés à vos besoins. Que ce soit pour de la prédiction, de la classification ou de l\'optimisation, nous créons des algorithmes performants et interprétables.'
    },
    {
      step: '05',
      title: 'Intégration',
      description: 'Déploiement et intégration',
      duration: '2-3 semaines',
      icon: <FiZap size={24} />,
      details: 'Nous intégrons les solutions développées dans votre environnement opérationnel. Cette phase inclut le déploiement, les tests d\'intégration, la création des dashboards et la connexion avec vos systèmes existants.'
    },
    {
      step: '06',
      title: 'Accompagnement',
      description: 'Formation et optimisation continue',
      duration: 'En continu',
      icon: <FiUsers size={24} />,
      details: 'Nous assurons votre autonomie grâce à des formations complètes et un accompagnement continu. Nous mettons en place des processus de monitoring et d\'optimisation pour garantir la pérennité et l\'évolution de votre solution.'
    }
  ];

  const handleStepClick = (index) => {
    setActiveStep(index);
  };

  return (
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
            <button className="details-button">
              <FiDownload className="me-2" />
              Télécharger le template
            </button>
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
                  {['📊', '📈', '🤖', '💾', '⚡', '🔍', '🎯', '🚀'][i]}
                </div>
              </div>
            ))}
          </div>
          <div className="data-label">
            <span className="data-text">Flux de traitement des données</span>
            <span className="data-progress">
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
            aria-label={`Aller à la phase ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProcessSection;