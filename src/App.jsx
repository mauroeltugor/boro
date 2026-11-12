import React, { useEffect, useRef, useState } from 'react';

const images = '/images/';
const whatsapp = 'https://wa.me/573052876627';
const instagram = 'https://www.instagram.com/manuelavargas4/';
const dossier = '/documents/boro-presentacion.pdf';

function Arrow({ diagonal = false, className = '', ...props }) {
  return <svg className={`arrow ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    {diagonal ? <path d="M5 19 19 5M5 5h14v14" /> : <path d="M3 12h17m-7-7 7 7-7 7" />}
  </svg>;
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="icon-dot" cx="17.5" cy="6.5" r="1" /></svg>;
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20.3 11.7a8.3 8.3 0 0 1-12.2 7.4L3 20.5l1.4-5A8.3 8.3 0 1 1 20.3 11.7Z" /><path d="M8.2 7.5c-.7.2-1 1-.8 1.9.6 2.6 2.8 4.9 5.4 5.6.9.2 1.8-.2 2-1l.2-.7-2.2-1-.6.8c-1.3-.5-2.4-1.6-2.9-2.9l.7-.6-.9-2.2Z" /></svg>;
}

function Logo({ light = false, className = '' }) {
  return <img className={`logo ${light ? 'logo-light' : ''} ${className}`} src={`${images}boro-logo.png`} alt="BORÓ — Growth & Governance" width="900" height="350" />;
}

const links = [
  ['La firma', '#firma'],
  ['Servicios', '#servicios'],
  ['Metodología', '#metodologia'],
  ['Proyecto', '#proyecto'],
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event) => {
      if (event.key === 'Escape') { setMenuOpen(false); toggle.current?.focus(); }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  return <header className="site-header">
    <div className="header-inner wrap">
      <a className="brand-link" href="#inicio" aria-label="BORÓ, volver al inicio" onClick={() => setMenuOpen(false)}><Logo /></a>
      <nav className={`navigation ${menuOpen ? 'is-open' : ''}`} id="main-navigation" aria-label="Navegación principal">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        <a className="nav-contact" href="#contacto" onClick={() => setMenuOpen(false)}>Hablemos <Arrow diagonal /></a>
      </nav>
      <button ref={toggle} className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button>
    </div>
  </header>;
}

function SectionLabel({ number, children, className = '' }) {
  return <div className={`section-label ${className}`}><span className="section-number">{number}</span><span>{children}</span></div>;
}

function Hero() {
  return <section className="hero wrap" id="inicio" aria-labelledby="hero-title">
    <div className="hero-copy">
      <div className="eyebrow"><span className="status-dot" /> Estrategia política & gobernanza digital</div>
      <h1 id="hero-title">Menos ruido.<br />Más <span className="underlined">dirección.</span></h1>
      <p className="hero-description">Escuchamos el territorio. Leemos los datos.<br className="desktop-break" /> Construimos un liderazgo que conecta.</p>
      <a className="button button-dark" href="#servicios">Descubre lo que hacemos <Arrow diagonal /></a>
      <div className="hero-bottom"><span>Perspectiva local.<br /><strong>Visión de futuro.</strong></span><a className="scroll-link" href="#firma" aria-label="Descubrir la firma"><span>Desliza para explorar</span><Arrow /></a></div>
    </div>
    <figure className="hero-visual">
      <img src={`${images}plaza.jpg`} alt="Bandera de Colombia y monumento en una plaza de arquitectura institucional" fetchPriority="high" width="1800" height="1200" />
      <div className="hero-image-shade" />
      <span className="image-index">Una mirada al territorio / Colombia</span>
      <figcaption><span className="tiny-label">Nuestro punto de partida</span><span>Las decisiones empiezan<br />donde está la gente.</span></figcaption>
      <a className="image-arrow" href="#firma" aria-label="Conoce nuestra perspectiva"><Arrow diagonal /></a>
    </figure>
  </section>;
}

function Manifesto() {
  return <>
    <div className="statement-bar"><div className="wrap statement-inner"><span>Escucha real.</span><span className="statement-mark" aria-hidden="true">✳</span><span>Datos con sentido.</span><span className="statement-mark" aria-hidden="true">✳</span><span>Serenidad estratégica.</span></div></div>
    <section className="firm section wrap" id="firma" aria-labelledby="firm-title">
      <SectionLabel number="01">La firma</SectionLabel>
      <div className="firm-grid">
        <h2 id="firm-title">La calma también<br />es una forma<br />de <span className="muted-text">liderazgo.</span></h2>
        <div className="firm-copy"><p className="lead">Somos BORÓ. Una firma especializada en <strong>Growth Marketing Político & Gobernanza Digital.</strong></p><p>Ayudamos a romper la cámara de eco: a mirar más allá de los aplausos y entender lo que la ciudadanía realmente siente. Convertimos la intuición en conocimiento y ese conocimiento en dirección estratégica.</p><p>Creemos en un liderazgo moderno, limpio y sereno. En una comunicación que proyecte sobriedad, futuro y orden institucional.</p><a className="text-link" href={dossier} target="_blank" rel="noreferrer">Conoce nuestra presentación <Arrow diagonal /></a></div>
      </div>
      <div className="problem-grid">
        <article><span className="small-index">01 / Perspectiva</span><h3>Fuera de la cámara de eco.</h3><p>Los eventos cerrados y las barras propias no cuentan toda la historia. La realidad se escucha en el territorio.</p></article>
        <article><span className="small-index">02 / Conexión</span><h3>Más allá del ruido.</h3><p>La confrontación vacía y las promesas de siempre necesitan dar paso a una conversación con sentido.</p></article>
        <article><span className="small-index">03 / Criterio</span><h3>Datos antes que intuición.</h3><p>Superar las métricas de vanidad para orientar los recursos, medir lo que importa y responder con criterio.</p></article>
      </div>
    </section>
    <section className="territory-banner" aria-label="Nuestra filosofía">
      <img src={`${images}territorio.jpg`} alt="Plaza de un pueblo colombiano con fachadas tradicionales de colores y montañas al fondo" loading="lazy" width="1800" height="1200" />
      <div className="territory-shade" />
      <div className="wrap territory-content"><span className="tiny-label">Una convicción que nos mueve</span><blockquote>El ruido agita,<br />pero <em>la calma gobierna.</em></blockquote><div className="territory-caption"><span>El territorio es el punto de partida.</span><span>BORÓ / Growth & Governance <Arrow diagonal /></span></div></div>
    </section>
  </>;
}

const services = [
  {
    id: 'escucha', number: '01', title: 'Escuchar para entender.', category: 'Listening & Sentiment Analysis', image: 'ciudadania.jpg', alt: 'Ciudadanía reunida en una avenida colombiana',
    intro: 'La conversación real es la primera fuente de dirección.',
    description: 'Monitoreo y análisis de la conversación digital para reconocer preocupaciones, detectar cambios de sentimiento y anticipar escenarios. La propuesta de escucha 24/7 conecta la lectura de datos con la realidad de los 12 municipios del Quindío.',
    details: [['Escucha del territorio', 'Identificar temas, necesidades y focos de conversación.'], ['Lectura de sentimiento', 'Entender el contexto detrás de las menciones y las tendencias.'], ['Gestión de crisis', 'Detectar señales tempranas para responder con criterio.']],
  },
  {
    id: 'conexion', number: '02', title: 'Conectar para movilizar.', category: 'Political Growth Funnels', image: 'democracia.jpg', alt: 'Una persona deposita su voto en una urna',
    intro: 'Una relación se construye paso a paso.',
    description: 'Una metodología que organiza el recorrido entre conocer una propuesta, comprenderla y participar. Conecta estrategia de contenidos, comunicación clara y seguimiento para dar sentido a cada punto de contacto.',
    details: [['Atracción', 'Contenidos conectados con las problemáticas del territorio.'], ['Nutrición', 'Propuestas explicadas mediante carruseles, infografías y piezas de valor.'], ['Conversión', 'Llamados a la acción claros que faciliten la participación y la movilización.']],
  },
  {
    id: 'comunicacion', number: '03', title: 'Comunicar con dirección.', category: 'Psicología de la comunicación', image: 'instituciones.jpg', alt: 'Arquitectura institucional colombiana vista desde una plaza',
    intro: 'Coherencia entre lo que se dice y lo que se proyecta.',
    description: 'La presentación propone una arquitectura de sesgos cognitivos para trabajar el mensaje político. Integra encuadre, autoridad, prueba social y aversión a la pérdida dentro de una narrativa y una identidad visual coherentes.',
    details: [['Encuadre & autoridad', 'Dar contexto a las propuestas y respaldarlas con trayectoria.'], ['Prueba social', 'Hacer visible el respaldo de comunidades y organizaciones.'], ['Aversión a la pérdida', 'Explicar las consecuencias de una decisión y su relación con el futuro del territorio.']],
  },
];

function Services() {
  const [active, setActive] = useState('escucha');
  return <section className="services section" id="servicios" aria-labelledby="services-title"><div className="wrap">
    <SectionLabel number="02">Lo que hacemos</SectionLabel>
    <div className="services-heading"><h2 id="services-title">Estrategia con método.<br /><span>Decisiones con sentido.</span></h2><p>Escuchar, conectar y comunicar.<br />Tres capacidades. Una misma dirección.</p></div>
    <div className="service-list">{services.map(service => {
      const open = active === service.id;
      return <article className={`service ${open ? 'service-open' : ''}`} key={service.id}>
        <h3><button id={`trigger-${service.id}`} aria-expanded={open} aria-controls={`panel-${service.id}`} onClick={() => setActive(open ? null : service.id)}><span className="service-number">{service.number}</span><span className="service-heading-text"><span className="service-title">{service.title}</span><span className="service-category">{service.category}</span></span><span className="service-toggle" aria-hidden="true">{open ? '−' : '+'}</span></button></h3>
        <div className="service-panel" id={`panel-${service.id}`} role="region" aria-labelledby={`trigger-${service.id}`} hidden={!open}>
          <div className="service-panel-copy"><h4>{service.intro}</h4><p>{service.description}</p><dl>{service.details.map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl></div>
          <figure><img src={`${images}${service.image}`} alt={service.alt} loading="lazy" width="1800" height="1200" /><figcaption>El contexto transforma los datos en decisiones. <Arrow diagonal /></figcaption></figure>
        </div>
      </article>;
    })}</div>
    <a className="text-link text-link-light" href={`${whatsapp}?text=${encodeURIComponent('Hola, Manuela. Me gustaría conocer los servicios de BORÓ.')}`} target="_blank" rel="noreferrer">Démosle dirección a tu proyecto <Arrow diagonal /></a>
  </div></section>;
}

const steps = [
  ['01', 'Escuchar.', 'El punto de partida es la gente. Comprendemos la conversación y las necesidades del territorio.'],
  ['02', 'Interpretar.', 'Ordenamos los hallazgos con Lean Canvas y análisis de datos para definir el reto y el contexto.'],
  ['03', 'Construir.', 'Conectamos narrativa, identidad y contenidos en una estrategia de comunicación coherente.'],
  ['04', 'Ajustar.', 'Leemos los resultados y los cambios del entorno para corregir el rumbo con serenidad.'],
];

function Method() {
  return <section className="method section wrap" id="metodologia" aria-labelledby="method-title">
    <SectionLabel number="03">Cómo trabajamos</SectionLabel>
    <div className="method-heading"><h2 id="method-title">Del territorio<br />a la <span className="muted-text">estrategia.</span></h2><p>Una buena decisión no nace del ruido.<br />Nace de hacer las preguntas correctas.</p></div>
    <div className="steps">{steps.map(([number, title, description]) => <article key={number}><div className="step-top"><span>{number}</span><Arrow diagonal /></div><h3>{title}</h3><p>{description}</p></article>)}</div>
    <div className="territory-gallery"><figure><img src={`${images}comunidad.jpg`} alt="Encuentro cotidiano en una casa de arquitectura tradicional colombiana" loading="lazy" width="1800" height="1200" /><figcaption>Escuchar de cerca.</figcaption></figure><figure><img src={`${images}banderas.jpg`} alt="Banderas colombianas en un tejado de una casa tradicional" loading="lazy" width="1200" height="1800" /><figcaption>Entender lo que nos une.</figcaption></figure><figure><img src={`${images}colombia.jpg`} alt="Bandera de Colombia extendida en una fachada de tejas" loading="lazy" width="1200" height="1800" /><figcaption>Mirar hacia adelante.</figcaption></figure></div>
  </section>;
}

const pillars = [
  ['Turismo sostenible & protección económica', 'Inversión privada, comercio e infraestructura regional como bases del desarrollo.'],
  ['Oportunidades & juventud', 'Empleo técnico, innovación y oportunidades para el talento joven del Quindío.'],
  ['Modernización social', 'Dignidad humana, transparencia y desarrollo institucional en la gestión pública.'],
];

function Project() {
  const [expanded, setExpanded] = useState(false);
  return <section className="project section" id="proyecto" aria-labelledby="project-title"><div className="wrap">
    <SectionLabel number="04">La estrategia toma forma</SectionLabel>
    <div className="project-heading"><div><span className="project-type">Caso de estudio · Proyecto académico</span><h2 id="project-title">El Quindío<br /><span className="muted-text">que viene.</span></h2></div><div className="project-intro"><span className="cotrino-wordmark">COTRINO<span>El Quindío que viene</span></span><p>Una propuesta para convertir la experiencia de gestión en una visión de desarrollo regional, con identidad, claridad y dirección.</p><span className="project-tags">Estrategia / Identidad / Comunicación</span></div></div>
    <figure className="project-main-image"><img src={`${images}cotrino-valla.jpg`} alt="Mockup de una valla de la propuesta COTRINO, El Quindío que viene, con el mensaje Un futuro con dignidad" loading="lazy" width="1200" height="675" /><figcaption><span>01 / Identidad en el territorio</span><span>Visualización de la propuesta</span></figcaption></figure>
    <div className="project-story"><div><span className="small-index">El reto</span><h3>De la experiencia<br />a una visión de futuro.</h3></div><div><p>La presentación parte de la trayectoria de Cotrino como exalcalde de Quimbaya y exsecretario del Interior del Quindío. El reto planteado: traducir esa experiencia técnica y administrativa en un proyecto de futuro para el departamento.</p><p>El posicionamiento se articula alrededor de dos ideas: <strong>“Un futuro con dignidad”</strong> y <strong>“Liderazgo que transforma”</strong>, con una estética sobria y un relato de capacidad de ejecución.</p></div></div>
    <div className="project-pillars">{pillars.map(([title, description], index) => <article key={title}><span className="small-index">Pilar 0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
    <button className="project-expand text-link" aria-expanded={expanded} aria-controls="project-details" onClick={() => setExpanded(!expanded)}>{expanded ? 'Cerrar el detalle del proyecto' : 'Explora el enfoque y los resultados planteados'}<span aria-hidden="true">{expanded ? '−' : '+'}</span></button>
    <div className="project-details" id="project-details" hidden={!expanded}>
      <div className="project-details-text"><h3>Una propuesta conectada, de principio a fin.</h3><dl><div><dt>Diagnóstico con Lean Canvas</dt><dd>El ejercicio identifica la incertidumbre económica y las garantías para el sector productivo como retos. Relaciona seguridad y orden con desarrollo e infraestructura.</dd></div><div><dt>Escucha y comunicación</dt><dd>Propone auditar la conversación de los 12 municipios y conectar los hallazgos con una narrativa y una identidad gráfica consistentes.</dd></div><div><dt>Resultados planteados</dt><dd>Mejor aprovechamiento del presupuesto, correcciones de rumbo basadas en datos y una comunicación visual unificada. El material describe estos resultados de forma cualitativa; no aporta métricas de ejecución.</dd></div></dl></div>
      <figure><img src={`${images}cotrino-digital.jpg`} alt="Mockup de una historia de Instagram para la propuesta COTRINO" loading="lazy" width="1200" height="675" /><figcaption>02 / Aplicación digital · Mockup generado con IA, según la presentación original.</figcaption></figure>
    </div>
    <div className="project-footer"><p>Un ejercicio de estrategia e identidad desarrollado por <strong>Manuela Vargas Granobles.</strong></p><a className="text-link" href={dossier} target="_blank" rel="noreferrer">Ver presentación completa <Arrow diagonal /></a></div>
  </div></section>;
}

function Contact() {
  return <section className="contact section" id="contacto" aria-labelledby="contact-title"><div className="wrap">
    <SectionLabel number="05">Empecemos por una conversación</SectionLabel>
    <div className="contact-grid"><div><h2 id="contact-title">Tu próximo paso<br />merece <span>dirección.</span></h2><p>Cuéntanos qué estás construyendo.<br />Nosotros empezamos por escuchar.</p><a className="button button-light" href={`${whatsapp}?text=${encodeURIComponent('Hola, Manuela. Vi la página de BORÓ y me gustaría conversar sobre un proyecto.')}`} target="_blank" rel="noreferrer"><WhatsAppIcon /> Hablemos por WhatsApp <Arrow diagonal /></a></div><div className="contact-links"><span className="tiny-label">Hablemos con calma</span><a href="tel:+573052876627"><span><small>Celular</small>305 287 6627</span><Arrow diagonal /></a><a href={instagram} target="_blank" rel="noreferrer"><span><small>Instagram</small>@manuelavargas4</span><InstagramIcon /></a><a href={dossier} download="BORO-Presentacion-Manuela-Vargas.pdf"><span><small>Conoce el proyecto</small>Descargar presentación</span><Arrow className="download-arrow" /></a></div></div>
  </div></section>;
}

function Credits({ onClose }) {
  const dialog = useRef(null);
  useEffect(() => { dialog.current?.showModal(); }, []);
  return <dialog className="credits-dialog" ref={dialog} onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="credits-content"><div className="credits-heading"><h2>Créditos</h2><button aria-label="Cerrar créditos" onClick={onClose}>×</button></div><p>Concepto, contenido e identidad de BORÓ: <strong>Manuela Vargas Granobles.</strong></p><p>Fotografías proporcionadas en la carpeta del proyecto, procedentes de Unsplash:</p><ul>{['Camila Quintero Franco', 'Carolina Gomes', 'Element5 Digital', 'Janet Restrepo', 'Jhonny Estrada', 'Jimmy Hu', 'Ricardo Arce', 'Ricky Beron'].map(name => <li key={name}>{name}</li>)}</ul><p>Las aplicaciones de COTRINO proceden de la presentación académica original. La pieza digital está identificada allí como mockup generado con Gemini.</p></div></dialog>;
}

function Footer() {
  const [credits, setCredits] = useState(false);
  return <footer className="footer"><div className="wrap"><div className="footer-top"><a href="#inicio" aria-label="BORÓ, volver al inicio"><Logo light /></a><p>La elección de quienes<br /><strong>gobiernan con serenidad.</strong></p><a className="back-top" href="#inicio">Volver arriba <Arrow /></a></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Manuela Vargas Granobles. Todos los derechos reservados.</p><button onClick={() => setCredits(true)}>Créditos de imágenes</button><span>Hecho con perspectiva. Desde Colombia.</span></div></div>{credits && <Credits onClose={() => setCredits(false)} />}</footer>;
}

export default function App() {
  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><Header /><main id="contenido"><Hero /><Manifesto /><Services /><Method /><Project /><Contact /></main><Footer /></>;
}
