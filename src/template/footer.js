import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import emailjs from "@emailjs/browser";
import { 
  FiChevronUp
} from 'react-icons/fi';
import { 
  FaShieldAlt
} from 'react-icons/fa';
import Logoharvre from "../assets/img/LeHavreMassissia.png";

// === FORMULAIRE CONTACT FOOTER ===
const FooterContactForm = () => {
  const [footerEmail, setFooterEmail] = useState("");
  const [footerMessage, setFooterMessage] = useState("");
  const [footerLoading, setFooterLoading] = useState(false);
  const [footerStatus, setFooterStatus] = useState(null);

  const handleFooterSubmit = async (e) => {
    e.preventDefault();
    setFooterLoading(true);
    setFooterStatus(null);

    const fullMessage = `
📩 **Nouveau message depuis le footer**

**Email du contact :**
${footerEmail}

**Message :**
${footerMessage || "Pas de message"}

-------------------------
Envoyé depuis le site DAS - Footer
`;

    console.log('Envoi EmailJS...', {
      service: "service_lws",
      template: "template_uzhfj6i",
      message: fullMessage
    });

    try {
      await emailjs.send(
        "service_lws",          // Service ID
        "template_uzhfj6i",     // Template ID
        {
          message: fullMessage  // SEULE VARIABLE DU TEMPLATE
        },
        "HZW3zAKPkHytszYlk"     // Public Key
      );

      console.log('✅ Email envoyé avec succès');
      setFooterStatus('success');
      setFooterEmail("");
      setFooterMessage("");
    } catch (error) {
      console.error('❌ Erreur EmailJS:', error);
      setFooterStatus('error');
    } finally {
      setFooterLoading(false);
    }
  };

  return (
    <form onSubmit={handleFooterSubmit} className="mt-4">
      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Votre email *"
          value={footerEmail}
          onChange={(e) => setFooterEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Votre message *"
          rows="3"
          value={footerMessage}
          onChange={(e) => setFooterMessage(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={footerLoading}
      >
        {footerLoading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Envoi en cours...
          </>
        ) : (
          "Envoyer le message"
        )}
      </button>
      
      {footerStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="alert alert-success mt-3 mb-0"
        >
          ✅ Message envoyé avec succès ! Nous vous répondrons rapidement.
        </motion.div>
      )}
      
      {footerStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="alert alert-danger mt-3 mb-0"
        >
          ❌ Erreur lors de l'envoi. Veuillez réessayer.
        </motion.div>
      )}
    </form>
  );
};

