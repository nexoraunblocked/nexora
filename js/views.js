const app = document.getElementById('app');

function loadView(file) {
  fetch('/' + file)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const links = doc.head
        ? Array.from(doc.head.querySelectorAll('link[rel="stylesheet"]'))
        : [];
      links.forEach(link => {
        if (!document.querySelector(`link[href="${link.href}"]`)) {
          const newLink = document.createElement('link');
          Array.from(link.attributes).forEach(a =>
            newLink.setAttribute(a.name, a.value)
          );
          document.head.appendChild(newLink);
        }
      });

      app.innerHTML = doc.body.innerHTML;

      const scripts = Array.from(doc.body.querySelectorAll('script'));
      scripts.forEach(s => s.remove()); 
      scripts.forEach(s => {
        const js = document.createElement('script');
        if (s.src) {
          js.src = s.src;
          js.async = false;
        } else {
          js.textContent = s.textContent;
        }
        document.body.appendChild(js);
      });

      if (window.NexoraChat && typeof window.NexoraChat.init === 'function') {
        try {
          window.NexoraChat.init(app);
        } catch (e) {
          console.warn('Chat init failed', e);
        }
      }
    })
    .catch(err => {
      console.error('View load failed:', err);
      app.innerHTML = `
        <h1 class="site-title">Error</h1>
        <p>Failed to load ${file}.</p>
      `;
    });
}

function renderHome()    { loadView('home.html'); }
function renderGames()   { loadView('games.html'); }
function renderMovies()  { loadView('movies.html'); }
function renderProxy()   { loadView('proxy.html'); }
function renderHacks()   { loadView('hacks.html'); }
function renderChatbot() { loadView('chatbot.html'); }

export {
  renderHome,
  renderGames,
  renderMovies,
  renderProxy,
  renderHacks,
  renderChatbot
};
