import { logout } from '../auth/logout.js';

/**
 * Creates the global header for the application.
 * This function constructs the header element containing navigation links,
 * a search bar, and a logout button, and appends it to the document body.
 *
 * @function
 * @returns {void}
 */
export function createHeader() {
  const token = localStorage.getItem('token'); 

  if (!token) {
    return; 
  }

  const header = document.createElement('header');
  header.classList.add('app-header'); 

  header.innerHTML = `
  <nav class="navbar navbar-light flex-column">
    <a href="/" class="navbar-brand mb-4">Connectly</a>
    <ul class="navbar-nav flex-column nav-pills">
      <li class="nav-item">
        <a class="nav-link" href="/"><i class="bi bi-house"></i> Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/profile/"><i class="bi bi-person"></i> Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/post/create/"><i class="bi bi-plus-square"></i> New Post</a>
      </li>
    </ul>
    
    <form class="form-inline mt-4 mb-3" id="search-form">
      <input 
        class="form-control mb-2" 
        type="search" 
        placeholder="Search" 
        aria-label="Search" 
        required
      >
    </form>

    <button id="logout" class="btn btn-danger w-100 mt-auto">Logout</button>
  </nav>
`;


  document.body.prepend(header); 

  // Logout functionality
  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      const confirmation = confirm('Are you sure you want to log out?');
      if (confirmation) {
        logout(); 
      }
    });
  }

  // Search functionality
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = searchForm.querySelector('input').value;
      window.location.href = `/search/?query=${encodeURIComponent(query)}`;
    });
  }
}
