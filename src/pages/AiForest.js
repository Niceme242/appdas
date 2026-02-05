import React, { useEffect, useRef, useState } from 'react';
import aiImage from './ai.png'; // Import de l'image ai.png
import backgroundImage from './2.jpg'; // Nouvelle image
import './AiForest.css';

const AiForest = () => {
  const sectionRefs = useRef([]);
  const [timeLeft, setTimeLeft] = useState({ days: 21, hours: 0, minutes: 0, seconds: 0 });
  const [downloadsCount, setDownloadsCount] = useState(1000);
  const [isDownloading, setIsDownloading] = useState(false);

  // Décompte de 15 jours
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 21);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animation d'apparition au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Téléchargement Android
  const handleAndroidDownload = () => {
    setIsDownloading(true);
    setDownloadsCount(prev => prev + 1);
    
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/ai-forest.apk';
      link.download = 'AI-Forest Planner.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
      
      // Notification de succès
      const notification = document.createElement('div');
      notification.className = 'download-notification';
      notification.innerHTML = `
        <div class="notification-content">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path fill="#27AE60" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
          </svg>
          <span>Téléchargement réussi. L’alerte Google est normale pour cette version. Vous pouvez continuer en toute confiance.</span>
        </div>
      `;
      document.body.appendChild(notification);
      
      setTimeout(() => notification.classList.add('show'), 10);
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }, 500);
  };

  return (
    <div className="ai-forest">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">           
              </div>
             
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section avec Background Agriculteurs */}
      <section className="hero">
        <div 
          className="hero-background"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            {/* Logo principal au-dessus du tagline */}
            <div className="main-logo" ref={el => sectionRefs.current[0] = el}>
              <div className="main-logo-icon">
                <img 
                  src={aiImage} 
                  alt="AI-FOREST Logo" 
                  className="main-logo-img"
                />
                <div className="main-logo-text">
                </div>
              </div>
            </div>
            
            <div className="hero-tag">AI-FOREST PLANNER</div>
            
            <h1 className="hero-title" ref={el => sectionRefs.current[1] = el}>
              L'IA au service des
              <br />
              <span className="highlight">agriculteurs africains</span>
            </h1>
            
            <p className="hero-description" ref={el => sectionRefs.current[2] = el}>
              Développée spécifiquement pour les besoins des agriculteurs africains, 
              AI-Forest Planner transforme votre smartphone en assistant agricole intelligent.
              Optimisez vos rendements, réduisez vos coûts et adoptez des pratiques durables.
            </p>

            {/* Décompte */}
            <div className="countdown-section" ref={el => sectionRefs.current[3] = el}>
              <div className="countdown-label">Disponible sur les stores dans</div>
              <div className="countdown">
                <div className="countdown-item">
                  <span className="countdown-value">{timeLeft.days}</span>
                  <span className="countdown-unit">Jours</span>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                  <span className="countdown-value">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="countdown-unit">Heures</span>
                </div>
                <div className="countdown-separator">:</div>
                <div className="countdown-item">
                  <span className="countdown-value">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="countdown-unit">Minutes</span>
                </div>
              </div>
            </div>

            {/* Téléchargement Android */}
            <div className="download-section" ref={el => sectionRefs.current[4] = el}>
              <div className="download-card">
                <div className="download-header">
                  <div className="download-badge">ACCÈS AVANT-PREMIÈRE EXCLUSIF</div>
                  <h3>Téléchargez dès maintenant</h3>
                  <p>Version Android • Accès prioritaire • {downloadsCount}+ téléchargements attendus</p>
                </div>
                
                <button 
                  className={`download-btn ${isDownloading ? 'downloading' : ''}`}
                  onClick={handleAndroidDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <div className="spinner"></div>
                      <span>Téléchargement en cours...</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M19,9H15V3H9V9H5L12,16L19,9M5,18V20H19V18H5Z"/>
                      </svg>
                      <span>Télécharger l'APK Android (65 MB)</span>
                    </>
                  )}
                </button>
                
                <div className="download-info">
                  <div className="info-item">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="#27AE60" d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z"/>
                    </svg>
                    <span>APK vérifié et sécurisé</span>
                  </div>
                  <div className="info-item">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="#27AE60" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"/>
                    </svg>
                    <span>Mises à jour automatiques</span>
                  </div>
                  <div className="info-item">
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path fill="#27AE60" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                    </svg>
                    <span>Support agricole et experts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-line"></div>
          <span className="scroll-text">Découvrir les avantages</span>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header" ref={el => sectionRefs.current[5] = el}>
            <h2>Spécialement conçu pour l'agriculture africaine</h2>
            <p>Des fonctionnalités adaptées aux réalités et défis des agriculteurs du continent</p>
          </div>

          <div className="features-grid">
            <div className="feature-card" ref={el => sectionRefs.current[6] = el}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <path fill="#27AE60" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,14.39 5.05,16.53 6.71,18H9V12H17L19.15,15.59C19.69,14.5 20,13.29 20,12A8,8 0 0,0 12,4Z"/>
                </svg>
              </div>
              <h3>Analyse des sols</h3>
              <p>Évaluation précise des terres avec recommandations adaptées au climat tropical et subtropical.</p>
              <div className="feature-stats">
                <span className="stat">+40%</span>
                <span>Rendement amélioré</span>
              </div>
            </div>

            <div className="feature-card" ref={el => sectionRefs.current[7] = el}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <path fill="#27AE60" d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14H21M20,4H4V6H20V4Z"/>
                </svg>
              </div>
              <h3>Planification saisonnière</h3>
              <p>Calendrier agricole optimisé pour les saisons des pluies et saisons sèches africaines.</p>
              <div className="feature-stats">
                <span className="stat">-30%</span>
                <span>Gaspillage d'eau</span>
              </div>
            </div>

            <div className="feature-card" ref={el => sectionRefs.current[8] = el}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" width="32" height="32">
                  <path fill="#27AE60" d="M13,2.03V2.05L13,4.05C17.39,4.59 20.5,8.58 19.96,12.97C19.5,16.61 16.64,19.5 13,19.93V21.93C18.5,21.38 22.5,16.5 21.95,11C21.5,6.25 17.73,2.5 13,2.03M11,2.06C9.05,2.25 7.19,3 5.67,4.26L7.1,5.74C8.22,4.84 9.57,4.26 11,4.06V2.06M4.26,5.67C3,7.19 2.25,9.04 2.05,11H4.05C4.24,9.58 4.8,8.23 5.69,7.1L4.26,5.67M2.06,13C2.26,14.96 3.03,16.81 4.27,18.33L5.69,16.9C4.81,15.77 4.24,14.42 4.06,13H2.06M7.1,18.37L5.67,19.74C7.18,21 9.04,21.79 11,22V20C9.58,19.82 8.23,19.25 7.1,18.37M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>
                </svg>
              </div>
              <h3>Alertes météo</h3>
              <p>Prévisions météorologiques spécifiques à votre région avec alertes précoces.</p>
              <div className="feature-stats">
                <span className="stat">90%</span>
                <span>Précision des alertes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card" ref={el => sectionRefs.current[9] = el}>
              <span className="stat-number">+40%</span>
              <span className="stat-label">Rendement moyen</span>
            </div>
            <div className="stat-card" ref={el => sectionRefs.current[10] = el}>
              <span className="stat-number">-30%</span>
              <span className="stat-label">Consommation d'eau</span>
            </div>
            <div className="stat-card" ref={el => sectionRefs.current[11] = el}>
              <span className="stat-number">95%</span>
              <span className="stat-label">Précision IA</span>
            </div>
            <div className="stat-card" ref={el => sectionRefs.current[12] = el}>
              <span className="stat-number">{downloadsCount}+</span>
              <span className="stat-label">Agriculteurs attendus</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section Stores - Bientôt disponible DANS UN SEUL CONTENEUR */}
      <section className="stores">
        <div className="container">
          <div className="stores-container" ref={el => sectionRefs.current[13] = el}>
            <div className="stores-header">
              <h2>Bientôt disponible sur les stores officiels</h2>
              <p>L'application sera bientôt disponible en téléchargement direct depuis les stores</p>
            </div>
            
            <div className="stores-content">
              <div className="stores-grid">
                <div className="store-card">
                  <div className="store-icon google">
                    <svg viewBox="0 0 24 24" width="48" height="48">
                      <path fill="currentColor" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                  </div>
                  <h3>Google Play</h3>
                  <p>Disponible dans</p>
                  <div className="store-countdown">
                    <span className="store-days">{timeLeft.days}</span>
                    <span className="store-label">jours</span>
                  </div>
                  <div className="store-note">Android 8.0+</div>
                </div>
                
                <div className="store-card">
                  <div className="store-icon apple">
                    <svg viewBox="0 0 24 24" width="48" height="48">
                      <path fill="currentColor" d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z"/>
                    </svg>
                  </div>
                  <h3>App Store</h3>
                  <p>Disponible dans</p>
                  <div className="store-countdown">
                    <span className="store-days">{timeLeft.days}</span>
                    <span className="store-label">jours</span>
                  </div>
                  <div className="store-note">iOS 12.0+</div>
                </div>
              </div>
              
              <div className="stores-notice">
                <div className="notice-icon">📱</div>
                <div className="notice-content">
                  <h4>Téléchargez dès maintenant en avant-première</h4>
                  <p>Profitez de l'accès exclusif à la version Android pendant que nous finalisons la publication sur les stores officiels</p>
                </div>
                <button 
                  className="notice-button"
                  onClick={handleAndroidDownload}
                  disabled={isDownloading}
                >
                  Télécharger l'APK
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <div className="final-content" ref={el => sectionRefs.current[21] = el}>
            <h2>Ne ratez pas l'opportunité de transformer votre agriculture</h2>
            <p>Rejoignez les milliers d'agriculteurs qui attendent pour integrer l'IA dans leur quotidien</p>
            
            <div className="final-grid">
              <div className="final-countdown">
                <h3>Dernière chance d'accès avant-première</h3>
                <div className="countdown-final">
                  <div className="time-block">
                    <span className="time-value">{timeLeft.days}</span>
                    <span className="time-label">jours</span>
                  </div>
                  <div className="time-separator">:</div>
                  <div className="time-block">
                    <span className="time-value">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="time-label">heures</span>
                  </div>
                  <div className="time-separator">:</div>
                  <div className="time-block">
                    <span className="time-value">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="time-label">minutes</span>
                  </div>
                </div>
                <p className="countdown-note">Avant le lancement officiel sur les stores</p>
              </div>
              
              <div className="final-download">
                <div className="download-card-final">
                  <h3>Téléchargez maintenant pour profiter de :</h3>
                  <ul className="benefits-list">
                    <li>✅ 20 jours d'avance sur tout le monde</li>
                    <li>✅ Support technique prioritaire</li>
                    <li>✅ Influencez le développement de l'app</li>
                    <li>✅ Accès aux nouvelles fonctionnalités en premier</li>
                  </ul>
                  
                  <button 
                    className="download-btn-final"
                    onClick={handleAndroidDownload}
                    disabled={isDownloading}
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                    </svg>
                    <div className="btn-text">
                      <span>Télécharger l'APK Android maintenant</span>
                      <small>Version bêta 1.0 • {downloadsCount} agriculteurs seront équipés</small>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AiForest;