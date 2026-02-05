import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import Logoharvre from "../assets/img/LeHavreMassissia.png";

const sections = ["/", "nos_services", "actualites", "contacts"];

export default function NavbarClinique() {
  const [expanded, setExpanded] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showServices, setShowServices] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 60);
      let current = "home";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) current = id;
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    
  return (
    <motion.div
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed-top ${scrolling ? "bg-white shadow-sm" : "bg-transparent text-white"}`}
    >
      {/* Top bar */}
      <div className="d-flex justify-content-between px-4 py-1 bg-light small">
        <h7 className="text-logo-blue fs-7 fw-bold"></h7>
        <div className="d-flex gap-4"> 
          <span className="text-logo-blue fs-7 fw-bold affichage text-muted"> 1253 Rue NKO, Plateau des 15 ans, Brazzaville</span> 
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
                  onClick={() => setExpanded(false)}
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
              
              {/* Menu Services avec hover */}
              <div className="nav-item dropdown" onMouseEnter={() => setShowServices(true)} onMouseLeave={() => setShowServices(false)}>
                <Nav.Link
                  as="a"
                  href="#services"
                  role="button"
                  onClick={() => setExpanded(false)}
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
                      >
                        <span className="ai-pill">AI</span>
                        <span className="ms-2 fw-semibold">Forest Planner</span>
                      </a>
                    
                    {/*
                    <a className="dropdown-item" href="/soussolution2">
                      Solution 2
                    </a>
                    <a className="dropdown-item" href="/soussolution3">
                      Solution 3
                    </a>
                    */}
                    
                    {/* Sous-menu Design - COMMENTÉ 
                    <div
                      className="dropdown-submenu"
                      onMouseEnter={() => setShowDesign(true)}
                      onMouseLeave={() => setShowDesign(false)}
                    >
                      <a className="dropdown-item" href="#design">
                        Design →
                      </a>
                      
                      {showDesign && (
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href="#uiux">
                            UI / UX
                          </a>
                          
                          {/* Sous-sous-menu Outils 
                          <div
                            className="dropdown-submenu"
                            onMouseEnter={() => setShowTools(true)}
                            onMouseLeave={() => setShowTools(false)}
                          >
                            <a className="dropdown-item" href="#tools">
                              Outils →
                            </a>
                            
                            {showTools && (
                              <div className="dropdown-menu">
                                <a className="dropdown-item" href="#figma">
                                  Figma
                                </a>
                                <a className="dropdown-item" href="#sketch">
                                  Sketch
                                </a>
                              </div>
                            )}
                          </div>
                          
                          <a className="dropdown-item" href="#branding">
                            Branding
                          </a>
                        </div>
                      )}
                    </div>
                    */}
                  </div>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}