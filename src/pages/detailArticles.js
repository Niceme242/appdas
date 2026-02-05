import React, { useEffect } from 'react';
import { 
  FaCalendarAlt, 
  FaTag, 
  FaTimes, 
  FaArrowLeft, 
  FaShareAlt, 
  FaDownload,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const ArticleDetail = ({ article, onClose, onNext, onPrev }) => {
  // Empêcher le scroll du body quand la modal est ouverte
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Fonction pour partager
  const handleShare = () => {
    const url = window.location.href;
    const title = article.title;
    const text = article.excerpt;
    
    if (navigator.share) {
      navigator.share({
        title: title,
        text: text,
        url: url,
      }).catch(err => console.log('Erreur de partage:', err));
    } else {
      // Fallback: copier le lien
      navigator.clipboard.writeText(url)
        .then(() => alert('Lien copié dans le presse-papier !'))
        .catch(() => alert('Impossible de copier le lien'));
    }
  };

  // Fonction pour télécharger/impression
  const handleDownload = () => {
    const printContent = `
      <html>
        <head>
          <title>${article.title}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              padding: 30px; 
              max-width: 800px; 
              margin: 0 auto;
              line-height: 1.6;
            }
            h1 { 
              color: #2c3e50; 
              border-bottom: 2px solid #3498db; 
              padding-bottom: 15px; 
              margin-bottom: 25px;
              font-size: 28px;
            }
            .meta { 
              color: #7f8c8d; 
              margin: 20px 0 30px 0;
              font-size: 14px;
              padding: 15px;
              background: #f8f9fa;
              border-radius: 5px;
            }
            .meta strong { color: #2c3e50; }
            .tags { 
              margin: 25px 0; 
              padding: 15px 0;
            }
            .tag { 
              display: inline-block; 
              background: #e9ecef; 
              padding: 5px 12px; 
              margin: 5px; 
              border-radius: 20px;
              font-size: 13px;
            }
            .content { 
              margin-top: 25px; 
            }
            .content h2, .content h3 { 
              color: #2c3e50; 
              margin-top: 30px; 
              margin-bottom: 15px;
            }
            .content p { 
              margin-bottom: 20px; 
              text-align: justify;
            }
            .content ul, .content ol { 
              margin-left: 25px; 
              margin-bottom: 25px;
            }
            .content li { 
              margin-bottom: 10px;
              line-height: 1.5;
            }
            .content a { 
              color: #3498db; 
              text-decoration: none;
            }
            .content a:hover { 
              text-decoration: underline;
            }
            .footer { 
              margin-top: 40px; 
              padding-top: 20px; 
              border-top: 1px solid #ddd; 
              font-size: 12px; 
              color: #95a5a6;
              text-align: center;
            }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>${article.title}</h1>
          <div class="meta">
            <p><strong>📅 Date :</strong> ${article.date}</p>
            <p><strong>🏷️ Catégorie :</strong> ${article.category === 'events' ? 'Événement' : 'Innovation'}</p>
            <p><strong>⏱️ Temps de lecture :</strong> ${article.readTime}</p>
          </div>
          <div class="tags">
            <strong>🔖 Tags :</strong><br>
            ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}
          </div>
          <div class="content">
            ${article.content || article.excerpt}
          </div>
          <div class="footer">
            <p><strong>Source :</strong> Data Analytics Solutions (DAS)</p>
            <p><strong>URL :</strong> ${window.location.origin}/actualites</p>
            <p><em>Document généré le ${new Date().toLocaleDateString('fr-FR')}</em></p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    
    // Attendre que le contenu soit chargé puis lancer l'impression
    setTimeout(() => {
      printWindow.print();
      // Optionnel : fermer la fenêtre après impression
      // setTimeout(() => printWindow.close(), 1000);
    }, 1000);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }} onClick={onClose}>
      
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '1000px',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        
        {/* Header avec boutons */}
        <div style={{
          padding: '15px 25px',
          backgroundColor: '#fff',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={onClose} style={{
              backgroundColor: '#f8f9fa',
              border: '1px solid #dee2e6',
              borderRadius: '6px',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#495057'
            }}>
              <FaArrowLeft /> Retour
            </button>
            <span style={{
              fontSize: '14px',
              color: '#6c757d',
              marginLeft: '15px'
            }}>
              {article.category === 'events' ? '📅 Événement' : '🚀 Innovation'}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleShare} style={{
              backgroundColor: 'transparent',
              border: '1px solid #007bff',
              borderRadius: '6px',
              padding: '8px 15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              color: '#007bff',
              fontSize: '14px'
            }}>
              <FaShareAlt /> Partager
            </button>
            <button onClick={handleDownload} style={{
              backgroundColor: 'transparent',
              border: '1px solid #28a745',
              borderRadius: '6px',
              padding: '8px 15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              color: '#28a745',
              fontSize: '14px'
            }}>
              <FaDownload /> PDF
            </button>
            <button onClick={onClose} style={{
              backgroundColor: '#dc3545',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '14px'
            }}>
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Contenu de l'article */}
        <div style={{
          padding: '30px',
          overflowY: 'auto',
          flex: 1
        }}>
          {/* Image de l'article */}
          <div style={{
            width: '100%',
            height: '350px',
            marginBottom: '30px',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={article.image} 
              alt={article.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x350/2c3e50/ffffff?text=' + encodeURIComponent(article.title);
              }}
            />
          </div>

          {/* Titre de l'article */}
          <h1 style={{
            fontSize: '2.2rem',
            fontWeight: 'bold',
            color: '#2c3e50',
            marginBottom: '20px',
            lineHeight: '1.3'
          }}>
            {article.title}
          </h1>

          {/* Métadonnées */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '25px',
            marginBottom: '25px',
            paddingBottom: '20px',
            borderBottom: '1px solid #e9ecef',
            color: '#6c757d',
            fontSize: '15px'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaCalendarAlt /> {article.date}
            </span>
            <span>⏱️ {article.readTime}</span>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: '30px' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              {article.tags.map((tag, idx) => (
                <span key={idx} style={{
                  backgroundColor: '#e9ecef',
                  color: '#495057',
                  padding: '6px 15px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <FaTag size={12} /> {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Contenu */}
          <div style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#333'
          }}>
            <div 
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
              }}
            />
          </div>

          {/* Navigation */}
          <div style={{
            marginTop: '40px',
            paddingTop: '25px',
            borderTop: '1px solid #e9ecef',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button 
              onClick={onPrev}
              style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                padding: '12px 25px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                fontSize: '15px',
                color: onPrev ? '#495057' : '#adb5bd',
                opacity: onPrev ? 1 : 0.6
              }}
              disabled={!onPrev}
            >
              <FaChevronLeft /> Précédent
            </button>
            
            <button 
              onClick={onClose}
              style={{
                backgroundColor: '#007bff',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 30px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: '500'
              }}
            >
              Retour aux actualités
            </button>
            
            <button 
              onClick={onNext}
              style={{
                backgroundColor: '#f8f9fa',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                padding: '12px 25px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                fontSize: '15px',
                color: onNext ? '#495057' : '#adb5bd',
                opacity: onNext ? 1 : 0.6
              }}
              disabled={!onNext}
            >
              Suivant <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;