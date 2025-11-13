// Todos os Projetos
const projects = [
    { title: "Portfolio", description: "Este portfólio que você está vendo", link: "https://gabriel-senan.github.io/", tech: ["HTML", "CSS", "JavaScript"] },
    { title: "Consult-card", description: "Projeto de consulta de cartões", link: "https://github.com/gabriel-senan/Consult-card", tech: ["JavaScript", "HTML", "CSS"] },
    { title: "Roletador", description: "Roleta random com interface interativa", link: "https://github.com/gabriel-senan/Roletador", tech: ["JavaScript", "HTML", "CSS"] },
    { title: "Stardust Eight D4C", description: "Landing page recriada da Coderhouse", link: "https://gabriel-senan.github.io/stardusteight-d4c/", tech: ["HTML", "CSS", "JavaScript"] }
];

// Skills
const skills = ["PHP", "JavaScript", "MySQL", "GIT", "Linux/ Windows",];

// Carrossel
let currentIndex = 0;
const getItemsPerView = () => window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3;
let totalSlides = 0;

function renderCarousel() {
    const track = document.getElementById('carouselTrack');
    totalSlides = Math.ceil(projects.length / getItemsPerView());
    track.innerHTML = '';

    projects.forEach((project, i) => {
        const card = document.createElement('div');
        card.className = 'carousel-card fade-in';
        card.style.transitionDelay = `${i * 0.05}s`;
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-stack">
                ${project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
            </div>
            <a href="${project.link}" target="_blank" class="project-link">
                Ver Projeto
            </a>
        `;
        track.appendChild(card);
    });

    renderDots();
    updateCarousel();
}

function renderDots() {
    const dots = document.getElementById('carouselDots');
    dots.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot';
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => { currentIndex = i; updateCarousel(); });
        dots.appendChild(dot);
    }
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const perView = getItemsPerView();
    const cardWidth = 280 + 16;
    const offset = currentIndex * cardWidth * perView;
    track.style.transform = `translateX(-${offset}px)`;

    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });

    document.getElementById('prevBtn').disabled = currentIndex === 0;
    document.getElementById('nextBtn').disabled = currentIndex === totalSlides - 1;
}

// Navegação
document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentIndex > 0) { currentIndex--; updateCarousel(); }
});
document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentIndex < totalSlides - 1) { currentIndex++; updateCarousel(); }
});

// Resize
window.addEventListener('resize', () => {
    totalSlides = Math.ceil(projects.length / getItemsPerView());
    currentIndex = Math.min(currentIndex, totalSlides - 1);
    renderDots();
    updateCarousel();
});

// Renderizar Skills
function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    skills.forEach(skill => {
        const badge = document.createElement('div');
        badge.className = 'skill-badge';
        badge.textContent = skill;
        grid.appendChild(badge);
    });
}

// Hamburger, Back to Top
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Tema: Inicia no modo claro, com persistência
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

function applyTheme(theme) {
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        html.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

themeToggle.addEventListener('click', () => {
    const isDark = html.hasAttribute('data-theme');
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
});

// Ao carregar: aplica tema salvo ou claro por padrão
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme || 'light');
    renderCarousel();
    renderSkills();
    setTimeout(observeFadeIn, 100);
});

function observeFadeIn() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}