
async function handleLogIn() {
    const username = document.getElementById("rtrnUsername").value;
    console.log(username);
    const password = document.getElementById("rtrnPass").value;
    console.log(password);
    try {
        const res = await axios({
            method: "post",
            url: 'http://localhost:3003/account/login',
            data: {
                name: username,
                pass: password,
            }
        })
        const token = res.data.jwt;
        localStorage.setItem('token', token);
        console.log(token);
        localStorage.setItem('name', username);
<<<<<<< HEAD
        window.location.replace('http://localhost:3002/quiz.html'); 
=======

        location.href = "/profile.html";
        console.log("switch")
>>>>>>> 27b68dae2ca1b9eb14e218e33f898a34e0b4c96a
        return true;
    } catch (error) {
        alert(error);
        return false;
    }
}

async function createUser() {
    const username = document.getElementById("username").value;
    console.log(username);
    const password = document.getElementById("password").value;
    console.log(username);
    try {
        const res = await axios({
            method: "post",
            url: 'http://localhost:3002/account/create',
            data: {
                name: username,
                pass: password,
            }
        })
<<<<<<< HEAD
        window.location.replace('http://localhost:3002/logIn.html');
    } catch (error){
=======
        location.href('/logIn.html');
    } catch (error) {
>>>>>>> 27b68dae2ca1b9eb14e218e33f898a34e0b4c96a
        alert(error + ": An account with this name already exists!");
    }
}

function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
<<<<<<< HEAD
    window.location.replace('http://localhost:3002/index.html');
=======
    location.href('/index.html');
>>>>>>> 27b68dae2ca1b9eb14e218e33f898a34e0b4c96a
}
