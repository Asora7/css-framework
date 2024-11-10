import { loginUser } from '../../api/auth/login.js';

/**
 * Handles the login process for the user.
 * This function is triggered when the login form is submitted.
 *
 * @param {Event} event - The event object representing the form submission event.
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */
export async function onLogin(event) {
  event.preventDefault();

  const formData = new FormData(event.target); 
  const userData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  await loginUser(userData);
}

document.forms['login']?.addEventListener('submit', onLogin);
