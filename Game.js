/* --- 1. SECURITY SYSTEM --- */
window.checkKey = function() {
    const inputField = document.getElementById('access-key');
    const errorDisplay = document.getElementById('lock-error');
    const lockScreen = document.getElementById('lock-screen');
    
    // Key: PIXLECT-2026-WIN
    const _0xscrambled = "UElYTEVDVC0yMDI2LVdJTg=="; 
    const _0xverified = atob(_0xscrambled);
    const userValue = inputField.value.trim();

    if (userValue === _0xverified) {
        localStorage.setItem('game_unlocked', 'true');
        lockScreen.style.display = 'none';
        addNotification("SECURITY SEAL BROKEN. WELCOME, CEO.");
    } else {
        errorDisplay.innerText = "INVALID ACCESS KEY. ACCESS DENIED.";
        inputField.value = "";
        inputField.focus();
    }
};

/* --- 2. DATA STRUCTURES --- */
const CONSOLE_TREE = [
    { name: "Mintendo NES", file: "NES.png", fansNeeded: 0, cost: 0 },
    { name: "Super Mintendo", file: "SNES.png", fansNeeded: 500, cost: 1000 },
    { name: "Sego Genesis", file: "Sega Genesis.png", fansNeeded: 1500, cost: 3000 },
    { name: "GameBoy", file: "gb.png", fansNeeded: 4000, cost: 8000 },
    { name: "Polystation 1", file: "Playstation 1.png", fansNeeded: 10000, cost: 20000 },
    { name: "Mintendo 64", file: "N64.png", fansNeeded: 25000, cost: 45000 },
    { name: "Sego Dreamcast", file: "Sega Dreamcast.png", fansNeeded: 50000, cost: 90000 },
    { name: "GameBoy Color", file: "gbc.png", fansNeeded: 80000, cost: 150000 },
    { name: "GameBoy Advance", file: "gba.png", fansNeeded: 120000, cost: 250000 },
    { name: "Polystation 2", file: "Playstation 2.png", fansNeeded: 200000, cost: 500000 },
    { name: "Mintendo DS", file: "NDS.png", fansNeeded: 350000, cost: 800000 },
    { name: "PSP", file: "PSP.png", fansNeeded: 500000, cost: 1200000 },
    { name: "Mintendo Cube", file: "Gamecube.png", fansNeeded: 700000, cost: 2000000 },
    { name: "Mintendo Wee", file: "Wii.png", fansNeeded: 1000000, cost: 5000000 },
    { name: "Polystation 3", file: "PS3.png", fansNeeded: 2000000, cost: 10000000 },
    { name: "UBox 360", file: "UBox 360.png", fansNeeded: 4000000, cost: 20000000 },
    { name: "Polystation 4", file: "PS4.png", fansNeeded: 8000000, cost: 50000000 },
    { name: "Polystation Vita", file: "PS Vita.png", fansNeeded: 12000000, cost: 80000000 },
    { name: "Mintendo Wee U", file: "Wii U.png", fansNeeded: 20000000, cost: 150000000 },
    { name: "Mintendo Smitch", file: "Nintendo Switch.png", fansNeeded: 50000000, cost: 500000000 },
    { name: "Polystation 5", file: "PS5.png", fansNeeded: 100000000, cost: 1000000000 },
    { name: "Mintendo Smitch 2", file: "Nintendo Switch 2.png", fansNeeded: 500000000, cost: 5000000000 }
];

const TECH_TREE = [
    { id: "cpu16", name: "16-bit Fast", cat: "CPU", cost: 2000, desc: "Unlock higher processing speeds." },
    { id: "cpu32", name: "32-bit Ultra", cat: "CPU", cost: 10000, desc: "The pinnacle of power." },
    { id: "ram1mb", name: "1 MB RAM", cat: "RAM", cost: 1500, desc: "More memory for bigger games." },
    { id: "ram4mb", name: "4 MB RAM", cat: "RAM", cost: 5000, desc: "Professional grade memory." },
    { id: "media_cd", name: "Optical Drive", cat: "MEDIA", cost: 12000, desc: "CD-ROM storage capabilities." },
    { id: "sec_seal", name: "Anti-Piracy Seal", cat: "SEC", cost: 8000, desc: "Protects your profits." }
];

