function register() {
    let user = document.getElementById("reg-user").value;
    let pass = document.getElementById("reg-pass").value;

    if (!user || !pass) {
        alert("Username dan Password harus diisi");
        return;
    }

    if (localStorage.getItem(user)) {
        alert("Username sudah ada");
        return;
    }

    let data = {
        password: pass,
        dl: 0,
        totalGame: 0,
        totalWin: 0,
        totalBet: 0,
        highestWin: 0,
        biggestLose: 0,
        wrongLogin: 0,

        // FAIRNESS
        clientSeed: Math.random().toString(36).substring(2),
        nonce: 0,

        // HISTORY
        historyDW: []
    };

    localStorage.setItem(user, JSON.stringify(data));

    alert("Register berhasil, silakan login");
    closeRegister();
}

function login() {
    let user = document.getElementById("login-user").value;
    let pass = document.getElementById("login-pass").value;
    let error = document.getElementById("login-error");

    error.innerText = "";

    if (!user || !pass) {
        error.innerText = "Isi username & password";
        return;
    }

    let data = JSON.parse(localStorage.getItem(user));

    if (!data) {
        error.innerText = "Username tidak ditemukan";
        return;
    }

    if (data.password !== pass) {
        data.wrongLogin = (data.wrongLogin || 0) + 1;
        localStorage.setItem(user, JSON.stringify(data));

        if (data.wrongLogin >= 3) {
            error.innerText = "Salah 3x. Klik lupa password.";
        } else {
            error.innerText = "Password salah";
        }
        return;
    }

    data.wrongLogin = 0;
    localStorage.setItem(user, JSON.stringify(data));

    localStorage.setItem("loginUser", user);
    closeLogin();
    location.reload();
}

/* ADMIN LOGIN */
const ADMIN_USER = "alens";
const ADMIN_PASS = "wishacantik123";

function adminLogin() {
    let user = document.getElementById("admin-user").value;
    let pass = document.getElementById("admin-pass").value;
    let info = document.getElementById("admin-info");

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        localStorage.setItem("isAdmin", "true");
        window.location.href = "admin.html";
    } else {
        info.innerText = "Login admin salah";
    }
}