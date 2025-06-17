// State management
const state = {
    sidebarOpen: false,
    hovering: false,
    links: [
        {
            label: "Dashboard",
            href: "#",
            icon: "📊",
        },
        {
            label: "Analytics",
            href: "#",
            icon: "📈",
        },
        {
            label: "Projects",
            href: "#",
            icon: "🚀",
        },
        {
            label: "Team",
            href: "#",
            icon: "👥",
        },
        {
            label: "Settings",
            href: "#",
            icon: "⚙️",
        },
    ],
};

// Functions
function toggleSidebar() {
    state.sidebarOpen = !state.sidebarOpen;
    updateSidebar();
}

function setSidebarOpen(open) {
    state.sidebarOpen = open;
    updateSidebar();
}

function setHovering(hovering) {
    state.hovering = hovering;
}

function updateSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (state.sidebarOpen) {
        sidebar.classList.add('open');
    } else {
        sidebar.classList.remove('open');
    }
}

// Initialize sidebar links
function initializeSidebar() {
    const linksContainer = document.getElementById('sidebar-links');
    state.links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.innerHTML = `${link.icon} <span>${link.label}</span>`;
        li.appendChild(a);
        linksContainer.appendChild(li);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();
    
    // Add click outside listener to close sidebar on mobile
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.sidebar');
        const toggleButton = document.querySelector('.toggle-button');
        
        if (window.innerWidth <= 768 && 
            !sidebar.contains(e.target) && 
            !toggleButton.contains(e.target) && 
            state.sidebarOpen) {
            setSidebarOpen(false);
        }
    });
}); 