/* --- 3. GAME STATE --- */
let gameState = {
    companyName: "", 
    money: 1500, 
    fans: 0, 
    day: 1, 
    currentGen: 0, 
    history: [], 
    inbox: [],
    unlockedTech: ["8-bit Standard", "Classic Controller", "256 KB Standard"],
    currentTrend: "RETRO"
};

let tempBatch = { units: 0, bonus: 0, chars: 0, modelIndex: 0 };
let codingTimer = null;

/* --- 4. ENGINE FUNCTIONS --- */
window.onload = () => {
    const saved = localStorage.getItem('pixlectMasterSave');
    if (saved) gameState = JSON.parse(saved);
    if (!gameState.companyName) gameState.companyName = prompt("ENTER CEO NAME:") || "CEO";
    
    if (localStorage.getItem('game_unlocked') === 'true') {
        const lock = document.getElementById('lock-screen');
        if(lock) lock.style.display = 'none';
    }

    updateUI();
};

function saveGame() { localStorage.setItem('pixlectMasterSave', JSON.stringify(gameState)); }

function updateUI() {
    document.getElementById('display-company-name').innerText = gameState.companyName + " Studios";
    document.getElementById('money-display').innerText = "$" + gameState.money.toLocaleString();
    document.getElementById('fan-display').innerText = gameState.fans.toLocaleString();
    document.getElementById('day-display').innerText = gameState.day;
    document.getElementById('trend-display').innerText = gameState.currentTrend;

    // Dynamic Hype Display
    const hypeLevels = ["LOW", "STEADY", "RISING", "MASSIVE", "PEAK"];
    let hypeIdx = Math.min(hypeLevels.length - 1, Math.floor(gameState.fans / 10000));
    document.getElementById('hype-display').innerText = hypeLevels[hypeIdx];

    let current = CONSOLE_TREE[gameState.currentGen];
    let next = CONSOLE_TREE[gameState.currentGen + 1];

    document.getElementById('console-name').innerText = current.name;
    document.getElementById('console-icon').src = current.file;

    if (next) {
        document.getElementById('next-goal-text').innerText = `Goal: ${next.fansNeeded.toLocaleString()} Fans for ${next.name}`;
        document.getElementById('buy-btn').style.display = (gameState.fans >= next.fansNeeded) ? "block" : "none";
        document.getElementById('buy-btn').innerText = `UPGRADE TO ${next.name} ($${next.cost.toLocaleString()})`;
    } else {
        document.getElementById('next-goal-text').innerText = "PEAK TECHNOLOGY REACHED";
        document.getElementById('buy-btn').style.display = "none";
    }
    document.getElementById('notification-list').innerHTML = gameState.inbox.map(m => `<div class="mail-item">${m}</div>`).join('');
}

function updateTicker(msg) {
    const ticker = document.getElementById('ticker-content');
    if(ticker) ticker.innerText = msg.toUpperCase();
}

function addNotification(msg) {
    gameState.inbox.unshift(msg);
    if (gameState.inbox.length > 8) gameState.inbox.pop();
    updateUI();
}

/* --- 5. WORKSHOP & CONFIG --- */
function openWorkshop() {
    const select = document.getElementById('model-select');
    if (!select) return;

    select.innerHTML = "";
    for(let i=0; i <= gameState.currentGen; i++) {
        if (CONSOLE_TREE[i]) {
            select.innerHTML += `<option value="${i}">${CONSOLE_TREE[i].name}</option>`;
        }
    }
    
    refreshConfigOptions();
    updateWorkshopPreview();
    updateSlider();

    document.getElementById('workshop-screen').style.display = 'flex';
}

