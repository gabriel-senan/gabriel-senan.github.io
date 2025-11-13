// Todos os Projetos
const projects = [
    { title: "Portfolio", description: "Este portfólio profissional que você está vendo", link: "https://gabriel-senan.github.io/", tech: ["HTML", "CSS", "JavaScript"] },
    { title: "GitHub Homepage", description: "Redesign minimalista da homepage do GitHub", link: "https://github.com/gabriel-senan/github-homepage", tech: ["TypeScript", "React", "Next.js"] },
    { title: "Banco de Dados MySQL", description: "Sistema de banco de dados para análise de mercado", link: "https://github.com/gabriel-senan/banco-mysql-projeto", tech: ["MySQL", "Python"] },
    { title: "Análise Power BI", description: "Dashboards e relatórios interativos de Power BI", link: "https://github.com/gabriel-senan/powerbi-analise", tech: ["Power BI", "DAX", "SQL"] },
    { title: "Consult-card", description: "Projeto de consulta de informações de cartões", link: "https://github.com/gabriel-senan/Consult-card", tech: ["JavaScript", "HTML", "CSS"] },
    { title: "Curso-php-B7-Web", description: "Curso de PHP da plataforma B7Web", link: "https://github.com/gabriel-senan/Curso-php-B7-Web", tech: ["PHP", "MySQL"] },
    { title: "Roletador", description: "Roleta random com interface interativa", link: "https://github.com/gabriel-senan/Roletador", tech: ["JavaScript", "HTML", "CSS"] },
    { title: "Stardust Eight D4C", description: "Landing page recriada da Coderhouse", link: "https://gabriel-senan.github.io/stardusteight-d4c/", tech: ["HTML", "CSS", "JavaScript"] }
];

// Skills
const skills = ["PHP", "Linux", "MySQL", "JavaScript"];

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

// Hamburger, Dark Mode, Back to Top
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

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}
themeToggle.addEventListener('click', () => {
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        html.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});

function observeFadeIn() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderCarousel();
    renderSkills();
    setTimeout(observeFadeIn, 100);
});