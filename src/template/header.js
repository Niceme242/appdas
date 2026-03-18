import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
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
      setScrolling(currentScrollY > 60);

      let current = "home";
      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) current = id;
      });
      setActiveSection(current);

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

  const closeAll = () => {
    setExpanded(false);
    setShowServices(false);
    setNavbarVisible(true);
  };

  // Détecter si on est sur mobile
  const isMobile = () => window.innerWidth < 992;

  // Desktop : hover. Mobile : tap sur le bouton "Nos solutions"
  const handleSolutionsEnter = () => {
    if (!isMobile()) setShowServices(true);
  };
  const handleSolutionsLeave = () => {
    if (!isMobile()) setShowServices(false);
  };
  const handleSolutionsClick = () => {
    if (isMobile()) setShowServices((v) => !v);
  };

  return (
    <>
      {/* Bouton flottant pour réafficher la navbar */}
      <AnimatePresence>
        {!navbarVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{ position: "fixed", bottom: 16, right: 16, zIndex: 9999 }}
          >
            <Button
              variant="primary"
              className="rounded-circle shadow-sm"
              style={{
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#007bff",
                padding: 0,
                border: "2px solid white",
              }}
              onClick={() => setNavbarVisible(true)}
            >
              <FaBars size={18} className="text-white" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar principale */}
      <motion.div
        ref={navbarRef}
        initial={{ y: 0 }}
        animate={{ y: navbarVisible ? 0 : -100, opacity: navbarVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed-top ${scrolling ? "bg-white shadow-sm" : "bg-transparent text-white"}`}
        style={{ zIndex: 1030 }}
        onMouseEnter={() => { if (window.innerWidth >= 992) setNavbarVisible(true); }}
      >
        {/* Top bar */}
        <div className="d-flex justify-content-between px-4 py-1 bg-light small">
          <h6 className="text-logo-blue fw-bold mb-0"></h6>
          <div className="d-flex gap-4">
            <span className="text-logo-blue fw-bold affichage text-muted" style={{ fontSize: 12 }}>
              1253 Rue NKO, Plateau des 15 ans, Brazzaville
            </span>
            <span className="text-logo-blue fw-bold text-muted" style={{ fontSize: 12 }}>
              infos@das-congo.tech
            </span>
            <span className="text-logo-blue fw-bold text-muted" style={{ fontSize: 12 }}>
              +242 06 540 99 59
            </span>
          </div>
        </div>

        {/* Main Navbar */}
        <Navbar expand="lg" expanded={expanded} className="">
          <Container>
            <Navbar.Brand href="/" className="fw-bold fs-4">
              <img src={Logoharvre} alt="Logo DAS" className="header-logo" />
            </Navbar.Brand>

            <Navbar.Toggle onClick={() => { setExpanded((v) => !v); setShowServices(false); }}>
              {expanded ? <FaTimes /> : <FaBars />}
            </Navbar.Toggle>

            <Navbar.Collapse>
              <Nav className="ms-auto gap-4 fw-semibold">
                {sections.map((sec) => (
                  <Nav.Link
                    key={sec}
                    href={`${sec}`}
                    onClick={closeAll}
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

                {/* ── NOS SOLUTIONS — CORRIGÉ ── */}
                <div
                  className="nav-item dropdown"
                  onMouseEnter={handleSolutionsEnter}
                  onMouseLeave={handleSolutionsLeave}
                >
                  {/* Bouton "Nos solutions" */}
                  <Nav.Link
                    as="button"
                    role="button"
                    onClick={handleSolutionsClick}
                    className={`border-0 bg-transparent d-flex align-items-center gap-1 ${
                      scrolling ? "text-dark" : "text-white"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    Nos solutions
                    <FaChevronDown
                      size={11}
                      style={{
                        marginLeft: 4,
                        transition: "transform 0.2s",
                        transform: showServices ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                  </Nav.Link>

                  {/* ✅ DROPDOWN — visible sur desktop (hover) ET mobile (tap) */}
                  {showServices && (
                    <div
                      className="dropdown-menu show"
                      style={{
                        // Mobile : affiché inline dans le menu déroulant
                        position: isMobile() ? "static" : "absolute",
                        border: "0.5px solid #9FE1CB",
                        borderRadius: 12,
                        padding: 8,
                        marginTop: isMobile() ? 4 : 0,
                        minWidth: 240,
                        background: "#F0FBF6",
                        boxShadow: isMobile() ? "none" : "0 4px 16px rgba(0,0,0,0.08)",
                      }}
                    >
                      {/* ── AI-Forest Planner ── */}
                      <a
                        className="dropdown-item d-flex align-items-center gap-3 py-2"
                        href="/AiForest"
                        onClick={closeAll}
                        style={{ borderRadius: 8 }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: 8,
                            background: "#E1F5EE",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <div
                            style={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              background: "#1D9E75",
                            }}
                          />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 14, color: "#085041" }}>
                            AI-Forest Planner
                          </div>
                          <div style={{ fontSize: 11, color: "#0F6E56" }}>
                            Votre assistant IA.
                          </div>
                        </div>
                      </a>

                      {/* Ajoute d'autres solutions ici en copiant le bloc ci-dessus */}
                    </div>
                  )}
                </div>
                {/* ── FIN NOS SOLUTIONS ── */}

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </motion.div>
    </>
  );
}