window.onload = function () {
    checkLogin();
    updateTopDL();
};

function checkLogin() {
    let user = localStorage.getItem("loginUser");

    if (user) {
        let data = JSON.parse(localStorage.getItem(user));

        document.getElementById("guest-menu").style.display = "none";
        document.getElementById("user-menu").style.display = "block";
        document.getElementById("username-text").innerText = user;
        document.getElementById("dl").innerText = data.dl || 0;
    } else {
        document.getElementById("guest-menu").style.display = "block";
        document.getElementById("user-menu").style.display = "none";
    }
}

function updateTopDL() {
    let user = localStorage.getItem("loginUser");
    if (!user) return;

    let data = JSON.parse(localStorage.getItem(user));
    document.getElementById("dl").innerText = data.dl || 0;
}

function openGame(game) {
    let user = localStorage.getItem("loginUser");
    if (!user) {
        alert("Login dulu");
        return;
    }

    if (game === "reme") {
        window.location.href = "reme.html";
    }
}

/* PROFILE */
function openProfile() {
    let user = localStorage.getItem("loginUser");
    if (!user) return;

    let data = JSON.parse(localStorage.getItem(user));

    document.getElementById("p-username").innerText = user;
    document.getElementById("p-dl").innerText = data.dl || 0;
    document.getElementById("p-totalGame").innerText = data.totalGame || 0;
    document.getElementById("p-totalWin").innerText = data.totalWin || 0;
    document.getElementById("p-totalBet").innerText = data.totalBet || 0;
    document.getElementById("p-high").innerText = data.highestWin || 0;
    document.getElementById("p-lose").innerText = data.biggestLose || 0;

    document.getElementById("profile-popup").style.display = "block";
}

function closeProfile() {
    document.getElementById("profile-popup").style.display = "none";
}

function logout() {
    localStorage.removeItem("loginUser");
    location.reload();
}

/* LOGIN REGISTER POPUP */
function openLogin() {
    document.getElementById("login-popup").style.display = "block";
}
function closeLogin() {
    document.getElementById("login-popup").style.display = "none";
}
function openRegister() {
    document.getElementById("register-popup").style.display = "block";
}
function closeRegister() {
    document.getElementById("register-popup").style.display = "none";
}

/* DW MENU */
function openDW() {
    document.getElementById("dw-popup").style.display = "block";
}
function closeDW() {
    document.getElementById("dw-popup").style.display = "none";
}

function openDeposit() {
    document.getElementById("deposit-popup").style.display = "block";
}
function closeDeposit() {
    document.getElementById("deposit-popup").style.display = "none";
}

function openWithdraw() {
    document.getElementById("withdraw-popup").style.display = "block";
}
function closeWithdraw() {
    document.getElementById("withdraw-popup").style.display = "none";
}

/* DEPOSIT */
function submitDeposit() {
    let amount = parseInt(document.getElementById("deposit-amount").value);
    let user = localStorage.getItem("loginUser");
    if (!amount || amount <= 0) return;

    let data = JSON.parse(localStorage.getItem(user));
    data.dl = (data.dl || 0) + amount;

    localStorage.setItem(user, JSON.stringify(data));

    updateTopDL();
    document.getElementById("deposit-info").innerText = "Deposit berhasil";
}

/* WITHDRAW */
function submitWithdraw() {
    let amount = parseInt(document.getElementById("withdraw-amount").value);
    let user = localStorage.getItem("loginUser");
    if (!amount || amount <= 0) return;

    let data = JSON.parse(localStorage.getItem(user));

    if (amount > data.dl) {
        document.getElementById("withdraw-info").innerText = "DL tidak cukup";
        return;
    }

    data.dl -= amount;
    localStorage.setItem(user, JSON.stringify(data));

    updateTopDL();
    document.getElementById("withdraw-info").innerText = "Withdraw berhasil";
}
function depositWA() {
    let amount = document.getElementById("deposit-amount").value;
    let user = localStorage.getItem("loginUser");

    if (!amount) {
        document.getElementById("deposit-info").innerText = "Masukin jumlah dulu";
        return;
    }

    let text = `DEPOSIT\nUser: ${user}\nJumlah: ${amount} DL`;
    let url = "https://wa.me/85802961753?text=" + encodeURIComponent(text);

    window.open(url, "_blank");
}

function withdrawWA() {
    let amount = document.getElementById("withdraw-amount").value;
    let user = localStorage.getItem("loginUser");

    if (!amount) {
        document.getElementById("withdraw-info").innerText = "Masukin jumlah dulu";
        return;
    }

    let text = `WITHDRAW\nUser: ${user}\nJumlah: ${amount} DL`;
    let url = "https://wa.me/6285802961753?text=" + encodeURIComponent(text);

    window.open(url, "_blank");
}