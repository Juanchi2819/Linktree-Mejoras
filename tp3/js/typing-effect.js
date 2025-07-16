document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('.hero-name');
    const careerElement = document.querySelector('.hero-career');

    if (!nameElement || !careerElement) {
        return;
    }

    const nameText = nameElement.getAttribute('data-text');
    const careerText = careerElement.getAttribute('data-text');

    function typeEffect(element, text, callback) {
        let i = 0;
        element.innerHTML = "";
        element.style.borderRight = ".15em solid oklch(from var(--primary) l c h)";
        
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
                element.style.borderRight = "none";
                if (callback) {
                    setTimeout(callback, 500);
                }
            }
        }, 100);
    }

    function startTyping() {
        typeEffect(nameElement, nameText, () => {
            careerElement.style.visibility = 'visible';
            typeEffect(careerElement, careerText, () => {
                careerElement.style.borderRight = ".15em solid oklch(from var(--primary) l c h)";
                careerElement.style.animation = "blink-caret .75s step-end infinite";
            });
        });
    }
    
    setTimeout(startTyping, 500);
});
