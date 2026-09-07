/* ═══════════════════════════════════════════════
   LABVIDA — JavaScript principal
   Archivo: js/main.js
═══════════════════════════════════════════════ */

/* ── 1. NAV: scroll + menú móvil ── */
(function () {
  const navbar = document.getElementById('navbar');
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  // Sombra al hacer scroll
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 30
      ? '0 2px 16px rgba(0,0,0,.25)'
      : 'none';
  });

  // Menú hamburguesa en móvil
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    // Cerrar al hacer clic en un enlace
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }
})();


/* ── 2. FORMULARIO → WhatsApp ── */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // ⚠️ REEMPLAZA este número con el tuyo real (solo dígitos, sin +)
  const WA_NUMBER = '51999999999';

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre   = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const servicio = document.getElementById('servicio').value;
    const domicilio= document.getElementById('domicilio').value;
    const mensaje  = document.getElementById('mensaje').value.trim();

    if (!nombre || !telefono) {
      alert('Por favor completa tu nombre y teléfono.');
      return;
    }

    // Armar mensaje para WhatsApp
    let text = `Hola, me llamo *${nombre}* y quiero agendar una cita.\n`;
    if (servicio)  text += `📋 Servicio: ${servicio}\n`;
    text += `🏠 Atención: ${domicilio}\n`;
    text += `📞 Teléfono: ${telefono}\n`;
    if (mensaje)   text += `💬 Mensaje: ${mensaje}`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
})();


/* ── 3. Animación suave al entrar en viewport ── */
(function () {
  const targets = document.querySelectorAll(
    '.srv-card, .paq-card, .paso, .trust-item, .nos-grid'
  );

  if (!('IntersectionObserver' in window)) return;

  // Estado inicial
  targets.forEach(el => {
    el.style.opacity  = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));
})();


/* ── 4. Enlace activo en el nav según scroll ── */
(function () {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navAnchors.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
  });
})();
