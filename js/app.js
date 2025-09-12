const app = document.getElementById('app');

const routes = {
  '/home':    renderHome,
  '/games':   renderGamesRoute,
  '/proxy':   renderProxy,
  '/hacks':   renderHacks,
  '/chatbot': renderChatbot,
  '/loader':  renderLoader
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

document.addEventListener('click', e => {
  const link = e.target.closest('[data-route]');
  if (link) {
    e.preventDefault();
    navigate(link.dataset.route);
  }
});

window.onpopstate = () => {
  const path = location.pathname;
  (routes[path] || renderHome)();
};

const initialPath = location.pathname;
(routes[initialPath] || renderHome)();

function renderHome()    { loadView('home.html'); }
function renderProxy()   { loadView('proxy.html'); }
function renderHacks()   { loadView('hacks.html'); }
function renderChatbot() { loadView('chatbot.html'); }
function renderLoader()  { loadView('gameloader.html'); }
function renderGamesRoute() { loadView('games.html'); }