function refreshConfigOptions() {
    const cpuSelect = document.getElementById('conf-cpu');
    if (cpuSelect) {
        cpuSelect.querySelector('option[value="500"]').disabled = !gameState.unlockedTech.includes("16-bit Fast");
        cpuSelect.querySelector('option[value="2000"]').disabled = !gameState.unlockedTech.includes("32-bit Ultra");
    }

    const ramSelect = document.getElementById('conf-ram');
    if (ramSelect) {
        ramSelect.querySelector('option[value="1024"]').disabled = !gameState.unlockedTech.includes("1 MB RAM");
        ramSelect.querySelector('option[value="4096"]').disabled = !gameState.unlockedTech.includes("4 MB RAM");
    }

    const mediaSelect = document.getElementById('conf-media');
    if(mediaSelect) mediaSelect.querySelector('option[value="300"]').disabled = !gameState.unlockedTech.includes("Optical Drive");

    const secBox = document.getElementById('conf-security');
    if(secBox) secBox.disabled = !gameState.unlockedTech.includes("Anti-Piracy Seal");
}

function updateWorkshopPreview() {
    let idx = document.getElementById('model-select').value;
    document.getElementById('workshop-preview-img').src = CONSOLE_TREE[idx].file;
}

function updateSlider() {
    let val = document.getElementById('unit-slider').value;
    document.getElementById('unit-count').innerText = val;
    document.getElementById('total-cost-display').innerText = "$" + (val * 200).toLocaleString();
}

function startCodingOS() {
    tempBatch.units = parseInt(document.getElementById('unit-slider').value);
    tempBatch.modelIndex = parseInt(document.getElementById('model-select').value);
    document.getElementById('workshop-screen').style.display = 'none';
    document.getElementById('coding-screen').style.display = 'flex';
    const term = document.getElementById('code-terminal');
    term.value = ""; term.focus();
    let sec = 15;
    
    codingTimer = setInterval(() => {
        sec--;
        document.getElementById('timer').innerText = sec;
        let bonus = Math.floor(term.value.length / 5);
        document.getElementById('profit-bonus').innerText = "$" + bonus;
        if (sec <= 0) {
            clearInterval(codingTimer);
            tempBatch.bonus = bonus;
            tempBatch.chars = term.value.length;
            document.getElementById('coding-screen').style.display = 'none';
            document.getElementById('config-screen').style.display = 'flex';
            showTab('system-tab');
        }
    }, 1000);
}

function finalizeRelease() {
    let cpuVal = parseInt(document.getElementById('conf-cpu').value) || 0;
    let ramVal = parseInt(document.getElementById('conf-ram').value) || 0; 
    let mediaVal = parseInt(document.getElementById('conf-media')?.value) || 0;
    let mktMult = parseInt(document.getElementById('conf-mkt').value);
    
    let mktCosts = { "1": 0, "2": 500, "5": 2000, "10": 10000 };
    let mktCost = mktCosts[mktMult.toString()] || 0;
    
    let genBase = (gameState.currentGen + 1) * 300;
    let totalUnitCost = genBase + cpuVal + ramVal + mediaVal;
    let totalCost = (tempBatch.units * totalUnitCost) + mktCost;

    if (gameState.money < totalCost) return alert("INSUFFICIENT FUNDS!");

    gameState.money -= totalCost;
    let score = Math.min(10, (tempBatch.chars / 100) + (cpuVal / 1000) + 5).toFixed(1);
    
    // Trend Bonus
    if(gameState.currentTrend === "RETRO" && CONSOLE_TREE[tempBatch.modelIndex].name.includes("Mintendo")) score = (parseFloat(score) + 1).toFixed(1);

    let retailPrice = 500 + (gameState.currentGen * 200) + (cpuVal * 1.5);
    let profit = (tempBatch.units * retailPrice) + tempBatch.bonus;
    
    gameState.money += profit;
    gameState.fans += Math.floor((tempBatch.units * score) * (mktMult / 2)); // Balanced multiplier

    gameState.history.push({
        name: CONSOLE_TREE[tempBatch.modelIndex].name,
        img: CONSOLE_TREE[tempBatch.modelIndex].file,
        color: document.getElementById('conf-color')?.value || "#cccccc",
        score: score,
        day: gameState.day
    });

    updateTicker(`LATEST RELEASE: ${CONSOLE_TREE[tempBatch.modelIndex].name} Rating: ${score}/10`);
    addNotification(`RELEASE: ${CONSOLE_TREE[tempBatch.modelIndex].name} rated ${score}/10!`);
    document.getElementById('config-screen').style.display = 'none';
    saveGame();
    updateUI();
}

