// js/oma-cms.js
// 1) Intenta leer datos estáticos (dist/data/cms.json)
// 2) Si no existe, cae a leer Google Sheets (modo fallback)

async function fetchJSON(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`No se pudo leer ${url} (HTTP ${res.status})`);
  return res.json();
}

function el(id) {
  return document.getElementById(id);
}

function safe(v) {
  return (v ?? "").toString();
}

function buildNoticiaHTML(n) {
  const titulo = safe(n.titulo);
  const texto = safe(n.texto);

  const linkUrl = safe(n.link_url);
  const linkTexto = safe(n.link_texto || "Ver más");

  const linkHTML = linkUrl
    ? `<a href="${linkUrl}" target="_blank" rel="noopener">${linkTexto}</a>`
    : "";

  return `
    <article class="noticia">
      <h3>${titulo}</h3>
      <p>${texto}</p>
      ${linkHTML}
    </article>
  `;
}

function buildLibroHTML(b) {
  const titulo = safe(b.titulo);
  const desc = safe(b.descripcion);

  // columnas reales del Sheet
  const portadaUrl = safe(b.portada_url);   // ej: ./img/Libros/....
  const portadaAlt = safe(b.portada_alt) || titulo;

  // En libros.html estás dentro de /pages/ → necesitás "../" para assets
  const src = portadaUrl ? `../${portadaUrl.replace(/^\.\//, "")}` : "";

  return `
    <div class="libro-card">
      ${src ? `<img src="${src}" alt="${portadaAlt}">` : ""}
      <h3>${titulo}</h3>
      <p>${desc}</p>
    </div>
  `;
}

function buildOtrasHTML(o) {
  const nombre = safe(o.nombre);

  // columnas reales del Sheet
  const iconoUrl = safe(o.icono_url);       // ej: ./img/Logos...
  const iconoAlt = safe(o.icono_alt) || nombre;
  const destinoUrl = safe(o.destino_url);

  const src = iconoUrl ? iconoUrl.replace(/^\.\//, "") : "";

  return `
    <a class="olimpiada-icon" href="${destinoUrl}" target="_blank" rel="noopener">
      ${src ? `<img src="${src}" alt="${iconoAlt}">` : ""}
      <span>${nombre}</span>
    </a>
  `;
}

function renderCMS(cms) {
  // CONFIG (key/value)
  // Esperamos: cms.config = { libros_pedido_url: "...", cache_ttl_minutes: "360", ... }
  const config = cms?.config || {};

  // LIBROS: botón "Hacé tu pedido"
  const btnLibrosPedido = el("btnLibrosPedido");
  if (btnLibrosPedido && config.libros_pedido_url) {
    btnLibrosPedido.href = String(config.libros_pedido_url).trim();
  }

  // INDEX: noticias
  const noticiasContainer = el("noticiasContainer");
  if (noticiasContainer && Array.isArray(cms.noticias)) {
    noticiasContainer.innerHTML = cms.noticias.map(buildNoticiaHTML).join("");
  }

  // INDEX: otras olimpiadas
  const otrasIcons = el("otrasOlimpiadasIcons");
  if (otrasIcons && Array.isArray(cms.otras_olimpiadas)) {
    otrasIcons.innerHTML = cms.otras_olimpiadas.map(buildOtrasHTML).join("");
  }

  // LIBROS: cards
  const librosContainer = el("librosContainer");
  if (librosContainer && Array.isArray(cms.libros)) {
    librosContainer.innerHTML = cms.libros.map(buildLibroHTML).join("");
  }
}

(async () => {
  try {
    // 1) Modo estático (lo que genera build.js)
    // En index.html: /data/cms.json
    // En pages/libros.html: ../data/cms.json
    let cms;

    const isLibros = location.pathname.includes("/pages/libros.html");
    const localUrl = isLibros ? "../data/cms.json" : "./data/cms.json";

    cms = await fetchJSON(localUrl);
    renderCMS(cms);
  } catch (err) {
    console.warn("CMS local no disponible. (En esta prueba) no hacemos fallback a Google.", err);
    // Si después querés fallback a Google, lo agregamos cuando tengas el Sheet cerrado.
  }
})();
