
import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../Layout/MainLayout.js";
import logo from "../assets/img/LeHavreMassissia.png";
import "./chargement.css"


const Home = lazy(() => import("../pages/Home.js"));
const Services = lazy(() => import("../pages/Service.js"));
const Actulites = lazy(() => import("../pages/Actulites.js"));
const RDV = lazy(() => import("../pages/rdv.js"));
const NotFound = lazy(() => import("../pages/NotFound.js"));
const Laboratoire = lazy(() => import("../pages/laboratoire.js"));
const Equipe = lazy(() => import("../pages/equipe.js"));
const PageConnexion = lazy(() => import("../pages/login.js"));
const Contacts = lazy(() => import("../pages/contacts.js"));
const AiForest = lazy(() => import("../pages/AiForest.js"));
//const Soussolution2 = lazy(() => import("../pages/soussolution2.js"));
//const Soussolution3 = lazy(() => import("../pages/soussolution3.js"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/nos_services", element: <Services /> },
      { path: "/actualites", element: <Actulites /> },
      { path: "/rendez_vous", element: <RDV /> },
      { path: "/laboratoire", element: <Laboratoire /> },
      { path: "/equipe", element: <Equipe /> },
      { path: "/connexion", element: <PageConnexion /> }, 
      { path: "/contacts", element: <Contacts /> },
      { path: "/AiForest", element: <AiForest /> },

     // { path: "/soussolution2", element: <Soussolution2 /> },
    // { path: "/soussolution3", element: <Soussolution3 /> }
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default function AppRouter() {
  return (
     <Suspense fallback={
    <div className="loader-container">
      <img src={logo} alt="Chargement" className="loader-logo" />
      </div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
