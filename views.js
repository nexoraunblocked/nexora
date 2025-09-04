function loadView(file) {
  fetch(file)
    .then(res => res.text())
    .then(html => {
      app.innerHTML = html;
    })
    .catch(() => {
      app.innerHTML = `<h1 class="site-title">Error</h1><p>Failed to load ${file}.</p>`;
    });
}

function renderHome()   { loadView('home.html'); }
function renderGames()  { loadView('games.html'); }
function renderMovies() { loadView('movies.html'); }
function renderProxy()  { loadView('proxy.html'); }
function renderHacks()  { loadView('hacks.html'); }
function renderChatbot()  { loadView('chatbot.html'); }