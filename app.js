// app.js
const app = document.getElementById('app');

const routes = {
  '/home':    renderHome,
  '/games':   renderGames,
  '/movies':  renderMovies,
  '/proxy':   renderProxy,
  '/hacks':   renderHacks,
  '/chatbot': renderChatbot
};

function navigate(path) {
  // pushState so back/forward works naturally
  history.pushState({}, '', path);
  const renderFn = routes[path];
  if (renderFn) {
    renderFn();
  } else {
    renderHome();
  }
}

// sidebar links
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigate(link.dataset.route);
  });
});

// handle back/forward buttons
window.onpopstate = () => {
  const path = location.pathname;
  (routes[path] || renderHome)();
};

// initial load
const initial = location.pathname;
(routes[initial] || renderHome)();
