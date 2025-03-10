const Form = document.getElementById("employeeForm") as HTMLFormElement | null;

if (form) {
    form.addEventListener("submit", function (e: Event) {
        e.preventDefault();

        // Get form values
        const Name = (document.getElementById("name") as HTMLInputElement)?.value.trim();
        const Email = (document.getElementById("Name_2") as HTMLInputElement)?.value.trim();
        const Password = (document.getElementById("Emp_mail") as HTMLInputElement)?.value.trim();
        const Address = (document.getElementById("Emp_pass") as HTMLInputElement)?.value.trim();
        const Pincode = (document.getElementById("Emp_conf_pass") as HTMLInputElement)?.value.trim();
        const Street = (document.getElementById("street") as HTMLInputElement)?.value.trim();
        const Phone = (document.getElementById("phone") as HTMLInputElement)?.value.trim();
        const Website = (document.getElementById("website") as HTMLInputElement)?.value.trim();
        const Company = (document.getElementById("company") as HTMLInputElement)?.value.trim();
        const Role = (document.getElementById("role") as HTMLInputElement)?.value.trim();

        // Validate input fields (Basic)
        if (!Name || !Email || !Password || !Address || !Pincode || !Street || !Phone || !Website || !Company || !Role) {
            alert("All fields are required!");
            return;
        }

        // Create user object
        const newUser = {
            id: String(Date.now()),
            Name,
            Email,
            Password,
            Address,
            Pincode,
            Street,
            Phone,
            Website,
            Company,
            Role,
        };

        // Send POST request to JSON Server
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then(data => {
            console.log("User added:", data);
            alert("User added successfully!");
            window.location.href = "../Public/login.html";

            // Reset form fields after successful submission
            Form.reset();
        })
        .catch(error => console.error("Error adding user:", error));
    });
}