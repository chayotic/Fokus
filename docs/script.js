document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    setupRippleEffects();
});

// Theme Toggle Functionality
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
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
        card.addEventListener('click', function (e) {
            // Prevent navigation if ripple is added
            e.stopPropagation();

            let ripple = document.createElement('span');
            ripple.classList.add('ripple');

            // Determine ripple color based on light/dark mode
            const isLightMode = document.body.classList.contains('light-mode');
            ripple.style.background = isLightMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)';

            // Calculate position & size
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 0.5;
            const x = e.clientX - rect.left - (size / 2);
            const y = e.clientY - rect.top - (size / 2);

            // Apply styles
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            // Remove ripple after animation ends
            ripple.addEventListener("animationend", () => ripple.remove());

            // Check if the clicked card is the Class 12 card and redirect after a short delay
            if (this.classList.contains('class-12-card')) {
                setTimeout(() => {
                    window.location.href = "class_12.html";
                }, 200); // Small delay to allow ripple effect to be visible
            }
        });
    });
}

// Sidebar Functions
// JavaScript to open and close the sidebar
function openNav() {
  document.getElementById("mySidebar").classList.add("open");
}

function closeNav() {
  document.getElementById("mySidebar").classList.remove("open");
}

// Socials dropdown toggle
function toggleSocials() {
    const dropdown = document.getElementById("socials-dropdown");
    dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
}

// Close sidebar when clicking outside or pressing Escape
document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('mySidebar');
    const menuIcon = document.querySelector('.menu-icon');
    const dropdown = document.getElementById('socials-dropdown');
    if (sidebar.classList.contains('open') && !e.target.closest('#mySidebar, .menu-icon, #socials-dropdown')) {
        closeNav();
        dropdown.style.display = "none"; // Hide the dropdown when sidebar is closed
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('mySidebar').classList.contains('open')) {
        closeNav();
    }
});