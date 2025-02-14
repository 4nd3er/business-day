let scrollPosition = 0;
const container = document.querySelector(".container");
const character = document.querySelector(".character");
let sectionWidth = window.innerWidth;
let eventDeltaY = 0;
let lastScrollTime = 0;
let intervalScroll;
let animationSection;
let stations = [];

const positionCharacter = (relativePosition) => {
    if (relativePosition >= 0.07 && relativePosition < 0.10) {
        animationSection.classList.add("animation");
        setTimeout(() => {
            animationSection.classList.add("ocultar");
        }, 900);
    } else if (relativePosition >= 0.04907562917231037 && relativePosition < 0.05907562917231037) {
        stations.forEach((station, index) => {
            setTimeout(() => {
                station.style.bottom = "13rem";
            }, index * 150);
        })
    } else if (relativePosition < 0.7661505013801799) {
        character.style.bottom = "22%";
    } else if (relativePosition >= 0.7661505013801799 && relativePosition < 0.7745256163951745) {
        character.style.bottom = "17.2%";
    } else if (relativePosition >= 0.7745256163951745 && relativePosition < 0.8239040561954744) {
        character.style.bottom = "11%";
    } else if (relativePosition >= 0.8239040561954744 && relativePosition < 0.895877883894493) {
        character.style.bottom = "21.5%";
    } else if (relativePosition >= 0.895877883894493) {
        character.style.bottom = "11%";
    }
};

for (let i = 1; i <= 15; i++) {
    const div = document.createElement("div");
    div.classList.add("section");
    div.classList.add(`section-${i}`);
    if (i === 13 || i === 14 || i === 15) {
        div.classList.add("piso");
    }
    else if (i === 12) {
        div.classList.add("escaleras");
    } else if (i >= 2) {
        div.classList.add("sendero");
    }
    if (i >= 8 && i < 11) {
        for (let j = 3; j < 10; j++) {
            const div = document.createElement("div");
            div.classList.add("sendero");
            div.style = `
                min-width: calc(1920px / 3);
                height: 100vh;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                background: url(/img/N${j}.png);
                background-size: 100% 100%;
                background-position: center;
                background-repeat: no-repeat;
                overflow: visible;
            `;
            container.appendChild(div);
        }
    }
    div.style = `
    min-width: calc(1920px / 3);
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(/img/N${i}.png);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    overflow: visible;
    `;
    container.appendChild(div);
    animationSection = document.querySelector(".section-2");
}

for (i = 1; i < 150; i++) {
    const div = document.createElement("div");
    div.classList.add("stations");
    div.style = `
    min-width: calc(1920px / 3);
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(/img/stations/N-${i}.png);
    background-size: 8rem 10rem;
    background-position: bottom;
    background-repeat: no-repeat;
    overflow: visible;
    left: calc(52rem + ${i * 8}rem);
    bottom: 0%;
    `;
    container.appendChild(div);
    stations = document.querySelectorAll(".stations");
}

window.addEventListener("touchstart", (event) => {
    const currentScroll = container.scrollLeft; // Scroll horizontal dentro del contenedor
    const containerWidth = container.offsetWidth; // Ancho visible del contenedor
    const totalWidth = container.scrollWidth; // Ancho total del contenido del contenedor

    const relativePosition = currentScroll / (totalWidth - containerWidth);

    positionCharacter(relativePosition);

    character.style.animation = "walk 0.7s steps(4) infinite";
    lastScroll = event.touches[0].clientX.toFixed(0);
});

window.addEventListener("touchmove", (event) => {
    const currentScroll = container.scrollLeft; // Scroll horizontal dentro del contenedor
    const containerWidth = container.offsetWidth; // Ancho visible del contenedor
    const totalWidth = container.scrollWidth; // Ancho total del contenido del contenedor

    const relativePosition = currentScroll / (totalWidth - containerWidth);

    positionCharacter(relativePosition);

    // Mostrar la posición relativa en la consola
    console.log(relativePosition);

    // Determinar la dirección del movimiento
    if (lastScroll < event.touches[0].clientX.toFixed(0)) {
        character.style.transform = 'scaleX(-1) translateX(-1rem)';
    } else if (lastScroll > event.touches[0].clientX.toFixed(0)) {
        character.style.transform = 'scaleX(1) translateX(0)';
    }
    lastScroll = event.touches[0].clientX.toFixed(0);
});

window.addEventListener("touchend", () => {
    const currentScroll = container.scrollLeft; // Scroll horizontal dentro del contenedor
    const containerWidth = container.offsetWidth; // Ancho visible del contenedor
    const totalWidth = container.scrollWidth; // Ancho total del contenido del contenedor
    const relativePosition = currentScroll / (totalWidth - containerWidth);

    isScrolling = false;
    character.style.animation = "none";

    positionCharacter(relativePosition);
});

window.addEventListener("resize", () => {
    sectionWidth = window.innerWidth;
    // Calcular la nueva posición de desplazamiento
    scrollPosition += eventDeltaY * 0.7; // Ajustar sensibilidad
    scrollPosition = Math.max(0, Math.min(scrollPosition, sectionWidth * 3));

    // Mover solo el fondo (no el personaje)
    container.style.transform = `translateX(-${scrollPosition}px)`;
})

window.addEventListener("wheel", (event) => {
    const now = Date.now();
    if (now - lastScrollTime < 1) return; // Evita movimientos rápidos
    lastScrollTime = now;

    // Calcular la nueva posición de desplazamiento
    scrollPosition += event.deltaY * 0.7; // Ajustar sensibilidad
    scrollPosition = Math.max(0, Math.min(scrollPosition, sectionWidth / 3));
    // Mover solo el fondo (no el personaje)
    container.style.transform = `translateX(-${scrollPosition}px)`;

    if (scrollPosition > ((container.clientWidth / 4) * 3) - 200) {
        character.style.bottom = "15%";
    } else {
        character.style.bottom = "22%";
    }

    eventDeltaY = event.deltaY;
    event.deltaY > 0 ? character.style.transform = 'scaleX(1)' : character.style.transform = 'scaleX(-1)';

    // Activar la animación de caminata cuando hay movimiento
    character.style.animation = "walk 0.7s steps(4) infinite";

    clearInterval(intervalScroll);

    intervalScroll = setInterval(() => {
        character.style.animation = "none"
    }, 700);
});


// Cambia la opacidad de las secciones según la posición
/*function updateSectionEffect(position) {
    const sections = document.querySelectorAll(".section");

    sections.forEach((section, index) => {
        const sectionStart = index * sectionWidth;
        const sectionEnd = sectionStart + sectionWidth;

        if (position >= sectionStart && position < sectionEnd) {
            section.style.opacity = "1";
        } else {
            section.style.opacity = "0.6";
        }
    });
}
*/