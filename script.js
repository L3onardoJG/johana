// Configuración inicial
document.addEventListener('DOMContentLoaded', function() {
    // Fecha de inicio de la relación (ajusta esta fecha)
    const startDate = new Date('2025-03-14T15:00:00');
    
    // Inicializar efectos
    createStars();
    createParticles();
    startLoveCounter(startDate);
    initializeAnimatedPoems();
    initializeTimeline();
    addPhotoInteractions();
});

// Crear estrellas dinámicas mejoradas
function createStars() {
    const starsContainer = document.getElementById('stars');
    
    // Estrellas normales
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.setProperty('--duration', `${Math.random() * 4 + 2}s`);
        
        starsContainer.appendChild(star);
    }
    
    // Estrellas fugaces ocasionales
    setInterval(() => {
        if (Math.random() < 0.3) {
            createShootingStar();
        }
    }, 5000);
}

// Crear estrella fugaz
function createShootingStar() {
    const star = document.createElement('div');
    star.classList.add('star', 'shooting');
    star.style.left = `${Math.random() * 50}px`;
    star.style.top = `${Math.random() * 50 + 10}%`;
    
    document.getElementById('stars').appendChild(star);
    
    setTimeout(() => {
        star.remove();
    }, 3000);
}

// Crear partículas flotantes románticas
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particles = ['💕', '🌟', '✨', '💖', '🦋', '🌸', '💫', '❤️'];
    
    setInterval(() => {
        if (Math.random() < 0.7) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDuration = `${Math.random() * 4 + 6}s`;
            particle.style.fontSize = `${Math.random() * 15 + 15}px`;
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 10000);
        }
    }, 2000);
}

// Contador de tiempo de amor
function startLoveCounter(startDate) {
    function updateCounter() {
        const now = new Date();
        const diff = now - startDate;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Actualizar con animación
        animateNumber('days', days);
        animateNumber('hours', hours);
        animateNumber('minutes', minutes);
        animateNumber('seconds', seconds);
    }
    
    updateCounter();
    setInterval(updateCounter, 1000);
}

// Animar números del contador
function animateNumber(id, newValue) {
    const element = document.getElementById(id);
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue !== newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#ff6b6b';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.color = '#ff6b6b';
        }, 150);
    }
}

// Poemas animados rotativos
function initializeAnimatedPoems() {
    const poemElement = document.getElementById('animated-poem');
    const poems = [
        "Como el reloj que me regalaste,<br>cada segundo contigo es un tesoro.<br>Como las flores que te entregué,<br>mi amor por ti florece cada día más fuerte.",
        
        "En Chapultepec bajo la lluvia,<br>nuestros corazones danzaron juntos.<br>Cada gota que caía del cielo<br>era un verso de nuestro poema eterno.",
        
        "Con La Sombra del Viento entre mis manos,<br>te pedí ser la luz de mi vida.<br>Como las páginas de ese libro querido,<br>nuestro amor se escribe día a día.",
        
        "Cinco meses son apenas el prólogo<br>de la novela más hermosa.<br>Cada capítulo contigo<br>supera al anterior en belleza.",
        
        "Tus dibujos son mapas de mi alma,<br>cada línea un sendero hacia ti.<br>En cada trazo encuentro<br>la geografía de nuestro amor."
    ];
    
    let currentPoemIndex = 0;
    
    function changePoem() {
        poemElement.style.opacity = '0';
        poemElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            currentPoemIndex = (currentPoemIndex + 1) % poems.length;
            poemElement.innerHTML = poems[currentPoemIndex];
            poemElement.style.opacity = '1';
            poemElement.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Cambiar poema cada 8 segundos
    setInterval(changePoem, 8000);
}

// Línea de tiempo interactiva
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remover clase active de todos los elementos
            timelineItems.forEach(i => {
                const marker = i.querySelector('.timeline-marker');
                marker.classList.remove('active');
            });
            
            // Agregar clase active al elemento clickeado
            const marker = item.querySelector('.timeline-marker');
            marker.classList.add('active');
            
            // Efecto de celebración
            createCelebrationEffect(item);
        });
        
        // Observador para activar automáticamente cuando está visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.transform = 'translateX(0)';
                        entry.target.style.opacity = '1';
                    }, index * 200);
                }
            });
        });
        
        observer.observe(item);
        
        // Estado inicial
        if (item.style.left.includes('-')) {
            item.style.transform = 'translateX(-100px)';
        } else {
            item.style.transform = 'translateX(100px)';
        }
        item.style.opacity = '0';
        item.style.transition = 'all 0.8s ease';
    });
}

