// const form = document.getElementById("employeeForm");
 
// if (form) {
//     form.addEventListener("submit", function (e) {
//         e.preventDefault();

//         // Get form values  
//         const FirstName = document.getElementById("Name_1").value.trim();
//         const LastName = document.getElementById("Name_2").value.trim();
//         const Email = document.getElementById("Emp_mail").value.trim();
//         const Password = document.getElementById("Emp_pass").value.trim();
//         const ConformPassword = document.getElementById("Emp_conf_pass").value.trim();
//         const Role = document.getElementById('role').value;
        

//         // Validate input fields (Basic)
//         if (!FirstName || !LastName || !Email || !Password || !ConformPassword || !Role) {
//             alert("All fields are required!");
//             return;
//         }

//         // Create user object
//         const newUser = {
//             id: Math.floor(Math.random()*10),
//             FirstName,
//             LastName,
//             Email,
//             Password,
//             ConformPassword,
//             Role,
//         };

//         // Send POST request to JSON Server
//         fetch("http://localhost:3000/users", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(newUser)
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log("User added:", data);
//             alert("User added successfully!");
//             window.location.href="../Public/login.html"
            

//             // Reset form fields after successful submission
//             form.reset();
//         })
//     })}