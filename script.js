if (document.body.id === "sign-up-page") {
  console.log("sign-up page loaded");
  document
    .getElementById("sign-up-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent the default form submission
      const fullName = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        const p = document.createElement("p");
        p.innerText = data.message;
        document.getElementById("signup-message").appendChild(p);
        document.getElementById("sign-up-form").reset(); // Reset the form
      } else if (data.error) {
        const p = document.createElement("p");
        p.innerText = data.error;
        console.log(data.error);
        document.getElementById("signup-message").appendChild(p);
        document.getElementById("sign-up-form").reset(); // Reset the form
      } else {
        console.log("An unexpected error occurred");
      }
    });
}

if (document.body.id === "login-page") {
  console.log("login page loaded");
  document
    .getElementById("login-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data.user);
      if (data.user.name) {
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email);
      }
    });
}