// Efecto de celebración al hacer clic en timeline
function createCelebrationEffect(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        const angle = (i / 15) * 2 * Math.PI;
        const velocity = 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(heart);
        
        let opacity = 1;
        let x = 0;
        let y = 0;
        
        const animate = () => {
            x += vx * 0.02;
            y += vy * 0.02 + 2; // gravedad
            opacity -= 0.02;
            
            heart.style.transform = `translate(${x}px, ${y}px)`;
            heart.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Interacciones mejoradas para las fotos
function addPhotoInteractions() {
    const photoCards = document.querySelectorAll('.photo-card');
    
    photoCards.forEach((card, index) => {
        // Efecto de entrada con delay
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
        
        // Estado inicial
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease';
        
        // Efecto al hacer clic
        card.addEventListener('click', () => {
            card.style.transform = 'scale(1.05) rotate(1deg)';
            
            // Crear corazones flotantes
            createFloatingHearts(card);
            
            setTimeout(() => {
                card.style.transform = '';
            }, 300);
        });
        
        // Observador para animaciones cuando está visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Efecto de brillo ocasional
                    setInterval(() => {
                        if (Math.random() < 0.1) {
                            entry.target.style.boxShadow = '0 0 40px rgba(255, 107, 107, 0.8)';
                            setTimeout(() => {
                                entry.target.style.boxShadow = '';
                            }, 1000);
                        }
                    }, 5000);
                }
            });
        });
        
        observer.observe(card);
    });
}

// Crear corazones flotantes desde una foto
function createFloatingHearts(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = ['💕', '💖', '💗', '💝'][Math.floor(Math.random() * 4)];
        heart.style.position = 'fixed';
        heart.style.left = (rect.left + Math.random() * rect.width) + 'px';
        heart.style.top = (rect.top + Math.random() * rect.height) + 'px';
        heart.style.fontSize = '25px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        
        document.body.appendChild(heart);
        
        let y = 0;
        let opacity = 1;
        
        const animate = () => {
            y -= 3;
            opacity -= 0.02;
            
            heart.style.transform = `translateY(${y}px) rotate(${y}deg)`;
            heart.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }
}

// Efecto de escritura para el poema final
function initializeFinalPoem() {
    const finalPoem = document.querySelector('.poem-content');
    const text = finalPoem.innerHTML;
    
    finalPoem.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                let tag = '';
                while (text.charAt(i) !== '>') {
                    tag += text.charAt(i);
                    i++;
                }
                tag += text.charAt(i);
                finalPoem.innerHTML += tag;
                i++;
            } else {
                finalPoem.innerHTML += text.charAt(i);
                i++;
            }
            setTimeout(typeWriter, 50);
        }
    };
    
    // Observador para iniciar cuando sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(finalPoem);
}

// Efectos especiales para días especiales
function checkSpecialDates() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    
    // Día 12 de cada mes (aniversario mensual)
    if (day === 12) {
        createSpecialCelebration();
    }
    
    // Efectos adicionales en fechas especiales
    const specialDates = [
        { month: 2, day: 14 }, // San Valentín
        { month: 12, day: 25 }, // Navidad
        // Agrega más fechas especiales
    ];
    
    specialDates.forEach(date => {
        if (month === date.month && day === date.day) {
            createSpecialCelebration();
        }
    });
}

// Celebración especial
function createSpecialCelebration() {
    const body = document.body;
    body.style.background = 'linear-gradient(45deg, #ff6b6b, #f8a5c2, #ff6b6b)';
    
    // Lluvia de corazones
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '-50px';
            heart.style.fontSize = '30px';
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            
            document.body.appendChild(heart);
            
            let y = -50;
            const animate = () => {
                y += 5;
                heart.style.top = y + 'px';
                
                if (y < window.innerHeight + 50) {
                    requestAnimationFrame(animate);
                } else {
                    heart.remove();
                }
            };
            
            animate();
        }, i * 200);
    }
    
    // Restaurar fondo después de 10 segundos
    setTimeout(() => {
        body.style.background = '';
    }, 10000);
}

// Música de fondo (opcional)
function initializeMusic() {
    // Solo si el usuario quiere música
    const playButton = document.createElement('button');
    playButton.innerHTML = '🎵';
    playButton.style.position = 'fixed';
    playButton.style.top = '20px';
    playButton.style.right = '20px';
    playButton.style.background = 'rgba(255, 107, 107, 0.8)';
    playButton.style.border = 'none';
    playButton.style.borderRadius = '50%';
    playButton.style.width = '50px';
    playButton.style.height = '50px';
    playButton.style.fontSize = '20px';
    playButton.style.cursor = 'pointer';
    playButton.style.zIndex = '1000';
    
    document.body.appendChild(playButton);
    
    playButton.addEventListener('click', () => {
        // Aquí podrías agregar música de fondo
        alert('¡Música romántica activada en tu corazón! 💕');
    });
}

// Inicializar efectos adicionales después de la carga
setTimeout(() => {
    initializeFinalPoem();
    checkSpecialDates();
    initializeMusic();
}, 2000);

// Efectos de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});