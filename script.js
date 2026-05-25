async function register() {

    const userData = {

        username: document.getElementById("registerUsername").value,

        password: document.getElementById("registerPassword").value

    };

    const response = await fetch("http://localhost:8087/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(userData)

    });

    alert("Registration Successful");

    showLogin();

}

async function login() {

    const userData = {

        username: document.getElementById("loginUsername").value,

        password: document.getElementById("loginPassword").value

    };

    const response = await fetch("http://localhost:8087/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(userData)

    });

    const result = await response.text();

    if(result === "Login Success"){

    window.location.href = "dashboard.html";

}
else{

    alert(result);

}

}

function showRegister(){

    document.getElementById("loginForm").style.display = "none";

    document.getElementById("registerForm").style.display = "block";

}

function showLogin(){

    document.getElementById("registerForm").style.display = "none";

    document.getElementById("loginForm").style.display = "block";

}