const app = document.getElementById('app');

const routes = {
  '/index': renderHome,
  '/games': renderGames,
  '/movies': renderMovies,
  '/proxy': renderProxy,
  '/hacks': renderHacks
};

function navigate(path) {
  history.replaceState({}, '', path);
  routes[path]?.();
}

document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    navigate(link.dataset.route);
  });
});

window.onpopstate = () => navigate('/index');

if (!routes[location.pathname]) {
  navigate('/index');
} else {
  navigate(location.pathname);
}