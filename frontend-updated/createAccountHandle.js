
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

        location.href = "/profile.html";
        console.log("switch")
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
            url: 'http://localhost:3003/account/create',
            data: {
                name: username,
                pass: password,
            }
        })
        location.href('/logIn.html');
    } catch (error) {
        alert(error + ": An account with this name already exists!");
    }
}

function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    location.href('/index.html');
}
