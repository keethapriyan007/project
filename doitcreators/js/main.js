/* ═══════════════════════════════════════
   DO IT CREATORS — Main JS
   ═══════════════════════════════════════ */

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Mobile hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ── Scroll Animations (AOS-lite) ──
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.getAttribute('data-aos-delay') || 0;
      setTimeout(() => {
        entry.target.classList.add('aos-animate');
      }, parseInt(delay));
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

// ── Portfolio Filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const portCards = document.querySelectorAll('.port-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    portCards.forEach(card => {
      const cat = card.dataset.cat;
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ── Contact Form ──
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  if (!name || !email) {
    shakeField(!name ? 'fname' : 'femail');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Sending...';

  // Simulate async send (replace with actual endpoint if needed)
  await new Promise(r => setTimeout(r, 1400));

  contactForm.style.display = 'none';
  formSuccess.style.display = 'flex';

  // Build mailto as fallback
  const service = contactForm.service?.value || '';
  const budget = contactForm.budget?.value || '';
  const message = contactForm.message?.value || '';
  const subject = encodeURIComponent(`Project Inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nService: ${service}\nBudget: ${budget}\n\nMessage:\n${message}`);
  window.location.href = `mailto:doit.creators@gmail.com?subject=${subject}&body=${body}`;
});

function shakeField(id) {
  const el = document.getElementById(id);
  el.style.borderColor = '#f43f5e';
  el.style.animation = 'shake 0.3s ease';
  el.addEventListener('animationend', () => { el.style.animation = ''; }, { once: true });
  el.focus();
}

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = '#a78bfa';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => sectionObserver.observe(s));

// ── Smooth scroll for logo ──
document.querySelector('.logo').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── CSS keyframe for shake ──
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%,100%{transform:translateX(0)}
    25%{transform:translateX(-6px)}
    75%{transform:translateX(6px)}
  }
  @keyframes fadeIn {
    from{opacity:0;transform:scale(0.96)}
    to{opacity:1;transform:scale(1)}
  }
`;
document.head.appendChild(style);

// ── Parallax for hero orbs ──
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelector('.orb1').style.transform = `translate(${x * 0.8}px, ${y * 0.8}px)`;
  document.querySelector('.orb2').style.transform = `translate(${-x * 0.6}px, ${-y * 0.6}px)`;
  document.querySelector('.orb3').style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
}, { passive: true });

// ── Counter animation for stats ──
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const num = parseInt(target);
  const suffix = target.replace(/[0-9]/g, '');
  const update = (time) => {
    const progress = Math.min((time - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * num) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(el => {
        animateCounter(el, el.textContent);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsBlock = document.querySelector('.hero-stats');
if (statsBlock) statsObserver.observe(statsBlock);

console.log('%c🎬 Do It Creators', 'font-size:20px;font-weight:bold;background:linear-gradient(135deg,#7c3aed,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent');
console.log('%c✉ doit.creators@gmail.com | 📞 +91 6379 471 254', 'color:#a78bfa');
