const app = document.getElementById('app');

const routes = {
  '/home':    renderHome,
  '/games':   renderGames,
  '/movies':  renderMovies,
  '/proxy':   renderProxy,
  '/hacks':   renderHacks,
  '/chatbot': renderChatbot // Added Chatbot route
};

function navigate(path) {
  history.pushState({}, '', path);
  const renderFn = routes[path];
  if (renderFn) {
    renderFn();
  } else {
    renderHome();
  }
}

// Sidebar link handling
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigate(link.dataset.route);
  });
});

// Back/forward button handling
window.onpopstate = () => {
  const path = location.pathname;
  (routes[path] || renderHome)();
};

// Initial load
const initialPath = location.pathname;
(routes[initialPath] || renderHome)();
