// Portfolio JavaScript Functionality with EmailJS Integration and Resume Download

class Portfolio {
    constructor() {
        this.emailJSConfig = {
            // SETUP INSTRUCTIONS FOR USER:
            // 1. Go to https://www.emailjs.com/ and create a free account
            // 2. Create an email service (Gmail, Outlook, etc.)
            // 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
            // 4. Replace the values below with your actual EmailJS credentials:
            serviceId: 'YOUR_SERVICE_ID',        // Replace with your EmailJS service ID
            templateId: 'YOUR_TEMPLATE_ID',      // Replace with your EmailJS template ID
            publicKey: 'YOUR_PUBLIC_KEY'         // Replace with your EmailJS public key
        };
        
        this.resumeData = {
            name: "SHIVAM VERMA",
            education: "B.Tech Computer Science and Engineering | GNIOT, Greater Noida",
            contact: {
                email: "vermamavish12035@gmail.com",
                phone: "+91-9219056049",
                github: "github.com/Shivam-avish235",
                linkedin: "linkedin.com/in/shivam-avish235"
            },
            objective: "Passionate 3rd-year B.Tech CSE student with strong foundations in C++ (DSA), Web Development (MERN), and Machine Learning. Seeking opportunities to apply technical expertise and build scalable, real-world solutions in AI, Blockchain, and Full-Stack Development.",
            technicalSkills: {
                Programming: "C++, C, Python, Java (Basics), JavaScript",
                "Web Development": "HTML5, CSS3, React.js, Tailwind CSS, Node.js, Express.js, MongoDB",
                "AI/ML": "NumPy, Pandas, Scikit-learn, Matplotlib, XGBoost, Random Forest, Flask",
                "Tools & Platforms": "Git, GitHub, VS Code, Linux, SDL (C++)",
                "Core Concepts": "Data Structures & Algorithms, OOPs, DBMS, Operating Systems, Blockchain (SHA-256, PoW basics)"
            },
            projects: [
                {
                    title: "Employee Productivity Prediction (ML Project)",
                    description: "Built a Flask app to predict garment worker productivity using ML models with preprocessing, feature engineering, and visualization"
                },
                {
                    title: "Bitcoin Mining Simulator with AI Insights (Ongoing)",
                    description: "MERN + Python project simulating blockchain Proof-of-Work using SHA-256, with AI models predicting mining time & difficulty"
                },
                {
                    title: "Disaster Management System (Hackathon Project)",
                    description: "Built real-time rescue coordination app using React.js & Tailwind CSS with interactive disaster mapping."
                }
            ],
            internships: [
                {
                    title: "Virtual Internship – Machine Learning Engineer",
                    organization: "SmartBridge & SmartInternz",
                    duration: "Jun–Aug 2025",
                    description: "Worked on Employee Productivity Prediction project using ML models (Linear Regression, Random Forest, XGBoost) and deployed via Flask."
                },
                {
                    title: "Student Development Program – C Programming",
                    organization: "IFACET IIT Kanpur",
                    duration: "Sept 2024 – Jan 2025",
                    description: "Completed certified training on C programming fundamentals and problem solving."
                }
            ],
            achievements: [
                "Semi-finalist — Vyto Hack Clash Hackathon",
                "Semi-finalist — Yukti Hackathon (GNIOT)",
                "Completed IIT Kanpur Certified Program in C Programming",
                "Completed ML Virtual Internship (SmartInternz)"
            ],
            education_details: [
                "B.Tech (CSE) — Greater Noida Institute of Technology (AKTU) | 2023–2027",
                "12th — Saraswati Vidya Mandir, 2023",
                "10th — Saraswati Vidya Mandir, 2021"
            ],
            strengths: "Problem Solving | Quick Learner | Teamwork | Communication | Adaptability"
        };
        
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEmailJS();
            this.setupLoader();
            this.setupNavigation();
            this.setupTypingAnimation();
            this.setupParticles();
            this.setupScrollAnimations();
            this.setupSkillBars();
            this.setupStatCounters();
            this.setupScrollToTop();
            this.setupContactForm();
            this.setupResumeDownload();
            this.setupMobileMenu();
            this.setupSmoothScrolling();
            this.setupMouseEffects();
            this.setupKeyboardNavigation();
            this.setupModalFunctionality();
        });
    }

    // EmailJS Setup
    setupEmailJS() {
        // Initialize EmailJS with public key
        if (typeof emailjs !== 'undefined') {
            try {
                emailjs.init(this.emailJSConfig.publicKey);
                console.log('EmailJS initialized successfully');
            } catch (error) {
                console.warn('EmailJS initialization failed:', error);
                this.showNotification('Email service configuration needed. Please check setup instructions in app.js', 'warning');
            }
        } else {
            console.warn('EmailJS library not loaded');
        }
    }

    // Resume PDF Generation and Download
    setupResumeDownload() {
        const downloadBtns = document.querySelectorAll('#downloadResumeBtn, #downloadResumeBtn2');
        
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.generateAndDownloadResume();
            });
        });
    }

    generateAndDownloadResume() {
        try {
            // Create resume content
            const resumeContent = this.generateResumeHTML();
            
            // Create a new window for printing/PDF generation
            const printWindow = window.open('', '_blank');
            
            if (!printWindow) {
                throw new Error('Popup blocked - please allow popups for this site');
            }
            
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Shivam_Verma_Resume</title>
                    <style>
                        ${this.getResumeCSS()}
                    </style>
                </head>
                <body>
                    ${resumeContent}
                </body>
                </html>
            `);
            
            printWindow.document.close();
            
            // Wait for content to load, then trigger print dialog
            printWindow.onload = () => {
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 500);
            };
            
            this.showNotification('Resume download initiated. Please save as PDF when the print dialog opens.', 'success');
            
        } catch (error) {
            console.error('Resume download error:', error);
            this.showNotification('Resume download failed. Please try again or contact me directly.', 'error');
            
            // Fallback: Create a text version
            this.downloadTextResume();
        }
    }

    generateResumeHTML() {
        return `
            <div class="resume-document">
                <header class="resume-header">
                    <h1>${this.resumeData.name}</h1>
                    <p class="subtitle">${this.resumeData.education}</p>
                    <div class="contact-info">
                        <div class="contact-row">
                            <span>📧 ${this.resumeData.contact.email}</span>
                            <span>📱 ${this.resumeData.contact.phone}</span>
                        </div>
                        <div class="contact-row">
                            <span>🔗 ${this.resumeData.contact.github}</span>
                            <span>💼 ${this.resumeData.contact.linkedin}</span>
                        </div>
                    </div>
                </header>

                <section class="resume-section">
                    <h2>OBJECTIVE</h2>
                    <p>${this.resumeData.objective}</p>
                </section>

                <section class="resume-section">
                    <h2>TECHNICAL SKILLS</h2>
                    ${Object.entries(this.resumeData.technicalSkills).map(([category, skills]) => 
                        `<div class="skill-category">
                            <strong>${category}:</strong> ${skills}
                        </div>`
                    ).join('')}
                </section>

                <section class="resume-section">
                    <h2>INTERNSHIPS & CERTIFICATIONS</h2>
                    ${this.resumeData.internships.map(internship => 
                        `<div class="experience-item">
                            <div class="experience-header">
                                <h3>${internship.title}</h3>
                                <span class="duration">${internship.duration}</span>
                            </div>
                            <div class="organization">${internship.organization}</div>
                            <p>${internship.description}</p>
                        </div>`
                    ).join('')}
                </section>

                <section class="resume-section">
                    <h2>KEY PROJECTS</h2>
                    ${this.resumeData.projects.map(project => 
                        `<div class="project-item">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                        </div>`
                    ).join('')}
                </section>

                <section class="resume-section">
                    <h2>ACHIEVEMENTS</h2>
                    <ul>
                        ${this.resumeData.achievements.map(achievement => 
                            `<li>${achievement}</li>`
                        ).join('')}
                    </ul>
                </section>

                <section class="resume-section">
                    <h2>EDUCATION</h2>
                    <ul>
                        ${this.resumeData.education_details.map(edu => 
                            `<li>${edu}</li>`
                        ).join('')}
                    </ul>
                </section>

                <section class="resume-section">
                    <h2>CORE STRENGTHS</h2>
                    <p>${this.resumeData.strengths}</p>
                </section>
            </div>
        `;
    }

    getResumeCSS() {
        return `
            @page { 
                margin: 0.5in; 
                size: A4;
            }
            
            body {
                font-family: 'Arial', 'Helvetica', sans-serif;
                line-height: 1.4;
                color: #333;
                max-width: 8.5in;
                margin: 0 auto;
                padding: 0;
                font-size: 11pt;
            }
            
            .resume-document {
                background: white;
                padding: 20px;
            }
            
            .resume-header {
                text-align: center;
                border-bottom: 2px solid #007acc;
                padding-bottom: 15px;
                margin-bottom: 20px;
            }
            
            .resume-header h1 {
                font-size: 24pt;
                font-weight: bold;
                color: #007acc;
                margin: 0 0 5px 0;
                letter-spacing: 1px;
            }
            
            .subtitle {
                font-size: 12pt;
                color: #666;
                margin: 5px 0 10px 0;
                font-style: italic;
            }
            
            .contact-info {
                font-size: 10pt;
                color: #555;
            }
            
            .contact-row {
                display: flex;
                justify-content: space-between;
                margin: 3px 0;
                flex-wrap: wrap;
            }
            
            .contact-row span {
                margin: 0 10px;
            }
            
            .resume-section {
                margin-bottom: 18px;
                page-break-inside: avoid;
            }
            
            .resume-section h2 {
                font-size: 14pt;
                font-weight: bold;
                color: #007acc;
                border-bottom: 1px solid #007acc;
                padding-bottom: 3px;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .resume-section p {
                margin: 8px 0;
                text-align: justify;
            }
            
            .skill-category {
                margin-bottom: 6px;
                line-height: 1.3;
            }
            
            .skill-category strong {
                color: #007acc;
                font-weight: bold;
            }
            
            .experience-item, .project-item {
                margin-bottom: 12px;
                page-break-inside: avoid;
            }
            
            .experience-header {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
                margin-bottom: 3px;
            }
            
            .experience-item h3, .project-item h3 {
                font-size: 12pt;
                font-weight: bold;
                color: #333;
                margin: 0;
            }
            
            .duration {
                font-size: 10pt;
                color: #666;
                font-style: italic;
            }
            
            .organization {
                font-size: 11pt;
                color: #007acc;
                font-weight: 500;
                margin-bottom: 5px;
            }
            
            ul {
                padding-left: 20px;
                margin: 8px 0;
            }
            
            li {
                margin-bottom: 3px;
                line-height: 1.3;
            }
            
            @media print {
                body { 
                    margin: 0; 
                    padding: 0;
                }
                .resume-document {
                    box-shadow: none;
                    margin: 0;
                    padding: 15px;
                }
                .contact-row {
                    justify-content: center;
                    gap: 20px;
                }
            }
        `;
    }

    downloadTextResume() {
        const textContent = this.generateTextResume();
        const blob = new Blob([textContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Shivam_Verma_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    generateTextResume() {
        return `
SHIVAM VERMA
B.Tech Computer Science and Engineering | GNIOT, Greater Noida

Contact Information:
Email: ${this.resumeData.contact.email}
Phone: ${this.resumeData.contact.phone}
GitHub: ${this.resumeData.contact.github}
LinkedIn: ${this.resumeData.contact.linkedin}

OBJECTIVE:
${this.resumeData.objective}

TECHNICAL SKILLS:
${Object.entries(this.resumeData.technicalSkills).map(([category, skills]) => 
    `${category}: ${skills}`
).join('\n')}

INTERNSHIPS & CERTIFICATIONS:
${this.resumeData.internships.map(internship => 
    `${internship.title} | ${internship.organization} | ${internship.duration}
${internship.description}`
).join('\n\n')}

KEY PROJECTS:
${this.resumeData.projects.map(project => 
    `${project.title}
${project.description}`
).join('\n\n')}

ACHIEVEMENTS:
${this.resumeData.achievements.map(achievement => `• ${achievement}`).join('\n')}

EDUCATION:
${this.resumeData.education_details.map(edu => `• ${edu}`).join('\n')}

CORE STRENGTHS:
${this.resumeData.strengths}
        `.trim();
    }

    // Enhanced Contact Form with EmailJS
    setupContactForm() {
        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                from_name: formData.get('from_name').trim(),
                from_email: formData.get('from_email').trim(),
                subject: formData.get('subject').trim(),
                message: formData.get('message').trim()
            };

            // Validation
            const validation = this.validateContactForm(data);
            if (!validation.isValid) {
                this.showNotification(validation.message, 'error');
                return;
            }

            // Show loading state
            this.setButtonLoading(submitBtn, true);

            try {
                // Check if EmailJS is properly configured
                if (this.emailJSConfig.serviceId === 'YOUR_SERVICE_ID' || 
                    this.emailJSConfig.templateId === 'YOUR_TEMPLATE_ID' || 
                    this.emailJSConfig.publicKey === 'YOUR_PUBLIC_KEY') {
                    
                    // Simulate successful submission for demo
                    await this.simulateEmailSubmission(data);
                } else {
                    // Attempt real EmailJS submission
                    await this.sendEmailViaEmailJS(data);
                }
                
                // Success handling
                form.reset();
                this.showSuccessModal();
                this.showNotification('Message sent successfully! I\'ll get back to you within 24 hours.', 'success');
                
            } catch (error) {
                console.error('Contact form error:', error);
                this.showNotification('Failed to send message. Please try again or contact me directly.', 'error');
            } finally {
                this.setButtonLoading(submitBtn, false);
            }
        });
    }

    validateContactForm(data) {
        if (!data.from_name) {
            return { isValid: false, message: 'Please enter your name.' };
        }
        
        if (!data.from_email) {
            return { isValid: false, message: 'Please enter your email address.' };
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.from_email)) {
            return { isValid: false, message: 'Please enter a valid email address.' };
        }
        
        if (!data.subject) {
            return { isValid: false, message: 'Please enter a subject.' };
        }
        
        if (!data.message) {
            return { isValid: false, message: 'Please enter your message.' };
        }
        
        if (data.message.length < 10) {
            return { isValid: false, message: 'Message must be at least 10 characters long.' };
        }
        
        return { isValid: true };
    }

    async sendEmailViaEmailJS(data) {
        if (typeof emailjs === 'undefined') {
            throw new Error('EmailJS not available');
        }

        const templateParams = {
            from_name: data.from_name,
            from_email: data.from_email,
            subject: data.subject,
            message: data.message,
            to_email: 'vermamavish12035@gmail.com'
        };

        const response = await emailjs.send(
            this.emailJSConfig.serviceId,
            this.emailJSConfig.templateId,
            templateParams
        );

        if (response.status !== 200) {
            throw new Error('EmailJS submission failed');
        }

        return response;
    }

    async simulateEmailSubmission(data) {
        // Simulate API call delay for demo purposes
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Demo: Email would be sent with data:', data);
                resolve({ status: 'success' });
            }, 2000);
        });
    }

    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.disabled = true;
            button.classList.add('loading');
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        } else {
            button.disabled = false;
            button.classList.remove('loading');
            button.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        }
    }

    // Modal Functionality
    setupModalFunctionality() {
        const modal = document.getElementById('successModal');
        const overlay = modal?.querySelector('.modal-overlay');
        
        // Close modal when clicking overlay
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeModal();
            });
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    showSuccessModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }
    }

    // Loading Screen
    setupLoader() {
        const loader = document.getElementById('loader');
        
        // Hide loader after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 1500);
        });
    }

    // Navigation
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Active navigation based on scroll position
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Typing Animation
    setupTypingAnimation() {
        const typingElement = document.getElementById('typing-text');
        const texts = [
            'C++ • MERN Stack • Machine Learning',
            'Problem Solver • Quick Learner',
            'Full-Stack Developer • ML Enthusiast',
            'Blockchain • AI • Web Development'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const typeWriter = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }

            setTimeout(typeWriter, typingSpeed);
        };

        typeWriter();
    }

    // Particle Animation
    setupParticles() {
        const particleContainer = document.getElementById('particles');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(0, 212, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
        `;

        const resetParticle = () => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particle.style.opacity = Math.random() * 0.8 + 0.2;
        };

        resetParticle();
        
        particle.style.animation = `floatUp ${particle.style.animationDuration} linear infinite`;
        
        container.appendChild(particle);

        // Add CSS animation
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes floatUp {
                    0% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        particle.addEventListener('animationend', resetParticle);
    }

    // Scroll Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe sections and cards
        const animatedElements = document.querySelectorAll(`
            .about-content,
            .skill-category,
            .project-card,
            .timeline-item,
            .achievement-card,
            .contact-content,
            .resume-content
        `);

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });

        // Side animations
        const leftElements = document.querySelectorAll('.about-text');
        const rightElements = document.querySelectorAll('.about-stats');

        leftElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(-50px)';
            observer.observe(el);
        });

        rightElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateX(50px)';
            observer.observe(el);
        });
    }

    // Skill Bars Animation
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 300);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Statistics Counter Animation
    setupStatCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.ceil(current);
                        }
                    }, 40);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => {
            countObserver.observe(stat);
        });
    }

    // Scroll to Top Button
    setupScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTop');
        
        // Show/hide scroll button based on scroll position
        const toggleScrollButton = () => {
            if (window.scrollY > 500) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        };

        // Add scroll event listener with throttling for performance
        window.addEventListener('scroll', this.throttle(toggleScrollButton, 100));

        // Scroll to top with smooth animation
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Smooth scroll to top
            const scrollToTop = () => {
                const currentScroll = window.scrollY;
                if (currentScroll > 0) {
                    window.requestAnimationFrame(scrollToTop);
                    window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 8)));
                }
            };
            
            scrollToTop();
        });
    }

    // Mobile Menu
    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'visible';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
        });
    }

    // Smooth Scrolling for Navigation Links
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for navbar height
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Enhanced Notification System
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close" onclick="this.parentElement.parentElement.remove()" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add notification styles if not exists
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--color-card-bg);
                    border: 1px solid var(--color-card-border);
                    border-radius: var(--radius-base);
                    padding: 16px 20px;
                    color: var(--color-white);
                    z-index: 10000;
                    transform: translateX(400px);
                    transition: all 0.3s ease;
                    box-shadow: var(--shadow-lg);
                    backdrop-filter: blur(10px);
                    max-width: 350px;
                    min-width: 280px;
                }
                
                .notification.show {
                    transform: translateX(0);
                }
                
                .notification--success {
                    border-left: 4px solid var(--color-accent-secondary);
                }
                
                .notification--error {
                    border-left: 4px solid #ff4757;
                }

                .notification--warning {
                    border-left: 4px solid #ffa502;
                }
                
                .notification--info {
                    border-left: 4px solid var(--color-accent);
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .notification-content i {
                    font-size: 18px;
                    flex-shrink: 0;
                }
                
                .notification--success .notification-content i {
                    color: var(--color-accent-secondary);
                }
                
                .notification--error .notification-content i {
                    color: #ff4757;
                }

                .notification--warning .notification-content i {
                    color: #ffa502;
                }
                
                .notification--info .notification-content i {
                    color: var(--color-accent);
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: var(--color-text-muted);
                    cursor: pointer;
                    padding: 4px;
                    margin-left: auto;
                    border-radius: 50%;
                    transition: all 0.2s ease;
                    flex-shrink: 0;
                }
                
                .notification-close:hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: var(--color-white);
                }
                
                @media (max-width: 480px) {
                    .notification {
                        right: 10px;
                        left: 10px;
                        max-width: none;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto-hide notification
        setTimeout(() => {
            if (notification && notification.parentElement) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification && notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }

    // Add mouse movement effects
    setupMouseEffects() {
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.project-card, .skill-category, .achievement-card');
            
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
                } else {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                }
            });
        });
    }

    // Keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key to close mobile menu and modals
            if (e.key === 'Escape') {
                const navToggle = document.getElementById('nav-toggle');
                const navMenu = document.getElementById('nav-menu');
                
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'visible';
                }
                
                // Close modal
                this.closeModal();
                
                // Also close notifications
                const notifications = document.querySelectorAll('.notification');
                notifications.forEach(notif => notif.remove());
            }
        });
    }

    // Performance optimization utilities
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Global function for modal close button
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }
}

