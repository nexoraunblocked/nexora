function loadView(file) {
  // Always fetch from root to avoid /path/file.html 404s
  fetch('/' + file)
    .then(res => res.text())
    .then(html => {
      // Parse the fetched HTML so we can handle <head> (links/styles) and <script> tags.
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Inject head assets (link/style) into the main document head if not already present.
      const headNodes = doc.head ? Array.from(doc.head.querySelectorAll('link, style')) : [];
      headNodes.forEach(node => {
        if (node.tagName === 'LINK' && node.href) {
          if (!document.querySelector(`link[href="${node.href}"]`)) {
            const newLink = document.createElement('link');
            Array.from(node.attributes).forEach(a => newLink.setAttribute(a.name, a.value));
            document.head.appendChild(newLink);
          }
        } else if (node.tagName === 'STYLE') {
          const newStyle = document.createElement('style');
          newStyle.textContent = node.textContent;
          document.head.appendChild(newStyle);
        }
      });

      // Extract scripts so we can execute them after injecting the body.
      const scripts = doc.body ? Array.from(doc.body.querySelectorAll('script')) : [];

      // Remove scripts from the body HTML so we can safely set innerHTML.
      scripts.forEach(s => s.remove());

      // Inject the body content into the SPA container
      app.innerHTML = doc.body ? doc.body.innerHTML : '';

      // Execute scripts: external scripts are appended with async=false to preserve order.
      scripts.forEach(s => {
        const newScript = document.createElement('script');
        if (s.src) {
          newScript.src = s.src;
          newScript.async = false;
        } else {
          newScript.textContent = s.textContent;
        }
        document.body.appendChild(newScript);
      });

      // If the injected view provides a client init API (like NexoraChat), initialize it
      if (window.NexoraChat && typeof window.NexoraChat.init === 'function') {
        try { window.NexoraChat.init(app); } catch (e) { /* ignore init errors */ }
      }
    })
    .catch(() => {
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
