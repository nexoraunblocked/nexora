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
  history.pushState({}, '', path);
  const renderFn = routes[path];
  if (renderFn) {
    renderFn();
  } else {
    renderHome();
  }
}

document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigate(link.dataset.route);
  });
});

window.onpopstate = () => {
  const path = location.pathname;
  (routes[path] || renderHome)();
};

const initialPath = location.pathname;
(routes[initialPath] || renderHome)();
