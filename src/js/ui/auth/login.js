import { loginUser } from '../../api/auth/login.js';

/**
 * Handles the login process for the user.
 * This function is triggered when the login form is submitted.
 *
 * @param {Event} event - The event object representing the form submission event.
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */
export async function onLogin(event) {
  event.preventDefault();  // Prevent the form from being submitted the default way (GET request)

  const loginForm = document.forms['login'];  // Get the form
  const formData = new FormData(loginForm);  // Extract form data

  const userData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    await loginUser(userData);  // Call the loginUser function from the API
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message);  // Optionally display an error message to the user
  }
}

// Get the login form element and add the event listener
const loginForm = document.forms['login'];
if (loginForm) {
  loginForm.addEventListener('submit', onLogin);  // Trigger onLogin when form is submitted
}