const ModernFooter = () => {
  
  const [isVisible, setIsVisible] = useState(false);
  //const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  // Show/hide scroll to top button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  /*

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Simulation d'envoi d'email
      setSubscriptionStatus('success');
      setTimeout(() => {
        setEmail('');
        setSubscriptionStatus(null);
      }, 3000);
    } else {
      setSubscriptionStatus('error');
    }
  };
  */

  const quickLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '/' },
    { name: 'Services', href: '/nos_services' },
    { name: 'Ai-Forest', href: '/AiForest' },
    { name: 'Actualités', href: '/actualites' },
    { name: 'Contact', href: '/contacts' }
  ];

  const services = [
    'Analyse de données',
    'Intelligence Artificielle',
    'Développement Web',
    'Stratégie digitale',
    'Automatisation',
    'Consulting IT'
  ];

  const certifications = [];

  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className="scroll-to-top"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiChevronUp size={20} />
      </motion.button>

      {/* Footer */}
      <footer className="modern-footer">
        {/* Main Footer */}
        <div className="footer-main py-5 py-lg-6">
          <Container>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={footerVariants}
            >
              <Row className="g-5">
                {/* Company Info */}
                <Col lg={4}>
                  <motion.div variants={itemVariants}>
                    <div className="footer-brand mb-4">
                      <div className="brand-logo mb-3">
                        <img
                          src={Logoharvre}
                          alt="Logo DAS"
                          className="footer-logo"
                        />
                      </div>

                      <p className="text-white-50 mb-4">
                        Data Analytics Solutions - Transformons vos données en avantages compétitifs grâce à l'expertise en analyse de données et en intelligence artificielle.
                      </p>
                     
                      <div className="footer-stats">
                        <div className="stat-item">
                          <h4 className="fw-bold mb-0">25+</h4>
                          <small className="text-white-50 mb-4">Projets réalisés</small>
                        </div>
                        <div className="stat-item">
                          <h4 className="fw-bold mb-0">90%</h4>
                          <small className="text-white-50 mb-4">Clients satisfaits</small>
                        </div>
                        <div className="stat-item">
                          <h4 className="fw-bold mb-0">24/7</h4>
                          <small className="text-white-50 mb-4">Support</small>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Col>

                {/* Quick Links & Services */}
                <Col lg={2} md={6}>
                  <motion.div variants={itemVariants}>
                    <h5 className="footer-title mb-4">Liens rapides</h5>
                    <ul className="footer-links list-unstyled">
                      {quickLinks.map((link, index) => (
                        <motion.li 
                          key={index}
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <a href={link.href} className="footer-link">
                            <FiChevronUp className="rotate-90 me-2" size={14} />
                            {link.name}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </Col>

                <Col lg={2} md={6}>
                  <motion.div variants={itemVariants}>
                    <h5 className="footer-title mb-4">Nos services</h5>
                    <ul className="footer-links list-unstyled">
                      {services.map((service, index) => (
                        <motion.li 
                          key={index}
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        >
                          <a href="/nos_services" className="footer-link">
                            <FiChevronUp className="rotate-90 me-2" size={14} />
                            {service}
                          </a>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </Col>

                {/* Contact & Newsletter */}
                <Col lg={4}>
                  <motion.div variants={itemVariants}>
                    <h5 className="footer-title mb-4">Restez informé</h5>
                    <p className="text-white-50 mb-4">
                      Inscrivez-vous à notre newsletter pour recevoir nos dernières actualités et conseils en analyse de données.
                    </p>

                    
                    {/* Formulaire de contact footer */}
                    <h6 className="footer-title mb-3 mt-4">Contactez-nous</h6>
                    <p className="text-white-50 mb-3 small">
                      Une question ? Envoyez-nous un message directement.
                    </p>
                    <FooterContactForm />
                  </motion.div>
                </Col>
              </Row>
            </motion.div>
          </Container>
        </div>
        
        {/* Middle Footer - Certifications & Social */}
        <div className="footer-middle py-4 bg-dark">
          <Container>
            <Row className="align-items-center g-4">
              
              {/* Certifications / Texte */}
              <Col md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="certifications"
                >
                  <h6 className="text-light mb-3">
                    Suivez-nous sur nos réseaux sociaux
                  </h6>

                  <div className="d-flex flex-wrap gap-3">
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        className="cert-badge"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <FaShieldAlt className="me-2" />
                        <span>
                          <strong>{cert.name}</strong>
                          <small className="d-block">{cert.desc}</small>
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </Col>

              {/* Réseaux sociaux */}
              <Col md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="social-links"
                >
                  <div className="d-flex justify-content-center gap-3">
                    {[
                      {
                        icon: <i className="bi bi-facebook"></i>,
                        name: "Facebook",
                        url: "https://www.facebook.com/share/1ARV9QjBJy/?mibextid=wwXIfr",
                      },
                      {
                        icon: <i className="bi bi-linkedin"></i>,
                        name: "LinkedIn",
                        url: "https://www.linkedin.com/",
                      },
                      {
                        icon: <i className="bi bi-instagram"></i>,
                        name: "Instagram",
                        url: "https://www.instagram.com/data_analytitics_solutions?igsh=dDN1ZXp2MjE1dDg2&utm_source=qr",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                        whileHover={{
                          scale: 1.2,
                          rotate: [0, -10, 10, 0],
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        aria-label={social.name}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom py-4">
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <p className="mb-0 text-muted">
                  © {new Date().getFullYear()} <strong>Data Analytics Solutions</strong>. Tous droits réservés.
                </p>
              </Col>
              
              <Col md={6}>
                <div className="footer-legal-links d-flex justify-content-md-end gap-4">
                  {['Mentions légales', 'Confidentialité', 'CGV', 'Cookies'].map((link, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className="legal-link"
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {link}
                    </motion.a>
                  ))}
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        {/* Decorative Elements */}
        <div className="footer-decoration">
          <div className="data-wave"></div>
          <div className="data-dots">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="data-dot"></div>
            ))}
          </div>
        </div>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .modern-footer {
          position: relative;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #fff;
          overflow: hidden;
        }
        
        .footer-main {
          background: linear-gradient(135deg, #1a1a2e 0%, #0f172a 100%);
          position: relative;
          z-index: 1;
        }
        
        .footer-middle {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(10px);
          position: relative;
          z-index: 1;
        }
        
        .footer-bottom {
          background: rgba(0, 0, 0, 0.5);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          z-index: 1;
        }
        
        .brand-logo {
          display: flex;
          align-items: center;
        }
        
        .brand-text {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .footer-title {
          color: #fff;
          font-weight: 600;
          position: relative;
          padding-bottom: 10px;
        }
        
        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }
        
        .footer-description {
          color: #ffffff;
          line-height: 1.6;
        }
        
        .footer-links {
          margin: 0;
          padding: 0;
        }
        
        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          display: flex;
          align-items: center;
          padding: 6px 0;
          transition: all 0.3s ease;
        }
        
        .footer-link:hover {
          color: #3b82f6;
          transform: translateX(5px);
        }
        
        .rotate-90 {
          transform: rotate(90deg);
        }
        
        .footer-stats {
          display: flex;
          gap: 20px;
          margin-top: 20px;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-item h4 {
          font-size: 1.5rem;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .input-group .form-control {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        
        .input-group .form-control:focus {
          background: rgba(255, 255, 255, 0.1);
          border-color: #3b82f6;
          box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.25);
          color: #fff;
        }
        
        .input-group .form-control::placeholder {
          color: #94a3b8;
        }
        
        .contact-item {
          padding: 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .contact-item:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }
        
        .contact-icon {
          width: 40px;
          height: 40px;
          background: rgba(59, 130, 246, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .cert-badge {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          color: #fff;
          display: flex;
          align-items: center;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .cert-badge:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: #3b82f6;
          transform: translateY(-2px);
        }
        
        .social-icon {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 1.2rem;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .social-icon:hover {
          background: #3b82f6;
          color: #fff;
          transform: translateY(-3px);
        }
        
        .legal-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }
        
        .legal-link:hover {
          color: #3b82f6;
        }
        
        .scroll-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3b82f6, var(--logo-blue) 100%);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.4);
          color: var(--logo-vert);
        }
        
        .scroll-to-top:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.5);
        }
        
        .footer-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .data-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%233b82f6' fill-opacity='0.1' d='M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,138.7C672,149,768,203,864,224C960,245,1056,235,1152,208C1248,181,1344,139,1392,117.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
          animation: wave 20s linear infinite;
        }
        
        @keyframes wave {
          0% { background-position-x: 0; }
          100% { background-position-x: 1440px; }
        }
        
        .data-dots {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
        
        .data-dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(59, 130, 246, 0.5);
          border-radius: 50%;
          animation: float 15s linear infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        /* Génération des points de données */
        ${[...Array(20)].map((_, i) => `
          .data-dot:nth-child(${i + 1}) {
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 15}s;
            animation-duration: ${15 + Math.random() * 10}s;
            width: ${2 + Math.random() * 4}px;
            height: ${2 + Math.random() * 4}px;
          }
        `).join('')}
        
        /* Responsive */
        @media (max-width: 768px) {
          .footer-stats {
            flex-direction: column;
            gap: 15px;
          }
          
          .stat-item {
            text-align: left;
          }
          
          .input-group {
            flex-direction: column;
          }
          
          .input-group .btn {
            width: 100%;
            margin-top: 10px;
            border-radius: 8px !important;
          }
          
          .input-group .form-control {
            border-radius: 8px !important;
          }
          
          .footer-legal-links {
            flex-wrap: wrap;
            justify-content: center !important;
            margin-top: 15px;
          }
          
          .cert-badge {
            font-size: 0.8rem;
            padding: 6px 12px;
          }
          
          .scroll-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
          }
        }
        
        @media (max-width: 576px) {
          .footer-main,
          .footer-middle,
          .footer-bottom {
            padding-left: 15px;
            padding-right: 15px;
          }
          
          .social-icon {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }
        }
        
        /* ========================= */
        /* RESPONSIVE FIXES */
        /* ========================= */
        
        /* Tablettes */
        @media (max-width: 992px) {
          .footer-stats {
            justify-content: space-between;
          }
        
          .footer-title {
            text-align: center;
          }
        
          .footer-links {
            text-align: center;
          }
        
          .footer-link {
            justify-content: center;
          }
        }
        
        /* Mobiles */
        @media (max-width: 768px) {
          /* Global footer spacing */
          .modern-footer {
            text-align: center;
          }
        
          /* Stats en colonne */
          .footer-stats {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
        
          .stat-item h4 {
            font-size: 1.3rem;
          }
        
          /* Input newsletter */
          .input-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
        
          .input-group .form-control,
          .input-group .btn {
            width: 100%;
            border-radius: 8px !important;
          }
        
          /* Contact items */
          .contact-item {
            flex-direction: column;
            text-align: center;
            gap: 6px;
          }
        
          .contact-icon {
            margin-right: 0 !important;
          }
        
          /* Social icons */
          .social-links {
            justify-content: center;
          }
        
          .social-icon {
            width: 40px;
            height: 40px;
          }
        
          /* Footer bottom */
          .footer-legal-links {
            justify-content: center !important;
            gap: 12px;
          }
        }
        
        /* Très petits écrans */
        @media (max-width: 480px) {
          .footer-title {
            font-size: 1rem;
          }
        
          .footer-link {
            font-size: 0.9rem;
          }
        
          .legal-link {
            font-size: 0.8rem;
          }
        
          .scroll-to-top {
            width: 42px;
            height: 42px;
          }
        }
        
        /* Désactiver hover sur mobile */
        @media (hover: none) {
          .footer-link:hover,
          .social-icon:hover,
          .contact-item:hover {
            transform: none;
          }
        }
        
        /* Newsletter responsive */
        .newsletter-form .form-control {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
        }
        
        .newsletter-form .form-control:focus {
          background: rgba(255, 255, 255, 0.1);
          border-color: #3b82f6;
          box-shadow: 0 0 0 0.25rem rgba(59, 130, 246, 0.25);
        }
        
        .newsletter-btn {
          white-space: nowrap;
          border-radius: 8px;
        }
        
        /* Mobile fixes */
        @media (max-width: 768px) {
          .newsletter-btn {
            padding: 12px;
          }
        
          .newsletter-form .form-control {
            border-radius: 8px;
          }
        }
        
        /* FOOTER LOGO — FORME ORIGINALE */
        .footer-logo {
          height: 50px;
          width: auto;
          object-fit: contain;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .footer-logo {
            height: 42px;
          }
        }
      `}</style>
    </>
  );
};

export default ModernFooter;