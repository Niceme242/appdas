import { Outlet } from "react-router-dom";
import HeaderComponent from "../template/header.js";
import FooterComponent from "../template/footer.js";
import { motion } from "framer-motion";
import { Carousel, Container } from "react-bootstrap";
import fondimage2 from "../assets/img/image4.jpg"
import fondhedaer from "../assets/img/fondheader.jpg"

export default function MainLayout() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-white">

      {/* HEADER */}
      <header className="shadow-sm">
        <HeaderComponent />
      </header>

      {/* CAROUSEL BANNIÈRES */}
      <Carousel fade interval={4500} className="shadow-sm">
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={fondhedaer}
            alt="Bannière 1"
            style={{ height: "420px", objectFit: "cover" }}
          />
          <Carousel.Caption>
             <h3>Connectez-vous à l'avenir</h3>
            <p>Des solutions informatiques intelligentes, créées par des experts pour propulser votre entreprise.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={fondimage2}
            alt="Bannière 1"
            style={{ height: "420px", objectFit: "cover" }}
          />
          <Carousel.Caption>
            <h3>Connectez-vous à l'avenir</h3>
            <p>Des solutions informatiques intelligentes, créées par des experts pour propulser votre entreprise.</p>
          </Carousel.Caption>
        </Carousel.Item>


        </Carousel>
        

        

      {/* CONTENU */}
      <main className="flex-grow py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </Container>
      </main>

      {/* FOOTER */}
      <footer className="bg-light text-center py-3 mt-auto">
        <FooterComponent />
      </footer>
    </div>
  );
}
