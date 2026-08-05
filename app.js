document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Theme Switcher Logic
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check localStorage for theme preference or default to system theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        htmlElement.setAttribute('data-theme', systemPrefersDark ? 'dark' : 'light');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ==========================================
    // Media Lightbox Modal Logic
    // ==========================================
    const modal = document.getElementById('media-modal');
    const modalBody = document.getElementById('modal-body-content');
    const modalTitle = document.getElementById('modal-title');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalBackdrop = modal.querySelector('.modal-backdrop');
    const viewButtons = document.querySelectorAll('.view-media-btn');

    // Open Modal
    const openModal = (type, src, title) => {
        // Clear previous content
        modalBody.innerHTML = '';
        
        // Update Title
        modalTitle.textContent = title || 'View Document';

        if (type === 'pdf') {
            // Create PDF view frame
            const iframe = document.createElement('iframe');
            // Adding url query #toolbar=0 can hide default browser pdf toolbar if desired, 
            // but standard view is generally better to allow user page jumps/zooms.
            iframe.src = src; 
            iframe.title = title || 'PDF Viewer';
            modalBody.appendChild(iframe);
        } else if (type === 'image') {
            // Create image view
            const img = document.createElement('img');
            img.src = src;
            img.alt = title || 'Portfolio Showcase';
            modalBody.appendChild(img);
        }

        // Show Modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Close Modal
    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Restore body scroll

        // Wait for CSS transition (300ms) then clear content
        setTimeout(() => {
            modalBody.innerHTML = '';
        }, 300);
    };

    // Attach Click Events to view buttons
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-type');
            const src = button.getAttribute('data-src');
            const title = button.getAttribute('data-title');
            openModal(type, src, title);
        });
    });

    // Close on Click Close Button
    modalCloseBtn.addEventListener('click', closeModal);

    // Close on Click Backdrop
    modalBackdrop.addEventListener('click', closeModal);

    // Close on Escape Key Press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});
