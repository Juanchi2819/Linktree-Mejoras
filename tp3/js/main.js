document.addEventListener('DOMContentLoaded', () => {

    const themeHandler = () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const sunIcon = document.getElementById('theme-icon-sun');
        const moonIcon = document.getElementById('theme-icon-moon');

        const applyTheme = (theme) => {
            if (theme === 'light') {
                document.body.classList.add('light-mode');
                if (sunIcon) sunIcon.style.display = 'none';
                if (moonIcon) moonIcon.style.display = 'block';
            } else {
                document.body.classList.remove('light-mode');
                if (sunIcon) sunIcon.style.display = 'block';
                if (moonIcon) moonIcon.style.display = 'none';
            }
        };

        const currentTheme = localStorage.getItem('theme') || 'dark';
        applyTheme(currentTheme);

        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    };

    const backToTopHandler = () => {
        const backToTopButton = document.getElementById('back-to-top');
        if (!backToTopButton) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };

    const scrollAnimationHandler = () => {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (animatedElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    };
    
    const smoothScrollHandler = () => {
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    const headerScrollHandler = () => {
        const header = document.querySelector('header');
        if (!header) return;
        
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (window.innerWidth > 767) {
                if (window.scrollY > header.offsetHeight) {
                    if (lastScrollY < window.scrollY) {
                        header.classList.add('header-hidden');
                    } else {
                        header.classList.remove('header-hidden');
                    }
                } else {
                    header.classList.remove('header-hidden');
                }
            } else {
                header.classList.remove('header-hidden');
            }
            lastScrollY = window.scrollY;
        });
    };

    themeHandler();
    backToTopHandler();
    scrollAnimationHandler();
    smoothScrollHandler();
    headerScrollHandler();
});