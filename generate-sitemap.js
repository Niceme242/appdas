const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/actualites', changefreq: 'monthly', priority: 0.8 },
  { url: '/AiForest', changefreq: 'monthly', priority: 0.8 },
  { url: '/nos_services', changefreq: 'monthly', priority: 0.8 },
  { url: '/contacts', changefreq: 'monthly', priority: 0.8 }
];

const sitemap = new SitemapStream({ hostname: 'https://das-congo.tech' });

// Ajouter les liens
links.forEach(link => sitemap.write(link));
sitemap.end();

// Écrire le fichier sitemap.xml dans public
streamToPromise(sitemap).then(sm => {
  fs.writeFileSync('public/sitemap.xml', sm.toString());
  console.log("Sitemap généré avec succès !");
});
