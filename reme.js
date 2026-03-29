// =======================
// DATA PLAYER
// =======================
window.onload = function () {
    let user = localStorage.getItem("loginUser");
    if (!user) {
        alert("Login dulu");
        window.location.href = "index.html";
        return;
    }

    let data = JSON.parse(localStorage.getItem(user));
    document.getElementById("top-name").innerText = user;
    document.getElementById("dl").innerText = data.dl || 0;

    loadHistory();
};

// =======================
// FAIRNESS SYSTEM
// =======================
let serverSeed = "arcadia_seed_2025";

function simpleHash(str) {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (h << 5) - h + str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}

function openFairness() {
    let user = localStorage.getItem("loginUser");
    let data = JSON.parse(localStorage.getItem(user));

    document.getElementById("fair-client").innerText = data.clientSeed;
    document.getElementById("fair-server").innerText = simpleHash(serverSeed);
    document.getElementById("fair-nonce").innerText = data.nonce;

    document.getElementById("fair-popup").style.display = "block";
}

function closeFairness() {
    document.getElementById("fair-popup").style.display = "none";
}

// =======================
// GAME REME
// =======================
function spinReme() {
    let bet = parseInt(document.getElementById("bet").value);
    let user = localStorage.getItem("loginUser");
    let data = JSON.parse(localStorage.getItem(user));

    if (!bet || bet <= 0) {
        alert("Masukkan bet dulu");
        return;
    }

    if (bet > data.dl) {
        alert("DL tidak cukup");
        return;
    }

    // FAIR RANDOM
    let seed = serverSeed + data.clientSeed + data.nonce;
    let resultHash = simpleHash(seed);

    let player = resultHash % 10;
    let host = (resultHash * 7) % 10;

    document.getElementById("player-number").innerText = player;
    document.getElementById("host-number").innerText = host;

    let resultText = "";

    if (player > host) {
        data.dl += bet;
        resultText = "MENANG +" + bet;
        data.totalWin += bet;
    } else if (player < host) {
        data.dl -= bet;
        resultText = "KALAH -" + bet;
    } else {
        resultText = "SERI";
    }

    data.totalGame += 1;
    data.totalBet += bet;

    // NONCE NAIK SETIAP GAME
    data.nonce += 1;

    localStorage.setItem(user, JSON.stringify(data));

    document.getElementById("dl").innerText = data.dl;
    document.getElementById("result").innerText = resultText;

    saveHistory(player, host, resultText);
}

// =======================
// HISTORY
// =======================
function saveHistory(player, host, result) {
    let box = document.getElementById("history-box");
    let p = document.createElement("p");
    p.innerText = "Player: " + player + " | House: " + host + " | " + result;
    box.prepend(p);
}

function loadHistory() {
    // kalau mau simpan permanent nanti kita bikin
}