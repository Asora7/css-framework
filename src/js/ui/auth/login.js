import { loginUser } from '../../api/auth/login.js';

/**
 * Handles the login process for the user.
 * This function is triggered when the login form is submitted.
 *
 * @param {Event} event - The event object representing the form submission event.
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */
export async function onLogin(event) {
  event.preventDefault(); // Prevent default form submission (GET)

  const formData = new FormData(event.target); // Access the form data directly from the event.target (form)
  const userData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  await loginUser(userData); // Call the login function that should make a POST request
}

// Ensure this part is outside the function so the event listener is attached when the script is loaded
const loginForm = document.forms['login'];
if (loginForm) {
  console.log("Login form found and event listener attached.");
  loginForm.addEventListener('submit', onLogin); // Add the event listener
} else {
  console.error('Login form not found.');
}