// Initialize Portfolio
const portfolio = new Portfolio();

// Add additional event listeners for enhanced functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after initialization
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 2000);

    // Add focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );

    // Skip to main content functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-accent);
        color: var(--color-white);
        padding: 8px;
        border-radius: 4px;
        text-decoration: none;
        z-index: 10001;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main landmark
    const mainContent = document.querySelector('.hero');
    if (mainContent) {
        mainContent.setAttribute('id', 'main');
        mainContent.setAttribute('role', 'main');
    }

    // Enhanced error handling for images and external resources
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
        });
    });

    // Add intersection observer for performance
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('[data-lazy]');
        if (lazyElements.length > 0) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        // Lazy load functionality can be added here
                        lazyObserver.unobserve(element);
                    }
                });
            });

            lazyElements.forEach(el => lazyObserver.observe(el));
        }
    }
    
    // Add resize handler for responsive adjustments
    window.addEventListener('resize', portfolio.debounce(() => {
        // Handle responsive adjustments
        const navbar = document.getElementById('navbar');
        const navMenu = document.getElementById('nav-menu');
        
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    }, 250));

    // Welcome notification after page loads
    setTimeout(() => {
        portfolio.showNotification('Welcome to my portfolio! Click "Download Resume" to get my CV or use the contact form to reach out.', 'info');
    }, 3000);
});

// Add CSS animations and transitions
const style = document.createElement('style');
style.textContent = `
    .loading {
        overflow: hidden;
    }
    
    .skip-link:focus {
        top: 6px !important;
    }
    
    @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    .project-card,
    .skill-category,
    .achievement-card {
        transition: transform 0.3s ease;
    }
`;

document.head.appendChild(style);