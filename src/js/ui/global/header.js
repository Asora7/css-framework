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
  <nav class="navbar navbar-light d-flex justify-content-between align-items-center p-3">
    <a href="/" class="navbar-brand">Connectly</a>
    <ul class="navbar-nav d-flex m-0">
      <li class="nav-item">
        <a class="nav-link" href="/"><i class="fas fa-home"></i>Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/profile/"><i class="fas fa-user"></i>Profile</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/post/create/"><i class="fas fa-plus"></i>New Post</a>
      </li>
    </ul>
    <button id="logout" class="btn btn-danger">Logout</button>
  </nav>
`;

  document.body.prepend(header); 

  const logoutButton = document.getElementById('logout');
  if (logoutButton) {
    logoutButton.addEventListener('click', () => {
      const confirmation = confirm('Are you sure you want to log out?');
      if (confirmation) {
        logout(); 
      }
    });
  }
}