/* --- 6. PROGRESSION --- */
function buyNextGen() {
    let next = CONSOLE_TREE[gameState.currentGen + 1];
    if (gameState.money >= next.cost) {
        gameState.money -= next.cost;
        gameState.currentGen++;
        addNotification(`TECH UPGRADE: ${next.name} unlocked.`);
        updateUI();
        saveGame();
    }
}

function openResearch() {
    document.getElementById('research-screen').style.display = 'flex';
    renderResearch();
}

function renderResearch() {
    const list = document.getElementById('research-list');
    list.innerHTML = ""; 

    TECH_TREE.forEach(tech => {
        const isUnlocked = gameState.unlockedTech.includes(tech.name);
        const card = document.createElement('div');
        card.className = 'research-item';
        card.style = `border: 1px solid ${isUnlocked ? '#10b981' : '#f59e0b'}; padding: 10px; opacity: ${isUnlocked ? '0.6' : '1'};`;
        card.innerHTML = `
            <h4>${tech.name} ${isUnlocked ? '✅' : ''}</h4>
            <p>${tech.desc}</p>
            ${isUnlocked ? '<p>ALREADY RESEARCHED</p>' : `<button onclick="buyTech('${tech.name}', ${tech.cost})">RESEARCH: $${tech.cost}</button>`}
        `;
        list.appendChild(card);
    });
}

function buyTech(techName, cost) {
    if (gameState.money >= cost) {
        gameState.money -= cost;
        gameState.unlockedTech.push(techName);
        addNotification(`R&D SUCCESS: ${techName} unlocked!`);
        renderResearch();
        updateUI();
        saveGame();
    } else {
        alert("NEED MORE MONEY FOR RESEARCH!");
    }
}

/* --- 7. DAY TRANSITION & EVENTS --- */
function nextDay() {
    gameState.day++;
    
    if (Math.random() < 0.3) {
        const trends = ["RETRO", "HANDHELD", "POWER", "BUDGET"];
        gameState.currentTrend = trends[Math.floor(Math.random() * trends.length)];
        updateTicker(`MARKET TREND SHIFT: ${gameState.currentTrend} IS NOW POPULAR!`);
    }

    // Weekly Awards
    if (gameState.day % 7 === 0) {
        let weeklyReleases = gameState.history.filter(h => h.day > gameState.day - 7);
        if (weeklyReleases.length > 0) {
            weeklyReleases.sort((a, b) => b.score - a.score);
            let best = weeklyReleases[0];
            if (best.score >= 8.5) {
                let prize = 5000 * (gameState.currentGen + 1);
                gameState.fans += prize;
                document.getElementById('awards-list').innerHTML += `<div>⭐ Day ${gameState.day}: ${best.name}</div>`;
                addNotification(`🏆 AWARD: ${best.name} won! +${prize} Fans!`);
            }
        }
    }

    addNotification(`Day ${gameState.day} started.`);
    saveGame();
    updateUI();
}

/* --- 8. UI HELPERS --- */
function showTab(tabId, event) {
    document.querySelectorAll('.config-tab').forEach(t => t.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).style.display = 'block';
    if(event && event.currentTarget) event.currentTarget.classList.add('active');
}

function openGallery() {
    document.getElementById('gallery-screen').style.display = 'flex';
    document.getElementById('gallery-list').innerHTML = gameState.history.map(item => `
        <div class="gallery-item" style="border: 1px solid #00d9ff; padding: 10px; margin: 5px;">
            <img src="${item.img}" style="background:${item.color}; width:40px; border-radius: 5px;">
            <p><strong>${item.name}</strong><br>Rating: ${item.score}/10<br>Day: ${item.day}</p>
        </div>
    `).join('');
}

function closeWorkshop() { document.getElementById('workshop-screen').style.display = 'none'; }
function closeGallery() { document.getElementById('gallery-screen').style.display = 'none'; }
function closeResearch() { document.getElementById('research-screen').style.display = 'none'; }

function resetGame() {
    if (confirm("ARE YOU SURE? This will delete all progress!")) {
        localStorage.clear();
        location.reload();
    }
}