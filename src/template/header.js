import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Logoharvre from "../assets/img/LeHavreMassissia.png";

const sections = ["/", "nos_services", "actualites", "contacts"];

export default function NavbarClinique() {
  const [expanded, setExpanded] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showServices, setShowServices] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Fond blanc après 60px de scroll
      setScrolling(currentScrollY > 60);
      
      // Section active
      let current = "home";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) current = id;
      });
      setActiveSection(current);
      
      // Cacher la navbar quand on scroll vers le bas, la montrer quand on remonte
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavbarVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  
  // Fonction pour réafficher la navbar SANS scroller
  const toggleNavbar = () => {
    setNavbarVisible(true);
  };

  return (
    <>
      {/* Bouton flottant PÉTIT pour réafficher la navbar */}
      <AnimatePresence>
        {!navbarVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="position-fixed bottom-3 end-3 z-9999" // end-3 au lieu de end-4
            style={{ zIndex: 9999 }}
          >
            <Button
              variant="primary"
              className="rounded-circle shadow-sm" // shadow-sm au lieu de shadow-lg
              style={{
                width: '50px',  // Réduit de 60px à 50px
                height: '50px', // Réduit de 60px à 50px
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#007bff',
                padding: 0, // Pas de padding supplémentaire
                border: '2px solid white' // Bordure fine pour mieux le voir
              }}
              onClick={toggleNavbar}
            >
              <FaBars size={18} className="text-white" /> {/* Icône plus petite */}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar principale */}
      <motion.div
        ref={navbarRef}
        initial={{ y: 0 }}
        animate={{ 
          y: navbarVisible ? 0 : -100,
          opacity: navbarVisible ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className={`fixed-top ${scrolling ? "bg-white shadow-sm" : "bg-transparent text-white"}`}
        style={{ zIndex: 1030 }}
        onMouseEnter={() => {
          if (window.innerWidth >= 992) {
            setNavbarVisible(true);
          }
        }}
      >
        {/* Top bar */}
        <div className="d-flex justify-content-between px-4 py-1 bg-light small">
          <h7 className="text-logo-blue fs-7 fw-bold"></h7>
          <div className="d-flex gap-4"> 
            <span className="text-logo-blue fs-7 fw-bold affichage text-muted">1253 Rue NKO, Plateau des 15 ans, Brazzaville</span> 
            <span className="text-logo-blue fs-7 fw-bold text-muted">infos@das-congo.tech</span>
            <span className="text-logo-blue fs-7 fw-bold text-muted">+242 06 540 99 59</span>
          </div>
        </div>

        {/* Main Navbar */}
        <Navbar expand="lg" expanded={expanded} className="">
          <Container>
            <Navbar.Brand href="/" className="fw-bold fs-4">
              <img
                src={Logoharvre}
                alt="Logo DAS"
                className="header-logo"
              />
            </Navbar.Brand>

            <Navbar.Toggle onClick={() => setExpanded(!expanded)}>
              {expanded ? <FaTimes /> : <FaBars />}
            </Navbar.Toggle>

            <Navbar.Collapse>
              <Nav className="ms-auto gap-4 fw-semibold">
                {sections.map((sec) => (
                  <Nav.Link
                    key={sec}
                    href={`${sec}`}
                    onClick={() => {
                      setExpanded(false);
                      setNavbarVisible(true);
                    }}
                    className={`
                      ${scrolling ? "text-dark" : "text-white"}
                      ${activeSection === sec ? "fw-bold text-decoration-underline" : ""}
                    `}
                  >
                    {sec === "/" ? "Accueil" :
                     sec === "nos_services" ? "Nos services" :
                     sec === "actualites" ? "Actualités" :
                     "Contact"}
                  </Nav.Link>
                ))}
                
                {/* Menu Services */}
                <div 
                  className="nav-item dropdown" 
                  onMouseEnter={() => setShowServices(true)} 
                  onMouseLeave={() => setShowServices(false)}
                  onClick={() => setExpanded(false)}
                >
                  <Nav.Link
                    as="a"
                    href="#services"
                    role="button"
                    className={`
                      ${scrolling ? "text-dark dropdown-toggle" : "text-white"}
                    `}
                  >
                    Nos solutions <span className="caret"></span>  
                  </Nav.Link>
                  
                  {showServices && (
                    <div className="dropdown-menu show">
                      <a
                        className="dropdown-item ai-forest-item d-flex align-items-center"
                        href="/AiForest"
                        onClick={() => setNavbarVisible(true)}
                      >
                        <span className="ai-pill">AI</span>
                        <span className="ms-2 fw-semibold">Forest Planner</span>
                      </a>
                    </div>
                  )}
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </motion.div>
    </>
  );
}