import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnimation } from 'framer-motion'; // Import séparé pour useAnimation
import { useInView } from 'react-intersection-observer';
import { 
  FiCpu, 
  FiGlobe, 
  FiUsers, 
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight,
  FiChevronRight,
  FiX,
  FiAlertCircle
} from 'react-icons/fi';
import {
  Container,
  Card,
  ProgressBar,
  Modal,
  Form,
  Button,
  Row,
  Col
} from "react-bootstrap";
import { FaChartLine, FaRobot, FaCode, FaLightbulb, FaShieldAlt, FaDatabase } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import "./home.css";

import aboutImage from "../assets/img/images2.png";
import whyUsImage from "../assets/img/image3.jpg";
import skillsImage from "../assets/img/images.jpg";
import step1Image from "../assets/img/image3.jpg";
import step2Image from "../assets/img/image4.jpg";
import step3Image from "../assets/img/image5.jpg";

/* ========================= */
/* COMPONENT: NOTIFICATION   */
/* ========================= */

const Notification = ({ type, title, message, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={`notification ${type}`}
    >
      <div className="notification-icon">
        {type === 'success' ? <FiCheckCircle size={24} /> : <FiAlertCircle size={24} />}
      </div>
      <div className="notification-content">
        <h6 className="notification-title">{title}</h6>
        <p className="notification-message">{message}</p>
      </div>
      <Button variant="link" className="notification-close" onClick={onClose}>
        <FiX size={18} />
      </Button>
    </motion.div>
  );
};

/* ========================= */
/* COMPONENT: CONTACT POPUP  */
/* ========================= */

const ContactPopup = ({ show, handleClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    delay: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      onSuccess('error', 'Champs manquants', 'Veuillez remplir tous les champs obligatoires.');
      return;
    }

    setLoading(true);

    const fullMessage = `
Nom : ${formData.name}
Email : ${formData.email}
Téléphone : ${formData.phone || "Non renseigné"}
Société : ${formData.company || "Non renseignée"}

Type de projet : ${formData.projectType || "Non précisé"}
Budget estimé : ${formData.budget || "Non défini"}
Délai souhaité : ${formData.delay || "Non défini"}

-----------------------------
Description du projet :
${formData.message}
    `.trim();

    try {
      await emailjs.send(
        "service_lws",
        "template_whpdfbu",
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: fullMessage,
        },
        "HZW3zAKPkHytszYlk"
      );

      // Notification de succès
      onSuccess('success', 'Message envoyé !', 'Votre demande a été transmise avec succès.');

      // Fermer le popup après un délai
      setTimeout(() => {
        handleClose();
      }, 1500);

      // Réinitialiser le formulaire
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        delay: "",
        message: ""
      });

    } catch (error) {
      console.error("EmailJS error :", error);
      onSuccess('error', 'Erreur d\'envoi', 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" backdrop="static">
      <Modal.Header className="border-0 pb-0">
        <Modal.Title className="fw-bold fs-3">
          Demande de devis gratuit
        </Modal.Title>
        <Button variant="link" onClick={handleClose} className="text-dark p-0">
          <FiX size={24} />
        </Button>
      </Modal.Header>

      <Modal.Body>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Votre nom *</Form.Label>
              <Form.Control 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
                disabled={loading}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Votre email *</Form.Label>
              <Form.Control 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                disabled={loading}
              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Label>Téléphone</Form.Label>
              <Form.Control 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                disabled={loading}
              />
            </Col>
            <Col md={6}>
              <Form.Label>Société</Form.Label>
              <Form.Control 
                name="company" 
                value={formData.company} 
                onChange={handleChange} 
                disabled={loading}
              />
            </Col>
          </Row>

          <Form.Label>Type de projet</Form.Label>
          <Form.Select 
            name="projectType" 
            value={formData.projectType} 
            onChange={handleChange} 
            className="mb-3"
            disabled={loading}
          >
            <option value="">Sélectionnez</option>
            <option>Analyse de données</option>
            <option>Dashboard & Reporting</option>
            <option>Automatisation</option>
            <option>IA / Machine Learning</option>
            <option>Développement Web</option>
            <option>Autre</option>
          </Form.Select>

          <Form.Label>Budget estimé</Form.Label>
          <Form.Select 
            name="budget" 
            value={formData.budget} 
            onChange={handleChange} 
            className="mb-3"
            disabled={loading}
          >
            <option value="">Non défini</option>
            <option>Moins de 100 000 FCFA</option>
            <option>100 000 – 250 000 FCFA</option>
            <option>250 000 – 500 000 FCFA</option>
            <option>Plus de 500 000 FCFA</option>
          </Form.Select>

          <Form.Label>Délai souhaité</Form.Label>
          <Form.Select 
            name="delay" 
            value={formData.delay} 
            onChange={handleChange} 
            className="mb-3"
            disabled={loading}
          >
            <option value="">Non défini</option>
            <option>Urgent</option>
            <option>1 – 3 mois</option>
            <option>3 – 6 mois</option>
            <option>+ 6 mois</option>
          </Form.Select>

          <Form.Label>Décrivez votre projet *</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className="mb-4"
            disabled={loading}
          />

          <Button 
            type="submit" 
            className="w-100 py-3 fw-bold" 
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Envoi en cours...
              </>
            ) : (
              'Envoyer ma demande'
            )}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

