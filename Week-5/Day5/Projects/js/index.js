document.addEventListener("DOMContentLoaded", () => {
    getWeather("Mohali"); // Load default city's weather when the page loads
    loadUserWishlist(); // Load wishlist from localStorage on page load
    setUserInitial();
});

const getWeather = (city) => {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=RKEHGU25JG2UTJE8BYB5A3TFH&contentType=json`)
        .then(response => response.json())
        .then((response) => {
          
            

            if (!response.days || response.days.length === 0) {
                alert("City not found. Please enter a valid city.");
                return;
            } 
            console.log(response);
            // var currentTime = new Date().toLocaleString({timeZone: city});
            document.getElementById("cityName").innerHTML = city;
            document.getElementById("time").innerHTML = response.currentConditions.datetime;
            const dateObj = new Date(response.days[0].datetime);
            document.getElementById("date").innerHTML = dateObj.toDateString();
            document.getElementById("temp").innerHTML = `${response.days[0].temp}°C`;
            document.getElementById("feels_like").innerHTML = `${response.days[0].feelslike}°C`;
            document.getElementById("pressure").innerHTML = `${response.days[0].pressure} hPa`;
            document.getElementById("humidity").innerHTML = `${response.days[0].humidity}%`;
            document.getElementById("wind_speed").innerHTML = `${response.days[0].windspeed} km/h`;
            document.getElementById("sunrise").innerHTML = response.days[0].sunrise;
            document.getElementById("sunset").innerHTML = response.days[0].sunset;
            document.getElementById("sunny").innerHTML = response.days[0].conditions;

            // Update forecasts
            updateFiveDayForecast(response.days);
            updateHourlyForecast(response.days[0].hours);
        })
        .catch(err => console.error("Error fetching weather data:", err));
};

// Add the 5-day and hourly forecast functions here as per your original code

const updateFiveDayForecast = (days) => {
    for (let i = 1; i <= 5; i++) {
        if (days[i]) {
            let day = days[i];
            let dateObj = new Date(day.datetime);
            document.getElementById(`temp-day${i}`).textContent = `${Math.round(day.temp)}°C`;
            document.getElementById(`date-day${i}`).textContent = dateObj.toLocaleDateString("en-US", { weekday: 'long', day: 'numeric', month: 'short' });
            document.querySelector(`#day${i} .weather-icon`).textContent = getWeatherIcon(day.conditions);
        }
    }
};

const updateHourlyForecast = (hours) => {
    for (let i = 0; i < 5; i++) {
        if (hours[i]) {
            let hour = hours[i];
            let time = hour.datetime.split("T")[1]; // Extract time from datetime string
            document.getElementById(`time-hour${i + 1}`).textContent = time;
            document.getElementById(`temp-hour${i + 1}`).textContent = `${Math.round(hour.temp)}°C`;
            document.getElementById(`wind-hour${i + 1}`).textContent = `${hour.windspeed} km/h`;
            document.querySelector(`#hour${i + 1} .weather-icon`).textContent = getWeatherIcon(hour.conditions);
        }
    }
};

const getWeatherIcon = (weather) => {
    const icons = {
        "Clear": "☀️",
        "Clouds": "⛅",
        "Rain": "🌧️",
        "Drizzle": "🌦️",
        "Thunderstorm": "⛈️",
        "Snow": "❄️",
        "Mist": "🌫️",
        "Fog": "🌫️"
    };
    return icons[weather] || "🌥️"; // Default icon
};
document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    let cityInput = document.getElementById("city").value.trim();
    if (cityInput !== "") {
        getWeather(cityInput);
    } else {
        alert("Please enter a city name.");
    }
});


// Login and Register Functions
function registerUser(email, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user => user.email === email)) {
        alert("User already exists!");
        return;
    }

    const newUser = {
        email,
        password,
        wishlist: [] // Empty wishlist for new users
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
}
//login user
function loginUser(email, password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let loggedInUser = users.find(user => user.email === email && user.password === password);

    if (loggedInUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
        alert("Login successful!");
        loadUserWishlist(); // Load wishlist after successful login
    } else {
        alert("Invalid email or password.");
    }
}

// Show user profile info
document.getElementById("user_profile").addEventListener("click", (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedUser) {
        const user = JSON.parse(storedUser);
        document.getElementById("user_email").innerHTML = user.email || "User not found";
    } else {
        document.getElementById("user_email").innerHTML = "User not found";
    }
});

