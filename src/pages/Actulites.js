import React, { useState } from 'react';
import { 
  FaNewspaper, 
  FaCalendarAlt, 
  FaTag, 
  FaSearch,
  FaFilter,
  FaDownload
} from 'react-icons/fa';
import { 
  FiChevronLeft, 
  FiChevronRight,
  FiExternalLink
} from 'react-icons/fi';
import './actualites.css';
import ArticleDetail from './detailArticles.js';

const CompanyNews = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTag, setActiveTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  //cette partie gere les details des articles
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [viewMode, setViewMode] = useState('list');

  // Fonction pour ouvrir un article
  const handleReadMore = (article) => {
    setSelectedArticle(article);
    setViewMode('detail');
  };

  // Fonction pour fermer l'article
  const handleCloseArticle = () => {
    setSelectedArticle(null);
    setViewMode('list');
  };

  const handleNextArticle = () => {
    const currentIndex = newsArticles.findIndex(a => a.id === selectedArticle.id);
    const nextIndex = (currentIndex + 1) % newsArticles.length;
    setSelectedArticle(newsArticles[nextIndex]);
  };
  
  const handlePrevArticle = () => {
    const currentIndex = newsArticles.findIndex(a => a.id === selectedArticle.id);
    const prevIndex = (currentIndex - 1 + newsArticles.length) % newsArticles.length;
    setSelectedArticle(newsArticles[prevIndex]);
  };

  // Catégories d'actualités
  const categories = [
    { id: 'all', name: 'Toutes les actualités', icon: <FaNewspaper />, count: 2 },
    { id: 'achievements', name: 'Nos réalisations', icon: null, count: 0 },
    { id: 'partnerships', name: 'Partenariats', icon: null, count: 0 },
    { id: 'innovations', name: 'Innovations', icon: null, count: 1 },
    { id: 'events', name: 'Événements', icon: <FaCalendarAlt />, count: 1 },
    { id: 'insights', name: 'Insights Data', icon: null, count: 0 }
  ];

  // Tags populaires - avec comptes mis à jour
  const popularTags = [
    { name: 'Big Data', count: 0 },
    { name: 'IA', count: 1 },
    { name: 'Dev web', count: 0 },
    { name: 'Dev mobile', count: 0 },
    { name: 'Cloud', count: 0 },
    { name: 'Analytics', count: 0 },
    { name: 'Business Intelligence', count: 0 },
    { name: 'Communication', count: 0 },
    { name: 'Machine Learning', count: 1 },
    { name: 'Agriculture', count: 1 },
    { name: 'Innovation', count: 1 },
    { name: 'Congo', count: 1 },
    { name: 'DAS', count: 1 }
  ];

  // Données des actualités
  const newsArticles = [
    {
      id: 1,
      title: "Grande Foire Agricole du Congo (GFAC) : dates, lieu, programme et enjeux",
      excerpt: "La Grande Foire Agricole du Congo (GFAC) est un événement national majeur dédié à la promotion de l'agriculture, de l'innovation et du développement rural. Découvrez les dates, le lieu, la durée, les activités et les objectifs de cette grande rencontre.",
      category: "events",
      tags: [
        "GFAC",
        "Agriculture",
        "Développement rural",
        "Innovation agricole",
        "Sécurité alimentaire",
        "Congo"
      ],
      date: "05 Février 2026",
      readTime: "3 min",
      image: "/GFAC.jpeg",
      content: `
        <h3>Introduction</h3>
        <p>
          La Grande Foire Agricole du Congo (GFAC) est un événement national majeur dédié à la
          promotion de l'agriculture, de l'innovation et du développement rural en République du Congo.
          Elle constitue une plateforme stratégique de rencontre, d'échanges et de valorisation
          des acteurs du secteur agricole.
        </p>

        <h3>Dates et durée de la foire</h3>
        <p>
          La GFAC se tient du <strong>5 au 15 février 2026</strong>. L'événement s'étend sur une durée
          totale de <strong>11 jours consécutifs</strong>, permettant aux exposants, professionnels
          et visiteurs de profiter pleinement des activités proposées.
        </p>

        <h3>Lieu de l'événement</h3>
        <p>
          La foire se déroule dans la <strong>zone agricole protégée de Bambou-Mingali</strong>,
          située dans le <strong>district d'Ignié</strong>, à environ <strong>60 kilomètres de Brazzaville</strong>.
          Ce site a été choisi pour son potentiel agricole et sa portée symbolique.
        </p>

        <h3>Thème de l'édition</h3>
        <p>
          L'édition est placée sous le thème :
          <em>« Faire de l'agriculture une cause nationale et une source de fierté »</em>.
          Ce thème met en avant l'agriculture comme pilier du développement économique,
          de la sécurité alimentaire et de la création d'emplois.
        </p>

        <h3>Événements et activités prévues</h3>
        <ul>
          <li>Expositions agricoles (cultures, élevage, pêche, aquaculture)</li>
          <li>Ateliers techniques et conférences spécialisées</li>
          <li>Démonstrations pratiques de technologies agricoles</li>
          <li>Rencontres professionnelles et échanges B2B</li>
          <li>Présentation de projets agricoles et opportunités d'investissement</li>
        </ul>

        <h3>Public concerné</h3>
        <p>
          La GFAC s'adresse aux producteurs agricoles, éleveurs, aquaculteurs,
          entrepreneurs agroalimentaires, investisseurs, institutions publiques et privées,
          ainsi qu'au grand public intéressé par l'agriculture et le développement durable.
        </p>

        <h3>Informations et lien officiel</h3>
        <p>
          Pour plus d'informations sur la Grande Foire Agricole du Congo, le programme
          et les modalités de participation, consultez le site officiel :
        </p>

        <p>
          👉 <a href="https://gfac.agriculture.gouv.cg/" target="_blank" rel="noopener noreferrer">
            https://gfac.agriculture.gouv.cg/
          </a>
        </p>

        <hr />
        <p><strong>Source :</strong> Data Analytics Solutions (DAS)</p>
        <p>
          Site officiel :
          <a href="https://das-congo.tech" target="_blank" rel="noopener noreferrer">
            https://das-congo.tech
          </a>
        </p>
        <p><strong>Article rédigé par :</strong> Équipe éditoriale DAS</p>
        <p><em>Publié le 05 février 2026</em></p>
      `
    },
    {
      id: 4,
      title: "Ai-Forest Planner : l'intelligence artificielle au service de l'agriculture durable",
      excerpt: "Développée par Data Analytics Solutions (DAS), Ai-Forest Planner est une application mobile intelligente qui utilise l'intelligence artificielle pour aider les agriculteurs à planifier, anticiper et optimiser leurs activités agricoles. L'application est officiellement lancée le 05 février lors de la Grande Foire Agricole du Congo.",
      category: "innovations",
      tags: [
        "Ai-Forest Planner",
        "Intelligence Artificielle",
        "Agriculture intelligente",
        "AgriTech",
        "Innovation",
        "DAS",
        "IA"
      ],
      date: "05 Février 2026",
      readTime: "8 min",
      image: "/Flyer.jpg",
      content: `
        <h3>Introduction</h3>
        <p>
          Ai-Forest Planner est une application mobile innovante basée sur
          <strong>l'intelligence artificielle</strong>, conçue pour accompagner les agriculteurs
          dans la planification, la prise de décision et l'optimisation de leurs pratiques agricoles.
          Développée par <strong>Data Analytics Solutions (DAS)</strong>, la solution est officiellement
          lancée le <strong>05 février 2026</strong> à l'occasion de la Grande Foire Agricole du Congo.
        </p>

        <h3>L'IA au cœur de la planification agricole</h3>
        <p>
          Ai-Forest Planner intègre des algorithmes d'intelligence artificielle capables
          d'analyser plusieurs paramètres agricoles afin de proposer des recommandations
          personnalisées. L'application exploite notamment des données liées aux
          <strong>sols</strong>, aux <strong>cultures</strong>, aux <strong>conditions climatiques</strong>
          et aux cycles agricoles pour aider l'agriculteur à prendre de meilleures décisions.
        </p>

        <p>
          Grâce à une logique décisionnelle intelligente, l'application anticipe les risques,
          suggère des actions adaptées et accompagne l'utilisateur tout au long du cycle de production.
        </p>

        <h3>Fonctionnalités basées sur l'intelligence artificielle</h3>
        <ul>
          <li>Recommandations agricoles intelligentes basées sur l'analyse des sols et des cultures</li>
          <li>Assistant agricole intelligent (chatbot IA) disponible pour répondre aux problématiques agricoles</li>
          <li>Planification optimisée des cultures selon les saisons et le climat</li>
          <li>Anticipation des risques climatiques et des pertes agricoles</li>
          <li>Apprentissage progressif des modèles IA grâce aux données collectées</li>
          <li>Fonctionnement en mode hors ligne avec synchronisation ultérieure</li>
        </ul>

        <h3>Une application pensée pour l'agriculture durable</h3>
        <p>
          Ai-Forest Planner s'inscrit dans une démarche d'<strong>agriculture durable</strong>
          et de <strong>gestion responsable des ressources naturelles</strong>. En optimisant
          les pratiques agricoles, l'intelligence artificielle permet de réduire les pertes,
          d'améliorer les rendements et de renforcer l'adaptation au changement climatique.
        </p>

        <h3>Lancement officiel à la Grande Foire Agricole du Congo</h3>
        <p>
          Le lancement officiel de Ai-Forest Planner a lieu le <strong>05 février 2026</strong>
          lors de la Grande Foire Agricole du Congo. Cette présentation marque une étape clé
          dans la diffusion des technologies d'intelligence artificielle appliquées à
          l'agriculture en République du Congo.
        </p>

        <h3>Développée par Data Analytics Solutions (DAS)</h3>
        <p>
          Ai-Forest Planner est développée par <strong>Data Analytics Solutions (DAS)</strong>,
          une entreprise spécialisée en analyse de données, intelligence artificielle et
          solutions numériques à fort impact. DAS œuvre pour la transformation digitale
          des secteurs clés, notamment l'agriculture et l'environnement.
        </p>

        <h3>Télécharger Ai-Forest Planner</h3>
        <p>
          L'application Ai-Forest Planner est désormais disponible au téléchargement :
        </p>

        <ul>
          <li>
            📱 <strong>Android (Google Play)</strong> :
            <a href="https://play.google.com/store/apps/details?id=tech.das.aiforestplanner"
               target="_blank" rel="noopener noreferrer">
              Télécharger sur Google Play
            </a>
          </li>
          <li>
            🍎 <strong>iOS (App Store)</strong> :
            <a href="https://apps.apple.com/app/ai-forest-planner/id6740123456"
               target="_blank" rel="noopener noreferrer">
              Télécharger sur l'App Store
            </a>
          </li>
          <li>
            🌐 <strong>Site officiel</strong> :
            <a href="https://das-congo.tech" target="_blank" rel="noopener noreferrer">
              https://das-congo.tech/AiForest
            </a>
          </li>
        </ul>

        <hr />
        <p><strong>Application :</strong> Ai-Forest Planner</p>
        <p><strong>Développée par :</strong> Data Analytics Solutions (DAS)</p>
        <p><strong>Lancement officiel :</strong> 05 février 2026 – Grande Foire Agricole du Congo</p>
      `
    },
  ];

  // Filtrer les actualités
  const filteredNews = newsArticles.filter(article => {
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    const matchesTag = !activeTag || article.tags.some(tag => 
      tag.toLowerCase().includes(activeTag.toLowerCase())
    );
    const matchesSearch = !searchTerm || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesTag && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedNews = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  // Statistiques
  const stats = {
    totalArticles: newsArticles.length,
    featuredArticles: 0,
    thisMonth: 1,
    totalReads: '0k'
  };

  // Changer de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Fonction pour gérer le clic sur un tag
  const handleTagClick = (tagName) => {
    setActiveTag(tagName);
    setSearchTerm(''); // On vide la recherche quand on clique sur un tag
    setCurrentPage(1);
  };

  // Fonction pour réinitialiser les filtres
  const handleResetFilters = () => {
    setActiveCategory('all');
    setActiveTag('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className="company-news-container">
      {/* En-tête */}
      <header className="news-header py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="display-4 mb-3">
                <span className="text-gradient">Actualités & </span> Innovations
              </h3>
              <p className="lead mb-4">
                Restez informé des dernières nouveautés, succès clients et innovations 
                de notre entreprise d'analyse de données.
              </p>
              
              {/* Filtres actifs */}
              {(activeCategory !== 'all' || activeTag) && (
                <div className="active-filters mb-3">
                  <small className="text-muted me-2">Filtres actifs:</small>
                  {activeCategory !== 'all' && (
                    <span className="badge bg-primary me-2">
                      {categories.find(c => c.id === activeCategory)?.name}
                      <button 
                        className="btn-close btn-close-white btn-sm ms-1"
                        onClick={() => setActiveCategory('all')}
                        aria-label="Remove"
                      ></button>
                    </span>
                  )}
                  {activeTag && (
                    <span className="badge bg-info me-2">
                      Tag: {activeTag}
                      <button 
                        className="btn-close btn-close-white btn-sm ms-1"
                        onClick={() => setActiveTag('')}
                        aria-label="Remove"
                      ></button>
                    </span>
                  )}
                  <button 
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleResetFilters}
                  >
                    Réinitialiser tous
                  </button>
                </div>
              )}

              {/* Statistiques */}
              <div className="d-flex flex-wrap gap-4 mb-4">
                <div className="stat-item">
                  <div className="stat-value">{stats.totalArticles}+</div>
                  <div className="stat-label">Articles</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.featuredArticles}</div>
                  <div className="stat-label">En vedette</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.thisMonth}</div>
                  <div className="stat-label">Ce mois-ci</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">{stats.totalReads}</div>
                  <div className="stat-label">Lectures</div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="newsletter-card p-4">
                <h5 className="mb-3">Restez informé</h5>
                <p className="small mb-3">Recevez nos dernières actualités directement dans votre boîte mail.</p>
                
                <div className="d-grid gap-2 mb-3">
                  <button 
                    className="btn btn-primary degradient-logo-vert"
                    onClick={() => {
                      const footerForm = document.querySelector('.modern-footer');
                      if (footerForm) {
                        footerForm.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    📩 Voir le formulaire de contact
                  </button>
                </div>
                
                <p className="small text-muted mb-0">
                  Formulaire de contact complet en bas de page ↓
                </p>
              </div>
            </div>  
          </div>
        </div>
      </header>

      {/* Section principale des actualités */}
      <section className="main-news py-5">
        <div className="container">
          <div className="row">
            {/* Sidebar - Filtres et catégories */}
            <div className="col-lg-3 mb-4 mb-lg-0">
              <div className="sticky-top" style={{ top: '20px' }}>
                {/* Recherche */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h6 className="card-title mb-3">
                      <FaSearch className="me-2" />
                      Rechercher
                    </h6>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Mot-clé, tag..."
                        value={searchTerm}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSearchTerm(value);
                          // Si on commence à taper, on désactive le tag actif
                          if (value && activeTag) {
                            setActiveTag('');
                          }
                        }}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            setCurrentPage(1);
                          }
                        }}
                        style={{ color: '#000' }}
                      />
                      {searchTerm && (
                        <button 
                          className="btn btn-outline-secondary"
                          onClick={() => setSearchTerm('')}
                          type="button"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Catégories */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h6 className="card-title mb-3">
                      <FaFilter className="me-2" />
                      Catégories
                    </h6>
                    <div className="categories-list">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          className={`category-btn w-100 text-start ${activeCategory === cat.id ? 'active' : ''}`}
                          onClick={() => {
                            setActiveCategory(cat.id);
                            setCurrentPage(1);
                          }}
                        >
                          <span className="category-icon">{cat.icon}</span>
                          <span className="category-name">{cat.name}</span>
                          <span className="category-count">{cat.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tags populaires */}
                <div className="card mb-4">
                  <div className="card-body">
                    <h6 className="card-title mb-3">
                      <FaTag className="me-2" />
                      Tags populaires
                    </h6>
                    <div className="tags-cloud">
                      {popularTags.map((tag, idx) => (
                        <button
                          key={idx}
                          className={`tag-btn ${activeTag === tag.name ? 'active' : ''}`}
                          onClick={() => handleTagClick(tag.name)}
                        >
                          {tag.name}
                          <span className="tag-count">{tag.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Téléchargements */}
                <div className="card">
                  <div className="card-body">
                    <h6 className="card-title mb-3">Ressources</h6>
                    <div className="d-grid gap-2">
                      <button className="btn btn-outline-primary">
                        <FaDownload className="me-2" />
                        Brochure 2025
                      </button>
                      <button className="btn btn-outline-primary">
                        <FaDownload className="me-2" />
                        Brochure 2024
                      </button>
                      <button className="btn btn-outline-primary">
                        <FaDownload className="me-2" />
                        Cas clients
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Liste des actualités */}
            <div className="col-lg-9">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 fw-bold mb-0">
                  {activeCategory === 'all' ? 'Toutes les actualités' : 
                   categories.find(c => c.id === activeCategory)?.name}
                  <span className="text-muted fs-6 ms-2">({filteredNews.length})</span>
                </h2>
              </div>

              {/* Grille des actualités */}
              <div className="row row-cols-1 row-cols-md-2 g-4 mb-5">
                {paginatedNews.length > 0 ? (
                  paginatedNews.map((article) => (
                    <div key={article.id} className="col">
                      <div className="news-card h-100">
                        <div 
                          className="news-image"
                          style={{ backgroundImage: `url(${article.image})` }}
                        >
                          <span className="category-badge">
                            {categories.find(c => c.id === article.category)?.icon}
                            {categories.find(c => c.id === article.category)?.name}
                          </span>
                        </div>
                        
                        <div className="news-body p-4">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <small className="text-muted">
                              <FaCalendarAlt className="me-1" />
                              {article.date}
                            </small>
                            <small className="text-muted">
                              ⏱️ {article.readTime}
                            </small>
                          </div>
                          
                          <h5 className="news-title mb-3">{article.title}</h5>
                          <p className="news-excerpt mb-3">{article.excerpt}</p>
                          
                          <div className="tags mb-3">
                            {article.tags.slice(0, 3).map((tag, idx) => (
                              <span 
                                key={idx} 
                                className={`tag-sm me-1 ${activeTag === tag ? 'active' : ''}`}
                                onClick={() => handleTagClick(tag)}
                                style={{ cursor: 'pointer' }}
                              >
                                {tag}
                              </span>
                            ))}
                            {article.tags.length > 3 && (
                              <span className="tag-sm" style={{ cursor: 'default' }}>
                                +{article.tags.length - 3}
                              </span>
                            )}
                          </div>
                          
                          <div className="d-flex justify-content-between align-items-center">
                            <button 
                              className="btn btn-sm btn-outline-primary degradient-logo-vert"
                              onClick={() => handleReadMore(article)}
                            >
                              Lire plus <FiExternalLink className="ms-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-12">
                    <div className="alert alert-info text-center py-5">
                      <FaSearch size={48} className="mb-3 text-muted" />
                      <h5>Aucune actualité trouvée</h5>
                      <p className="mb-0">
                        {searchTerm ? `Aucun résultat pour "${searchTerm}"` : 'Essayez avec d\'autres mots-clés ou catégories'}
                      </p>
                      <button 
                        className="btn btn-sm btn-primary mt-2"
                        onClick={handleResetFilters}
                      >
                        Réinitialiser les filtres
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav aria-label="Pagination des actualités">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <FiChevronLeft />
                      </button>
                    </li>
                    
                    {[...Array(totalPages)].map((_, idx) => (
                      <li 
                        key={idx} 
                        className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
                      >
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(idx + 1)}
                        >
                          {idx + 1}
                        </button>
                      </li>
                    ))}
                    
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        <FiChevronRight />
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      </section>

      {selectedArticle && viewMode === 'detail' && (
        <ArticleDetail
          article={selectedArticle}
          onClose={handleCloseArticle}
          onNext={handleNextArticle}
          onPrev={handlePrevArticle}
        />
      )}
    </div>
  );
};

export default CompanyNews;