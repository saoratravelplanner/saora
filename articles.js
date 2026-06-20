/* =====================================================================
   Saora — Journal : base de données des articles
   ---------------------------------------------------------------------
   POUR AJOUTER UN ARTICLE : copiez un bloc { ... } dans la liste ARTICLES
   ci-dessous et remplissez les champs. Le "slug" (utilisé dans l'URL) est
   généré automatiquement à partir du titre — rien d'autre à faire.
   Lien vers un article :  Article.dc.html?a=slug-de-l-article
   ===================================================================== */
(function () {
  function slugify(s) {
    return String(s).toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')   // enlève les accents
      .replace(/[^a-z0-9]+/g, '-')                          // espaces/ponct. -> tiret
      .replace(/^-+|-+$/g, '');                             // tirets de bord
  }

  var ARTICLES = [
    {
      title: "Top 5 des attractions incontournables à Tulum",
      titleHtml: 'Top 5 des attractions<br>incontournables à <span style="font-style:italic;color:#5c6b53;">Tulum</span>',
      subtitle: "Le guide complet pour préparer votre voyage.",
      category: "Guide de voyage · Mexique",
      author: "Fiona",
      date: "Juin 2026",
      dateISO: "2026-06-15",
      readingTime: "8 min",
      hero: "tulum-hero.jpg",
      heroAlt: "Pyramide maya du Yucatán sous un ciel des Caraïbes",
      heroPos: "center 38%",
      excerpt: "Ruines mayas face à la mer, cenotes cachées dans la jungle, plages de rêve et gastronomie locale : le guide complet pour préparer votre séjour.",
      ctaEyebrow: "Vous préparez votre voyage à Tulum ?",
      ctaTitleHtml: 'Le meilleur du Mexique,<br><span style="font-family:\'Sloop Script One\',cursive;font-weight:400;font-size:clamp(44px,6vw,78px);line-height:0.9;color:#f4efe6;">sans le stress de l\'organisation</span>',
      ctaText: "Chez Saora, je conçois des itinéraires sur-mesure pour vous faire vivre le meilleur du Mexique. Racontez-moi votre projet, et composons-le ensemble.",
      bodyHtml: `
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:0 0 26px;">
      <span style="float:left;font-family:'Cormorant Garamond',serif;font-weight:600;font-size:78px;line-height:0.74;margin:8px 14px 0 0;color:#5c6b53;">N</span>ichée sur la côte caraïbe du Yucatán, Tulum est devenue en quelques années l'une des destinations les plus convoitées du Mexique. Entre ruines mayas surplombant une mer turquoise, cenotes cristallines cachées dans la jungle et atmosphère bohème-chic, la ville a tout pour séduire les voyageurs en quête d'authenticité et de dépaysement.
    </p>
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:0 0 8px;">
      Mais avec autant de choses à voir, difficile de savoir par où commencer. Voici ma sélection des 5 attractions incontournables à ne pas manquer lors de votre séjour à Tulum, avec tous les conseils pratiques pour en profiter pleinement.
    </p>

    <div style="margin:54px 0 0;">
      <div class="att-row" style="display:flex;align-items:baseline;gap:20px;border-top:1px solid rgba(35,42,31,0.16);padding-top:26px;">
        <span class="att-num" style="flex-shrink:0;font-family:'Cormorant Garamond',serif;font-size:64px;line-height:0.8;color:#9aa68c;">01</span>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(28px,3.3vw,38px);line-height:1.1;margin:0;color:#232a1f;">Les ruines mayas de Tulum, face à la mer des Caraïbes</h2>
      </div>
    </div>
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:26px 0;">
      Impossible de visiter Tulum sans s'arrêter devant son site archéologique le plus emblématique. Perchées sur une falaise de 12 mètres dominant la mer turquoise des Caraïbes, les ruines de Tulum offrent un décor à couper le souffle, unique parmi tous les sites mayas du Mexique : c'est en effet la seule cité maya construite directement en bord de mer.
    </p>
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:26px 0;">
      Le site, qui s'étend sur plusieurs hectares, abrite notamment El Castillo, le temple principal qui servait autrefois de phare aux navigateurs mayas, ainsi que le Temple du Dieu Descendant et le Temple des Fresques, dont les peintures murales témoignent encore de la richesse artistique de cette civilisation.
    </p>
    <aside style="background:#f6f2ea;border:1px solid rgba(35,42,31,0.12);border-left:3px solid #5c6b53;padding:26px 30px;margin:30px 0;">
      <p style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#6f7d63;margin:0 0 16px;">Conseils pratiques</p>
      <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:11px;font-size:15.5px;line-height:1.55;color:#5b5446;">
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Arrivez dès l'ouverture (8h) pour éviter la foule et la chaleur écrasante de la mi-journée.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Comptez environ 1h30 à 2h pour la visite.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Portez un chapeau et de la crème solaire, l'ombre est rare sur le site.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>En contrebas, une petite plage permet de se baigner avec vue sur les ruines : un moment vraiment magique.</span></li>
      </ul>
    </aside>

    <div style="margin:54px 0 0;">
      <div class="att-row" style="display:flex;align-items:baseline;gap:20px;border-top:1px solid rgba(35,42,31,0.16);padding-top:26px;">
        <span class="att-num" style="flex-shrink:0;font-family:'Cormorant Garamond',serif;font-size:64px;line-height:0.8;color:#9aa68c;">02</span>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(28px,3.3vw,38px);line-height:1.1;margin:0;color:#232a1f;">Les cenotes, joyaux cachés de la jungle</h2>
      </div>
    </div>
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:26px 0;">
      Le Yucatán repose sur un sous-sol calcaire criblé de grottes et de rivières souterraines, qui ont donné naissance à des milliers de cenotes : des puits naturels d'eau douce, parfois ouverts au ciel, parfois cachés dans des grottes obscures. Pour les Mayas, ces lieux étaient sacrés, considérés comme des portes vers le monde souterrain. Aux alentours de Tulum, deux cenotes sortent particulièrement du lot :
    </p>
    <div style="display:flex;flex-direction:column;gap:16px;margin:0 0 26px;">
      <p style="font-family:'Cormorant Garamond',serif;font-size:20px;line-height:1.7;color:#3a3a2e;margin:0;"><strong style="font-weight:600;color:#232a1f;">Gran Cenote</strong> — facilement accessible, avec une eau cristalline peu profonde idéale pour le snorkeling. On y croise souvent des tortues et de petits poissons.</p>
      <p style="font-family:'Cormorant Garamond',serif;font-size:20px;line-height:1.7;color:#3a3a2e;margin:0;"><strong style="font-weight:600;color:#232a1f;">Dos Ojos</strong> — un système de grottes plus spectaculaire, parfait pour la plongée et le snorkeling, avec des jeux de lumière saisissants qui traversent l'eau.</p>
    </div>
    <aside style="background:#f6f2ea;border:1px solid rgba(35,42,31,0.12);border-left:3px solid #5c6b53;padding:26px 30px;margin:30px 0;">
      <p style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#6f7d63;margin:0 0 16px;">Conseils pratiques</p>
      <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:11px;font-size:15.5px;line-height:1.55;color:#5b5446;">
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Utilisez uniquement de la crème solaire biodégradable (souvent obligatoire) pour préserver l'écosystème fragile.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Une douche est généralement exigée avant la baignade.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Prévoyez des chaussures aquatiques, certaines zones rocheuses peuvent être glissantes.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Privilégiez une visite en début de matinée, avant l'arrivée des groupes.</span></li>
      </ul>
    </aside>

    <div style="margin:54px 0 0;">
      <div class="att-row" style="display:flex;align-items:baseline;gap:20px;border-top:1px solid rgba(35,42,31,0.16);padding-top:26px;">
        <span class="att-num" style="flex-shrink:0;font-family:'Cormorant Garamond',serif;font-size:64px;line-height:0.8;color:#9aa68c;">03</span>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(28px,3.3vw,38px);line-height:1.1;margin:0;color:#232a1f;">La zone hôtelière de Tulum Beach</h2>
      </div>
    </div>
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:26px 0;">
      La fameuse « Zona Hotelera » de Tulum s'étire le long d'une plage de sable blanc bordée de cocotiers, sur près de 10 kilomètres. C'est ici que se concentrent les hôtels-boutiques, les beach clubs tendance et les restaurants les plus photogéniques de la ville, mélangeant architecture en bois flotté, décoration bohème et ambiance décontractée.
    </p>
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:26px 0;">
      Même sans y loger, la zone hôtelière mérite une journée complète : on peut y louer un vélo pour sillonner la route principale, s'arrêter dans un beach club, déguster un ceviche les pieds dans le sable, ou simplement profiter de l'une des plus belles plages du Mexique.
    </p>
    <aside style="background:#f6f2ea;border:1px solid rgba(35,42,31,0.12);border-left:3px solid #5c6b53;padding:26px 30px;margin:30px 0;">
      <p style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#6f7d63;margin:0 0 16px;">Conseils pratiques</p>
      <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:11px;font-size:15.5px;line-height:1.55;color:#5b5446;">
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Le vélo est le moyen de transport le plus pratique et le plus agréable pour explorer la zone.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Les beach clubs demandent souvent une consommation minimale pour accéder à leurs transats.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Privilégiez le lever ou le coucher du soleil pour des photos sans trop de monde.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Les algues sargasses varient selon la saison ; renseignez-vous avant de réserver si la plage est votre priorité.</span></li>
      </ul>
    </aside>

    <div style="margin:54px 0 0;">
      <div class="att-row" style="display:flex;align-items:baseline;gap:20px;border-top:1px solid rgba(35,42,31,0.16);padding-top:26px;">
        <span class="att-num" style="flex-shrink:0;font-family:'Cormorant Garamond',serif;font-size:64px;line-height:0.8;color:#9aa68c;">04</span>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(28px,3.3vw,38px);line-height:1.1;margin:0;color:#232a1f;">La réserve de biosphère de Sian Ka'an</h2>
      </div>
    </div>
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:26px 0;">
      Classée au patrimoine mondial de l'UNESCO, la réserve de Sian Ka'an (« là où naît le ciel » en maya) s'étend sur plus de 500 000 hectares au sud de Tulum. C'est l'une des zones protégées les plus riches en biodiversité d'Amérique du Nord, abritant mangroves, lagons, forêts tropicales et récifs coralliens.
    </p>
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:26px 0;">
      Une excursion permet d'observer une faune exceptionnelle : flamants roses, lamantins, crocodiles, tortues marines et plus de 300 espèces d'oiseaux. Les visites guidées en bateau à travers les canaux mayas et les lagons aux eaux multicolores sont une expérience à part, loin de l'agitation touristique du centre de Tulum.
    </p>
    <aside style="background:#f6f2ea;border:1px solid rgba(35,42,31,0.12);border-left:3px solid #5c6b53;padding:26px 30px;margin:30px 0;">
      <p style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#6f7d63;margin:0 0 16px;">Conseils pratiques</p>
      <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:11px;font-size:15.5px;line-height:1.55;color:#5b5446;">
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>La réserve n'est accessible qu'avec un guide agréé : réservez votre excursion à l'avance.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Comptez une demi-journée à une journée complète selon le circuit choisi.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Emportez des jumelles si vous êtes passionné d'observation des oiseaux.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>La meilleure période pour observer la faune se situe tôt le matin.</span></li>
      </ul>
    </aside>

    <div style="margin:54px 0 0;">
      <div class="att-row" style="display:flex;align-items:baseline;gap:20px;border-top:1px solid rgba(35,42,31,0.16);padding-top:26px;">
        <span class="att-num" style="flex-shrink:0;font-family:'Cormorant Garamond',serif;font-size:64px;line-height:0.8;color:#9aa68c;">05</span>
        <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(28px,3.3vw,38px);line-height:1.1;margin:0;color:#232a1f;">El Mercado et la gastronomie locale</h2>
      </div>
    </div>
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:26px 0;">
      Pour une immersion plus authentique, direction le centre-ville de Tulum (Tulum Pueblo) et ses marchés locaux comme El Mercadito, où l'on trouve fruits exotiques, épices, artisanat local et surtout une cuisine yucatèque savoureuse à prix doux, loin des tarifs parfois élevés de la zone hôtelière.
    </p>
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:26px 0;">
      C'est l'occasion de goûter aux spécialités régionales : cochinita pibil (porc mariné cuit à l'étouffée), tacos al pastor, panuchos, ou encore un verre d'agua de horchata bien frais. Le centre-ville permet aussi de découvrir le Tulum du quotidien, plus authentique et moins formaté pour les touristes.
    </p>
    <aside style="background:#f6f2ea;border:1px solid rgba(35,42,31,0.12);border-left:3px solid #5c6b53;padding:26px 30px;margin:30px 0;">
      <p style="font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#6f7d63;margin:0 0 16px;">Conseils pratiques</p>
      <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:11px;font-size:15.5px;line-height:1.55;color:#5b5446;">
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Les prix dans le centre-ville sont généralement 2 à 3 fois moins élevés que dans la zone hôtelière.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Privilégiez les stands où mangent les habitants, gage de fraîcheur.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>Le marché est particulièrement animé en fin d'après-midi et en soirée.</span></li>
        <li style="display:flex;gap:12px;"><span style="color:#9aa68c;">✦</span><span>N'hésitez pas à négocier (avec courtoisie) sur les marchés d'artisanat.</span></li>
      </ul>
    </aside>

    <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:32px;line-height:1.15;margin:54px 0 16px;color:#232a1f;">Quand partir à Tulum ?</h2>
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:0 0 26px;">
      La meilleure période s'étend de <strong style="font-weight:600;color:#232a1f;">novembre à avril</strong>, durant la saison sèche, avec des températures agréables et moins d'humidité. La saison des pluies (juin à octobre) reste praticable mais s'accompagne d'averses tropicales fréquentes, généralement courtes, et d'un risque accru d'ouragans en fin de saison. Attention également à la saison des sargasses (algues brunes), particulièrement présente entre avril et août selon les années.
    </p>
    <h2 style="font-family:'Cormorant Garamond',serif;font-weight:500;font-size:32px;line-height:1.15;margin:44px 0 16px;color:#232a1f;">Comment se déplacer à Tulum ?</h2>
    <p style="font-family:'Cormorant Garamond',serif;font-size:21px;line-height:1.85;color:#3a3a2e;margin:0 0 26px;">
      Tulum se découvre facilement à vélo, notamment pour relier le centre-ville à la zone hôtelière et aux ruines. Pour les excursions plus éloignées (cenotes, Sian Ka'an), la location de voiture ou les excursions organisées restent les options les plus confortables. Les taxis sont également nombreux, avec des tarifs fixes à négocier avant le départ.
    </p>

    <div style="background:#7d8e73;color:#f4efe6;padding:40px 40px 44px;margin:46px 0 40px;">
      <p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(244,239,230,0.8);margin:0 0 14px;">En résumé</p>
      <p style="font-family:'Cormorant Garamond',serif;font-size:22px;line-height:1.6;margin:0;color:#f4efe6;">Entre histoire maya, nature préservée, plages de rêve et gastronomie locale, Tulum concentre en un seul lieu tout ce qui fait la magie du Mexique. Que vous soyez plutôt culture, farniente ou aventure, ces 5 incontournables vous garantissent un séjour mémorable.</p>
    </div>
`
    }
  ];

  var BY_SLUG = {};
  ARTICLES.forEach(function (a) {
    a.slug = a.slug || slugify(a.title);
    BY_SLUG[a.slug] = a;
  });

  window.SAORA_SLUGIFY = slugify;
  window.SAORA_ARTICLES_LIST = ARTICLES;   // ordre d'affichage (le 1er = article par défaut)
  window.SAORA_ARTICLES = BY_SLUG;          // accès par slug
})();
