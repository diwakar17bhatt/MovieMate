if(document.body.id === "sign-up-page"){

   console.log("h")
   document.getElementById("sign-up-form").addEventListener("submit", function(event) {
       event.preventDefault(); // Prevent the default form submission
         const fullName = document.getElementById("name").value;    
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
          
   });
}