// Function to load wishlist for logged-in user
function loadUserWishlist() {
    const storedUser = localStorage.getItem("loggedInUser");

    if (storedUser) {
        const user = JSON.parse(storedUser);
        let userWishlist = user.wishlist || [];

        let wishlistContainer = document.getElementById("serch_iteam");
        wishlistContainer.innerHTML = ""; // Clear previous wishlist

        if (userWishlist.length === 0) {
            wishlistContainer.innerHTML = "No cities in wishlist.";
            return;
        }

        userWishlist.forEach((city, index) => {
            let cityItem = document.createElement("div");
            cityItem.style.display = "flex";
            cityItem.style.alignItems = "center";
            cityItem.style.justifyContent = "space-between";
            cityItem.style.marginBottom = "5px";

            let cityName = document.createElement("span");
            cityName.textContent = city;

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "❌";
            deleteBtn.style.marginLeft = "10px";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.style.border = "none";
            deleteBtn.style.background = "transparent";
            deleteBtn.style.color = "red";
            deleteBtn.addEventListener("click", () => {
                deleteCityFromWishlist(index, user.email);
            });

            cityItem.appendChild(cityName);
            cityItem.appendChild(deleteBtn);
            wishlistContainer.appendChild(cityItem);
        });
    } else {
        alert("Please log in to view your wishlist.");
    }
}

// Function to add city to wishlist
document.getElementById("wishlist").addEventListener("click", async (e) => {
    e.preventDefault();
    const storedUser = localStorage.getItem("loggedInUser");

    if (!storedUser) {
        alert("Please log in to use the wishlist feature.");
        return;
    }

    let user = JSON.parse(storedUser);
    let cityInput = document.getElementById("city").value.trim();
    
    if (!cityInput) {
        alert("Please enter a city name before adding to wishlist.");
        return;
    }

    if (!user.wishlist) {
        user.wishlist = [];
    }

    if (!user.wishlist.includes(cityInput)) {
        user.wishlist.push(cityInput);
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        try {
            // Fetch user data from db.json
            let response = await fetch(`http://localhost:3000/users?email=${user.email}`);
            let users = await response.json();

            if (users.length > 0) {
                let dbUser = users[0]; // Get the first matching user

                // Update user's wishlist
                dbUser.wishlist = user.wishlist;

                // Send PATCH request to update wishlist in db.json
                await fetch(`http://localhost:3000/users/${dbUser.id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ wishlist: dbUser.wishlist })
                });

                alert(`${cityInput} added to Wishlist!`);
                loadUserWishlist(); // Refresh wishlist
            }
        } catch (error) {
            console.error("Error updating wishlist:", error);
        }
    } else {
        alert(`${cityInput} is already in your Wishlist.`);
    }
});

// Show wishlist when clicking on wishlist button
document.getElementById("wishlistButton").addEventListener("click", (e) => {
    e.preventDefault();
    loadUserWishlist();
});

// Function to delete city from wishlist
async function deleteCityFromWishlist(index, userEmail) {
    try {
        // Fetch the user's data from db.json
        let response = await fetch(`http://localhost:3000/users?email=${userEmail}`);
        let users = await response.json();

        if (users.length > 0) {
            let user = users[0]; // Get the first matching user

            // Remove the city from wishlist
            user.wishlist.splice(index, 1);

            // Update the user's wishlist in db.json
            await fetch(`http://localhost:3000/users/${user.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ wishlist: user.wishlist })
            });

            // Update localStorage
            let localUsers = JSON.parse(localStorage.getItem("users")) || [];
            let localUserIndex = localUsers.findIndex(u => u.email === userEmail);
            if (localUserIndex !== -1) {
                localUsers[localUserIndex].wishlist = user.wishlist;
                localStorage.setItem("users", JSON.stringify(localUsers));
            }

            // Also update the currently logged-in user in localStorage
            let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (loggedInUser && loggedInUser.email === userEmail) {
                loggedInUser.wishlist = user.wishlist;
                localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            }

            alert("City removed from wishlist!");
            loadUserWishlist(); // Refresh the wishlist on the page
        }
    } catch (error) {
        console.error("Error deleting wishlist item:", error);
    }
}

// Logout functionality
document.getElementById("logoutButton").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("loggedInUser"); // Clear logged-in user data
    window.location.href = "login.html";
});

//user first char Capital 
function setUserInitial() {
        const storedUser = localStorage.getItem("loggedInUser");
    
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.username && user.username.length > 0) {
                const firstLetter = user.username.charAt(0).toUpperCase();
                document.getElementById("User_char").textContent = firstLetter;
            } else {
                document.getElementById("User_char").textContent = "U"; // Default letter
            }
        } else {
            document.getElementById("User_char").textContent = "U";
        }
    }

 
    
    
    //when user want to see the wishlisted city data 
    document.getElementById("serch_iteam").addEventListener("click", function () {
        let data = document.getElementById("serch_iteam").value;
        getWeather(data);
       
    });