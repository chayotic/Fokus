document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupRippleEffects();
    setupPopupCards();
});

// Theme Toggle Functionality
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (localStorage.getItem('theme') === 'light' || (!localStorage.getItem('theme') && !prefersDark)) {
        document.body.classList.add('light-mode');
        themeToggle.textContent = 'light_mode';
    } else {
        document.body.classList.remove('light-mode');
        themeToggle.textContent = 'dark_mode';
    }
    
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-mode');
        themeToggle.textContent = isLight ? 'light_mode' : 'dark_mode';
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
}

// Ripple Effect Functionality
function setupRippleEffects() {
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.set-btn')) return;
            
            e.stopPropagation();
            let ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const isLightMode = document.body.classList.contains('light-mode');
            ripple.style.background = isLightMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 0.5;
            const x = e.clientX - rect.left - (size / 2);
            const y = e.clientY - rect.top - (size / 2);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            this.appendChild(ripple);
            ripple.addEventListener("animationend", () => ripple.remove());
        });
    });
}

// Sidebar Functions
function openNav() {
    document.getElementById("mySidebar").classList.add("open");
}

function closeNav() {
    document.getElementById("mySidebar").classList.remove("open");
}

function toggleSocials() {
    const dropdown = document.getElementById("socials-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Popup Card Functionality
function setupPopupCards() {
    document.addEventListener('click', function(e) {
        // Handle set buttons in pyq_12.html
        const setBtn = e.target.closest('.set-btn');
        if (setBtn && setBtn.dataset.available === "false") {
            e.preventDefault();
            showPopup(setBtn);
            return;
        }
        
        // Handle chapter links in chapterwise_11.html
        const chapterLink = e.target.closest('.chapter-link');
        if (chapterLink && chapterLink.dataset.available === "false") {
            e.preventDefault();
            showPopup(chapterLink);
            return;
        }
    });
}

function showPopup(element) {
    const popup = document.getElementById('popup-card');
    const rect = element.getBoundingClientRect();
    
    popup.textContent = "Material not available";
    popup.style.top = `${rect.bottom + window.scrollY + 5}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.classList.remove('hidden');
    popup.classList.add('show');
    
    setTimeout(() => {
        popup.classList.remove('show');
        popup.classList.add('hidden');
    }, 2000);
}

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('mySidebar');
    const menuIcon = document.querySelector('.menu-icon');
    const dropdown = document.getElementById('socials-dropdown');
    if (sidebar.classList.contains('open') && !e.target.closest('#mySidebar, .menu-icon, #socials-dropdown')) {
        closeNav();
        dropdown.style.display = "none";
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('mySidebar').classList.contains('open')) {
        closeNav();
    }
});
