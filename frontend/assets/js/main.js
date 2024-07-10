document.addEventListener("DOMContentLoaded", function() {

    const targetDate = new Date('2019-01-01');
    const currentDate = new Date();
    const timeDiff = currentDate - targetDate;
    const yearsDiff = Math.round(Math.floor(timeDiff / (1000 * 3600 * 24)) / 365);

    const text1 = `Over the last ${yearsDiff} years, I've worked on multiple data engineering, data science, 
    and machine learning problems in healthcare, financial technology, education technology, HR services, and energy.`;

    document.getElementById("intro-paragraph-1").textContent = text1;

    const text2 = `My roles have ranged from independent consultant to senior engineer at
     companies as small as a 25-person startup and large, well-established enterprises.
      I've contributed to customer-facing projects that generate millions in annual revenue,
       internal systems that save millions in monthly costs, and a fair share of failures.`;

    document.getElementById("intro-paragraph-2").textContent = text2;

    const text3 = `My philosophy towards data and machine learning problems is to start
     simple and layer on complexity as needed. I recognize the importance of robust data
      infrastructure as the foundation for any data project, prioritize delivering value
       over getting caught up in the hype, and strive to communicate clearly with technical
        and non-technical stakeholders.`

    document.getElementById("intro-paragraph-3").textContent = text3;


    const counterElement2 = document.getElementById('yearsExperienceCounter');
    counterElement2.setAttribute('data-purecounter-end', yearsDiff);

    document.querySelector('.php-email-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // Show loading message
        document.querySelector('.loading').style.display = 'block';
        document.querySelector('.error-message').style.display = 'none';
        document.querySelector('.sent-message').style.display = 'none';

        const email = document.querySelector('#email').value;
        const subject = document.querySelector('#subject').value;
        const name = document.querySelector('#name').value;
        const message = 'Name: ' + name + ' ' + document.querySelector('[name="message"]').value;

        const data = {
            receiver_email: email,
            subject: subject,
            body: message
        };

        console.log('Sending data:', data); // Log the data being sent

        fetch('https://portfolio-email-api-3i8k.onrender.com/send-email-to-self', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                console.log('Response status:', response.status); // Log the response status
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                document.querySelector('.loading').style.display = 'none';
                if (response.status == 200) {
                    document.querySelector('.sent-message').style.display = 'block';
                    document.querySelector('.error-message').style.display = 'none';
                } else {
                    document.querySelector('.error-message').style.display = 'block';
                    document.querySelector('.error-message').textContent = data.error || 'An error occurred. Please try again later.';
                    document.querySelector('.sent-message').style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Fetch error:', error); // Log any fetch errors
                document.querySelector('.loading').style.display = 'none';
                document.querySelector('.error-message').style.display = 'block';
                document.querySelector('.error-message').textContent = 'An error occurred. Please try again later.';
                document.querySelector('.sent-message').style.display = 'none';
            });
    });
});



(function() {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 16
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Intro type effect
     */
    const typed = select('.typed')
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

    /**
     * Initiate Pure Counter 
     */
    new PureCounter();

})()