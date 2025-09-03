const app = document.getElementById('app');

const routes = {
  '/home': renderHome,
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

window.onpopstate = () => navigate('/home');

if (!routes[location.pathname]) {
  navigate('/home');
} else {
  navigate(location.pathname);
}