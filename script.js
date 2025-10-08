let effectsInterval = null; // Para controlar el intervalo de efectos

// Array de textos para cada carta (sin saltos de línea ni espacios extra)
const letterContents = [
    `Querida persona especial,<br>Quería decirte que eres la luz que ilumina mis días y el motivo de mis sonrisas.<br>Gracias por estar siempre a mi lado.<br>Te quiero mucho.`,
    `Hola!<br>Esta carta es solo para recordarte lo increíble que eres.<br>Nunca olvides tu valor.<br>Te admiro mucho.`,
    `¡Sorpresa!<br>Espero que este pequeño detalle te saque una sonrisa.<br>Siempre pienso en ti.<br>Un abrazo enorme.`
];

// Máquina de escribir para HTML (robusta, respeta tags y no mezcla texto)
function typeWriterHTML(element, html) {
    element.innerHTML = '';
    element.style.opacity = '1';
    let i = 0;
    function write() {
        if (i < html.length) {
            if (html[i] === '<') {
                // Escribir el tag completo de golpe
                let close = html.indexOf('>', i);
                if (close !== -1) {
                    element.innerHTML += html.slice(i, close + 1);
                    i = close + 1;
                } else {
                    // Si no encuentra cierre, escribe el carácter
                    element.innerHTML += html[i];
                    i++;
                }
            } else {
                // Escribir solo el carácter
                element.innerHTML += html[i];
                i++;
            }
            setTimeout(write, 40);
        }
    }
    write();
}

// Revelar texto letra por letra (solo texto, para bienvenida)
function typeWriterText(element, callback) {
    const fullText = element.textContent;
    element.textContent = '';
    let i = 0;
    function write() {
        if (i < fullText.length) {
            element.textContent += fullText.charAt(i);
            i++;
            setTimeout(write, 50);
        } else if (callback) {
            callback();
        }
    }
    write();
}

// Generar efectos románticos (corazones y pétalos) - LIMITADO A 5 SEGUNDOS
function generateRomanticEffects() {
    const heartsContainer = document.getElementById('hearts-container');
    const petalsContainer = document.getElementById('petals-container');
    if (!heartsContainer || !petalsContainer) return;

    // Generación inicial: Estallido de 20 efectos
    const numInitialEffects = 20;
    for (let i = 0; i < numInitialEffects; i++) {
        setTimeout(() => {
            createRomanticEffect(heartsContainer, petalsContainer);
        }, i * 150); // Espaciados para fluidez
    }

    // Iniciar generación continua CADA 2 SEGUNDOS, pero solo por 5s totales
    effectsInterval = setInterval(() => {
        createRomanticEffect(heartsContainer, petalsContainer);
    }, 2000); // Cada 2s para más dinamismo

    // DETENER después de 5 segundos
    setTimeout(() => {
        if (effectsInterval) {
            clearInterval(effectsInterval);
            effectsInterval = null;
            console.log('Efectos detenidos después de 5s.');
        }
    }, 5000); // 5 segundos desde el inicio de efectos
}

// Función auxiliar para crear un efecto individual (corazón o pétalo)
function createRomanticEffect(heartsContainer, petalsContainer) {
    // Corazón (70% probabilidad)
    if (Math.random() > 0.3) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        heart.style.animationDelay = Math.random() * 1 + 's';
        heartsContainer.appendChild(heart);
        setTimeout(() => heart.remove(), 7000); // Limpia después de animación
    }
    // Pétalo (30% probabilidad)
    else {
        const petal = document.createElement('div');
        petal.innerHTML = '🌹';
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (Math.random() * 4 + 3) + 's';
        petal.style.animationDelay = Math.random() * 1 + 's';
        petalsContainer.appendChild(petal);
        setTimeout(() => petal.remove(), 7000);
    }
}

// Event listeners para clicks (se ejecuta al cargar la página)
document.addEventListener('DOMContentLoaded', function() {
    const welcome = document.getElementById('welcome-message');
    const envelopesList = document.getElementById('envelopes-list');
    const openLetterDiv = document.getElementById('open-letter');
    const letterText = document.getElementById('letter-text');
    const backBtn = document.getElementById('back-btn');
    const qrBelow = document.getElementById('qr-below-envelopes');

    // Mensaje de bienvenida y sobres
    if (welcome && envelopesList) {
        envelopesList.style.display = 'none';
        if (qrBelow) qrBelow.style.display = 'none';
        typeWriterText(welcome, () => {
            setTimeout(() => {
                welcome.classList.add('fade-out');
                setTimeout(() => {
                    welcome.style.display = 'none';
                    envelopesList.style.display = 'flex';
                    if (qrBelow) qrBelow.style.display = 'block';
                }, 1200);
            }, 1200);
        });
    }

    // Abrir carta al hacer click en cualquier sello
    for (let i = 0; i < letterContents.length; i++) {
        const seal = document.getElementById('seal-' + i);
        if (seal) {
            seal.addEventListener('click', function() {
                envelopesList.style.display = 'none';
                if (qrBelow) qrBelow.style.display = 'none';
                openLetterDiv.classList.remove('hidden');
                typeWriterHTML(letterText, letterContents[i]);
                generateRomanticEffects();
            });
        }
    }

    // Volver a los sobres
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            openLetterDiv.classList.add('hidden');
            envelopesList.style.display = 'flex';
            if (qrBelow) qrBelow.style.display = 'block';
        });
    }
});