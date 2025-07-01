// users.js must define a "users" array

const PAGES = {
    home: `<h2>Welcome to Test Bank</h2>
        <p>This is a demo single-page application for portfolio and test automation.</p>
        <p><strong>Features:</strong> Login, content switching, Playwright-friendly selectors, modern design.</p>`,
    products: `<h2>Products</h2>
        <ul>
            <li>Checking Accounts</li>
            <li>Savings</li>
            <li>Demo Credit Cards</li>
            <li>Test Loans</li>
        </ul>`,
    contact: `<h2>Contact Us</h2>
        <p>Email: support@testbank.com<br>
        Phone: +123 456 7890</p>
        <form>
            <label for="msg">Your Message:</label>
            <textarea id="msg" rows="3" style="width:100%" placeholder="Type your message..."></textarea>
            <button type="button" disabled style="margin-top:10px; opacity:0.6;">Send (Not implemented)</button>
        </form>`
};

// Simple state
let currentUser = null;

// Login handling
function showError(msg) {
    const errEl = document.getElementById('login-error');
    errEl.textContent = msg || '';
}

function logIn(e) {
    if (e) e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    showError('');

    if (!email || !password) {
        showError('Please fill in both fields.');
        return;
    }
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('logged', user.email);
        currentUser = user;
        checkLogged();
    } else {
        showError('Incorrect email or password.');
    }
}

// Logout handling
function logOut() {
    localStorage.removeItem('logged');
    currentUser = null;
    checkLogged();
}

// Show/hide logout menu
function showUser() {
    const logout = document.getElementById('logout');
    if (logout.style.display === 'flex') {
        logout.style.display = 'none';
    } else {
        logout.style.display = 'flex';
        logout.style.alignItems = 'flex-end';
        logout.style.height = '50px';
    }
}

// Update UI based on auth state
function checkLogged() {
    const login = document.getElementById('login');
    const content = document.getElementById('content');
    const nav = document.getElementById('navigation');
    const userSec = document.getElementById('user');
    const userEmailSpan = document.getElementById('user-email');
    const loggedEmail = localStorage.getItem('logged');
    if (loggedEmail) {
        currentUser = users.find(u => u.email === loggedEmail) || null;
        login.style.display = 'none';
        content.style.display = 'flex';
        nav.style.display = 'flex';
        if (userEmailSpan) userEmailSpan.textContent = `Logged in as ${loggedEmail}`;
        // Default page
        setPage('home');
    } else {
        login.style.display = 'flex';
        content.style.display = 'none';
        nav.style.display = 'none';
        if (userEmailSpan) userEmailSpan.textContent = '';
    }
    // Hide logout on state change
    const logout = document.getElementById('logout');
    if (logout) logout.style.display = 'none';
}

function setPage(page) {
    const container = document.getElementById('content-container');
    if (!container) return;
    container.innerHTML = PAGES[page] || `<h2>Not implemented</h2>`;
    // Highlight active nav
    document.querySelectorAll('.nav-link').forEach(btn => {
        if (btn.id === 'nav-' + page) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Event bindings
window.addEventListener('DOMContentLoaded', () => {
    checkLogged();

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', logIn);
    }
    document.getElementById('login-btn').addEventListener('click', logIn);

    // Nav buttons
    document.getElementById('nav-home').addEventListener('click', () => setPage('home'));
    document.getElementById('nav-products').addEventListener('click', () => setPage('products'));
    document.getElementById('nav-contact').addEventListener('click', () => setPage('contact'));

    // User menu
    document.getElementById('user').addEventListener('click', showUser);
    document.getElementById('user').addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') showUser();
    });
    // Hide logout when clicking outside
    document.body.addEventListener('click', (e) => {
        const logout = document.getElementById('logout');
        if (!logout) return;
        if (!logout.contains(e.target) && !document.getElementById('user').contains(e.target)) {
            logout.style.display = 'none';
        }
    });
});