/* ========================= */
/* MAIN COMPONENT: LANDING PAGE */
/* ========================= */

const LandingPage = () => {
  const [activeFaq, setActiveFaq] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: '',
    title: '',
    message: ''
  });

  // Animation controls
  const heroControls = useAnimation();
  const [heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (heroInView) {
      heroControls.start('visible');
    }
  }, [heroControls, heroInView]);

  const showNotification = (type, title, message, duration = 4000) => {
    setNotification({
      show: true,
      type,
      title,
      message
    });

    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, duration);
  };

  // Données pour les sections
  const aboutPoints = [
    {
      icon: <FiCpu size={24} />,
      text: "Automatiser les processus pour améliorer l'efficacité et réduire efficacement les coûts"
    },
    {
      icon: <FaLightbulb size={24} />,
      text: "Stimuler l'innovation et la créativité avec des designs uniques et des solutions personnalisées"
    },
    {
      icon: <FiTrendingUp size={24} />,
      text: "Aider à la prise de décision éclairée grâce à l'analyse de données et aux outils d'intelligence artificielle"
    },
    {
      icon: <FiUsers size={24} />,
      text: "Promouvoir une culture technologique en rendant accessibles les outils numériques avancés aux entreprises de toutes tailles"
    },
    {
      icon: <FiGlobe size={24} />,
      text: "Renforcer la présence numérique des entreprises à travers des sites web modernes, des applications performantes, et des stratégies de marketing digital"
    }
  ];

  const faqItems = [
    {
      id: 1,
      number: '01',
      question: 'Comment DAS peut-elle aider mon entreprise à tirer profit de ses données ?',
      answer: 'Nous transformons vos données brutes en insights actionnables grâce à des outils d\'analyse avancés et des algorithmes d\'intelligence artificielle. Notre équipe identifie les tendances, patterns et opportunités cachés dans vos données pour vous aider à prendre des décisions éclairées et stratégiques.'
    },
    {
      id: 2,
      number: '02',
      question: 'Quels sont les avantages de l\'automatisation des processus pour mon entreprise ?',
      answer: 'L\'automatisation permet de réduire les erreurs humaines, d\'accélérer les processus métier, de diminuer les coûts opérationnels et d\'améliorer la productivité globale. Nos solutions d\'automatisation sont personnalisées pour s\'intégrer parfaitement à votre écosystème existant et libérer votre personnel des tâches répétitives.'
    },
    {
      id: 3,
      number: '03',
      question: 'Comment DAS assure-t-elle la sécurité des données de ses clients ?',
      answer: 'La sécurité est notre priorité absolue. Nous implémentons des protocoles de chiffrement de bout en bout, des sauvegardes régulières, et respectons les normes internationales de protection des données (RGPD). Nos serveurs sont sécurisés et nous proposons également des audits de sécurité pour identifier et corriger les vulnérabilités potentielles.'
    }
  ];

  const skillsData = [
    { name: 'Analyse de données', value: 95, icon: <FaDatabase />, color: 'primary' },
    { name: 'Intelligence Artificielle', value: 90, icon: <FaRobot />, color: 'info' },
    { name: 'Développement Web & Mobile', value: 85, icon: <FaCode />, color: 'success' },
    { name: 'Stratégie Digitale', value: 88, icon: <FiGlobe />, color: 'warning' }
  ];

  const workProcessSteps = [
    {
      number: '01',
      title: 'Analyse & Conception',
      description: 'Nous commençons par une analyse approfondie de vos besoins et de votre écosystème pour concevoir une solution sur mesure qui répond parfaitement à vos objectifs.',
      features: ['Audit initial', 'Analyse des besoins', 'Conception sur mesure'],
      image: step1Image
    },
    {
      number: '02',
      title: 'Développement & Intégration',
      description: 'Notre équipe de développement transforme la conception en une solution fonctionnelle, en utilisant les technologies les plus adaptées à votre contexte.',
      features: ['Développement agile', 'Intégration transparente', 'Tests qualité'],
      image: step2Image
    },
    {
      number: '03',
      title: 'Formation & Support',
      description: 'Nous assurons votre autonomie grâce à des formations complètes et un support continu pour maximiser le retour sur investissement de votre solution.',
      features: ['Formation utilisateurs', 'Support technique', 'Maintenance évolutive'],
      image: step3Image
    }
  ];

  return (
    <div className="landing-page">
      {/* Notification Overlay */}
      <AnimatePresence>
        {notification.show && (
          <div className="notification-overlay">
            <Notification
              type={notification.type}
              title={notification.title}
              message={notification.message}
              onClose={() => setNotification(prev => ({ ...prev, show: false }))}
            />
          </div>
        )}
      </AnimatePresence>

      {/* === ABOUT SECTION === */}
      <section id="about" className="about-section py-5 py-lg-6">
        <Container>
          <Row className="mb-5">
            <Col>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="display-5 fw-bold mb-3 text-logo-vert">
                  À Propos de Nous
                </h2>
                <div className="title-underline mx-auto bg-primary"></div>
              </motion.div>
            </Col>
          </Row>

          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <Card.Img 
                    src={aboutImage} 
                    alt="Équipe DAS" 
                    className="img-fluid tail-image"
                  />
                  <Card.ImgOverlay className="bg-gradient-dark d-flex align-items-end">
                    <div className="text-white p-4">
                      <h5 className="mb-0">Expertise & Innovation</h5>
                      <small>Depuis 2023</small>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="h4 fw-bold mb-4">
                  DAS <span className="text-primary">(Data Analytic Solutions)</span>
                </h3>
                <p className="mb-4 justification">
                  DAS est une entreprise spécialisée dans les solutions numériques destinées aux entreprises et aux particuliers. Nous sommes passionnés par l'innovation technologique et déterminés à aider les entreprises à relever leurs défis en tirant parti des outils numériques et de l'intelligence artificielle.
                </p>

                <div className="mb-4">
                  {aboutPoints.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="d-flex align-items-start mb-3"
                    >
                      <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                        <span className="text-primary">{point.icon}</span>
                      </div>
                      <p className="mb-0">{point.text}</p>
                    </motion.div>
                  ))}
                </div>

                <p className="mb-4 justification">
                  Notre mission est de transformer les données en leviers stratégiques, d'automatiser les processus complexes et d'offrir des solutions adaptées pour améliorer la performance et la rentabilité des entreprises.
                </p>

                <motion.div
                  whileHover={{ x: 10 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Button 
                    href="nos_services" 
                    variant="outline-primary" 
                    className="card-button"
                  >
                    Voir nos services
                    <FiChevronRight className="ms-2" />
                  </Button>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* === WHY US SECTION === */}
      <section id="why-us" className="why-us-section bg-light py-5 py-lg-6">
        <Container fluid>
          <Row className="g-4">
            <Col lg={7} className="order-2 order-lg-1">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="pe-xl-5"
              >
                <h3 className="fw-bold mb-4">
                  <span className="text-muted">Notre expertise au service de </span>
                  <span className="text-primary">votre transformation digitale</span>
                </h3>
                
                <p className="mb-5 justification">
                  Chez DAS, nous combinons expertise technique et vision stratégique pour vous accompagner dans votre transformation digitale. Notre approche unique nous permet de proposer des solutions sur mesure qui répondent parfaitement à vos besoins spécifiques.
                </p>

                <div className="faq-accordion">
                  {faqItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`accordion-item mb-3 border rounded-3 ${activeFaq === index ? 'active' : ''}`}
                      onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                    >
                      <div className="accordion-header p-4 d-flex justify-content-between align-items-center cursor-pointer">
                        <h4 className="h6 fw-bold mb-0 justification">
                          <span className="text-primary me-3">{item.number}</span>
                          {item.question}
                        </h4>
                        <motion.div
                          animate={{ rotate: activeFaq === index ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FiChevronRight />
                        </motion.div>
                      </div>
                      
                      <motion.div
                        initial={false}
                        animate={{ 
                          height: activeFaq === index ? 'auto' : 0,
                          opacity: activeFaq === index ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="accordion-body p-4 pt-0 justification">
                          <p className="mb-0">{item.answer}</p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Col>

            <Col lg={5} className="order-1 order-lg-2">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="position-relative"
              >
                <div className="bg-primary bg-opacity-10 rounded-3 p-4 p-lg-5">
                  <div className="position-relative">
                    <div className="animated-circle position-absolute top-0 start-0 w-100 h-100"></div>
                    <img 
                      src={whyUsImage} 
                      alt="Pourquoi choisir DAS" 
                      className="img-fluid rounded-3 shadow floating-3d"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <div className="row text-center">
                      <div className="col-4">
                        <div className="p-3">
                          <FaChartLine size={32} className="text-primary mb-2" />
                          <h5 className="h6 fw-bold mb-1">95%</h5>
                          <small className="text-muted">Clients satisfaits</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-3">
                          <FaDatabase size={32} className="text-info mb-2" />
                          <h5 className="h6 fw-bold mb-1">67+</h5>
                          <small className="text-muted">Projets réalisés</small>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="p-3">
                          <FaShieldAlt size={32} className="text-success mb-2" />
                          <h5 className="h6 fw-bold mb-1">100%</h5>
                          <small className="text-muted">Sécurité garantie</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* === SKILLS SECTION === */}
      <section id="skills" className="skills-section py-5 py-lg-6">
        <Container>
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="position-relative"
              >
                <div className="rotating-bg position-absolute top-50 start-50 translate-middle w-100 h-100"></div>
                <img 
                  src={skillsImage} 
                  alt="Compétences DAS"  
                  height="80"
                  className="img-fluid rounded-3 shadow floating-animation position-relative tail-image"
                />
              </motion.div>
            </Col>

            <Col lg={6}>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="fw-bold mb-4">
                  Notre expertise technique au service de vos projets
                </h3>
                
                <p className="fst-italic text-muted mb-5">
                  Chez DAS, nous maîtrisons un large éventail de technologies et méthodologies pour répondre à tous vos besoins en matière de solutions digitales et d'analyse de données.
                </p>

                <div className="skills-progress">
                  {skillsData.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: `${skill.value}%`, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                      className="mb-4"
                    >
                      <div className="d-flex justify-content-between mb-2">
                        <div className="d-flex align-items-center">
                          <span className={`text-${skill.color} me-2`}>{skill.icon}</span>
                          <span className="fw-semibold">{skill.name}</span>
                        </div>
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.2 + index * 0.2 }}
                          className="fw-bold"
                        >
                          {skill.value}%
                        </motion.span>
                      </div>
                      <ProgressBar 
                        now={skill.value} 
                        variant={skill.color}
                        className="progress-height"
                        animated
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* === WORK PROCESS SECTION === */}
      <section id="work-process" className="work-process-section bg-light py-5 py-lg-6">
        <Container>
          <Row className="mb-5">
            <Col>
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="display-5 fw-bold mb-3 text-logo-vert">
                  Notre Processus de Travail
                </h2>
                <p className="lead mb-0">
                  Une méthodologie éprouvée pour garantir le succès de vos projets digitaux
                </p>
                <div className="title-underline mx-auto bg-primary mt-3"></div>
              </motion.div>
            </Col>
          </Row>

          <Row className="g-4 g-lg-5">
            {workProcessSteps.map((step, index) => (
              <Col lg={4} key={index}>
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="h-100"
                >
                  <Card className="border-0 shadow-lg h-100 overflow-hidden">
                    <div className="position-relative overflow-hidden">
                      <Card.Img 
                        src={step.image} 
                        alt={step.title}
                        className="img-fluid"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="step-number position-absolute top-0 start-0 bg-primary text-white fw-bold p-3">
                        {step.number}
                      </div>
                    </div>
                    
                    <Card.Body className="p-4">
                      <Card.Title className="fw-bold h5 mb-3">
                        {step.title}
                      </Card.Title>
                      <Card.Text className="text-muted mb-4 justification">
                        {step.description}
                      </Card.Text>
                      
                      <div className="features-list">
                        {step.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="d-flex align-items-center mb-2">
                            <FiCheckCircle className="text-success me-2" />
                            <span className="small">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* === CTA SECTION === */}
      <section className="cta-section bg-primary text-white py-5 py-lg-6">
        <Container>
          <Row className="text-center">
            <Col md={8} className="mx-auto">
              <motion.div>
                <h2 className="display-6 fw-bold mb-4">
                  Prêt à transformer vos données en opportunités ?
                </h2>
                <p className="lead mb-5 opacity-90">
                  Contactez-nous dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons optimiser votre entreprise avec nos solutions d'analyse de données.
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="light" 
                    size="lg"
                    className="px-5 py-3 fw-semibold"
                    onClick={() => setShowPopup(true)}
                  >
                    Demander un devis gratuit
                    <FiArrowRight className="ms-2" />
                  </Button>
                </motion.div>
              </motion.div>
            </Col>
          </Row>
        </Container>

        <ContactPopup 
          show={showPopup} 
          handleClose={() => setShowPopup(false)}
          onSuccess={showNotification}
        />
      </section>

      {/* Styles pour les notifications */}
      <style jsx>{`
        .notification-overlay {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 999999;
          max-width: 400px;
        }
        
        .notification {
          display: flex;
          align-items: flex-start;
          background: white;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border-left: 4px solid;
          margin-bottom: 16px;
          animation: slideIn 0.3s ease-out;
        }
        
        .notification.success {
          border-left-color: #10b981;
        }
        
        .notification.error {
          border-left-color: #ef4444;
        }
        
        .notification-icon {
          flex-shrink: 0;
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .notification.success .notification-icon {
          color: #10b981;
        }
        
        .notification.error .notification-icon {
          color: #ef4444;
        }
        
        .notification-content {
          flex: 1;
          min-width: 0;
        }
        
        .notification-title {
          font-weight: 600;
          margin-bottom: 4px;
          color: #1f2937;
        }
        
        .notification-message {
          color: #6b7280;
          font-size: 0.875rem;
          margin-bottom: 0;
          line-height: 1.4;
        }
        
        .notification-close {
          color: #9ca3af;
          padding: 0;
          margin-left: 12px;
          align-self: flex-start;
          flex-shrink: 0;
          transition: color 0.2s;
        }
        
        .notification-close:hover {
          color: #374151;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        /* Animation de progression */
        .notification::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background: currentColor;
          animation: progress 4s linear forwards;
          border-radius: 0 0 0 8px;
        }
        
        .notification.success::after {
          background: #10b981;
        }
        
        .notification.error::after {
          background: #ef4444;
        }
        
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        @media (max-width: 576px) {
          .notification-overlay {
            left: 16px;
            right: 16px;
            top: 16px;
          }
          
          .notification {
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;