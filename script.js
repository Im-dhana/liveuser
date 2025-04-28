// This script handles both login storage and RUM user setup

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      // We are in login page
      loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
  
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
  
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('username', username);
  
        // Initialize RUM user on login *if* DD_RUM is available (unlikely here)
        if (window.DD_RUM) {
          DD_RUM.setUser({
            id: username,
            email: email,
            name: name
          });
          console.log('[RUM - Login] setUser:', { id: username, email: email, name: name });
        }
  
        window.location.href = "welcome.html";
      });
    } else {
      // We are in welcome page
      const user = localStorage.getItem('username');
      const email = localStorage.getItem('email');
      const name = localStorage.getItem('name');
  
      if (user && window.DD_RUM) {
        DD_RUM.setUser({
          id: user,
          email: email,
          name: name
        });
        console.log('[RUM - Welcome] setUser:', { id: user, email: email, name: name });
      }
    }
  });