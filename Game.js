/* --- 1. SECURITY SYSTEM (REMOVED ACCESS KEY) --- */
// Security key functionality has been removed. No lock-screen logic remains.


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
    { id: "blu-ray1", name: "Blu-Ray DVD", cat: "MEDIA", cost: 90000, desc: "Instant Speed And Storage For Games" },
    { id: "cpu16", name: "16-bit Fast", cat: "CPU", cost: 2000, desc: "Unlock higher processing speeds." },
    { id: "cpu32", name: "32-bit Ultra", cat: "CPU", cost: 10000, desc: "The pinnacle of power." },
    { id: "ram1mb", name: "1 MB RAM", cat: "RAM", cost: 1500, desc: "Basic RAM For A System... I Guess It's Good" },
    { id: "ram4mb", name: "4 MB RAM", cat: "RAM", cost: 5000, desc: "A Teeny Tiny Bit Of Advanced RAM" },
    { id: "ram8mb", name: "8 MB RAM", cat: "RAM", cost: 10000, desc: "More Advanced RAM Is Always Better" },
    { id: "ram16mb", name: "16 MB RAM", cat: "RAM", cost: 15000, desc: "Gaining Tons Of FPS In... Retro Games!!!" },
    { id: "ram32mb", name: "32 MB RAM", cat: "RAM", cost: 20000, desc: "Super Fast Memory For Professional Grade Gaming" },
    { id: "ram64mb", name: "64 MB RAM", cat: "RAM", cost: 25000, desc: "This Is Getting Good" },
    { id: "ram128mb", name: "128 MB RAM", cat: "RAM", cost: 30000, desc: "High-Speed Memory Now" },
    { id: "ram256mb", name: "256 MB RAM", cat: "RAM", cost: 35000, desc: "Sonic Speed Memory, Finally" },


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
    currentTrend: "RETRO",
    unlockedAchievements: [],
    awards: [],
    totalLinesTyped: 0,
    totalReleases: 0,
    brokenPackages: [],
    totalRepaired: 0,
    botRevenue: 0,
    stock: {},
    timesLockedOut: 0,
    unlockedNS2AtDay: null,
    firebasePlayerId: null,
    firebaseDisplayName: ""
};

/* --- 3b. ACHIEVEMENTS --- */
const ACHIEVEMENTS = [
    { id: "first_sale", icon: "🌟", name: "First Sale", desc: "Release your first console.", check: gs => gs.totalReleases >= 1 },
    { id: "hype_train", icon: "🔥", name: "Hype Train", desc: "Reach 10,000 fans.", check: gs => gs.fans >= 10000 },
    { id: "code_monkey", icon: "💻", name: "Code Monkey", desc: "Type 50+ lines of code total.", check: gs => gs.totalLinesTyped >= 50 },
    { id: "big_spender", icon: "💸", name: "Big Spender", desc: "Reach $50,000 in funds.", check: gs => gs.money >= 50000 },
    { id: "tech_guru", icon: "🧪", name: "Tech Guru", desc: "Research 5 technologies.", check: gs => gs.unlockedTech.length >= 8 },
    { id: "console_veteran", icon: "🕹️", name: "Console Veteran", desc: "Reach the 5th console generation.", check: gs => gs.currentGen >= 4 },
    { id: "award_winner", icon: "🏆", name: "Award Winner", desc: "Win your first weekly award.", check: gs => gs.awards.length >= 1 },
    { id: "marathon_dev", icon: "📅", name: "Marathon Developer", desc: "Survive 30 days in business.", check: gs => gs.day >= 30 },
    { id: "fixer_upper", icon: "🔧", name: "Fixer Upper", desc: "Repair 5 broken packages.", check: gs => gs.totalRepaired >= 5 },
    { id: "market_darling", icon: "📈", name: "Market Darling", desc: "Earn $5,000 from bot marketplace sales.", check: gs => gs.botRevenue >= 5000 },
    { id: "damage_control", icon: "🚨", name: "Damage Control", desc: "Survive an angry-customer lockdown.", check: gs => gs.timesLockedOut >= 1 }
];

function checkAchievements() {
    ACHIEVEMENTS.forEach(ach => {
        if (!gameState.unlockedAchievements.includes(ach.id) && ach.check(gameState)) {
            gameState.unlockedAchievements.push(ach.id);
            showAchievementPopup(ach);
            addNotification(`🏅 ACHIEVEMENT UNLOCKED: ${ach.name}`);
        }
    });
}

/* Shared toast helper so achievement popups and bot-sale popups can stack without overlapping */
let activePopups = 0;
function spawnPopup(innerHTML, opts = {}) {
    const { border = '#f59e0b', duration = 4000 } = opts;
    const popup = document.createElement('div');
    popup.className = 'achievement-popup';
    popup.style.borderColor = border;
    popup.style.boxShadow = `4px 4px 0px ${border}`;
    popup.style.top = (20 + activePopups * 88) + 'px';
    popup.innerHTML = innerHTML;
    document.body.appendChild(popup);
    activePopups++;
    requestAnimationFrame(() => popup.classList.add('show'));
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
            activePopups = Math.max(0, activePopups - 1);
        }, 500);
    }, duration);
}

function showAchievementPopup(ach) {
    spawnPopup(`
        <div class="achievement-popup-icon">${ach.icon}</div>
        <div class="achievement-popup-text">
            <div class="achievement-popup-title">ACHIEVEMENT UNLOCKED</div>
            <div class="achievement-popup-name">${ach.name}</div>
            <div class="achievement-popup-desc">${ach.desc}</div>
        </div>
    `, { border: '#f59e0b', duration: 4000 });
}

function showBotPurchasePopup(botName, item, amount) {
    spawnPopup(`
        <div class="achievement-popup-icon">🤖</div>
        <div class="achievement-popup-text">
            <div class="achievement-popup-title">MARKETPLACE SALE</div>
            <div class="achievement-popup-name">${botName}</div>
            <div class="achievement-popup-desc">Bought a ${item.name} · +$${amount.toLocaleString()}</div>
        </div>
    `, { border: '#00d9ff', duration: 3200 });
}

function renderAchievements() {
    const list = document.getElementById('achievements-list');
    if (!list) return;
    list.innerHTML = ACHIEVEMENTS.map(ach => {
        const unlocked = gameState.unlockedAchievements.includes(ach.id);
        return `<div class="achievement-item ${unlocked ? 'unlocked' : 'locked'}">
            ${unlocked ? ach.icon : '🔒'} ${ach.name} - ${ach.desc}
        </div>`;
    }).join('');
}

let tempBatch = { units: 0, bonus: 0, chars: 0, modelIndex: 0 };
let codingTimer = null;

function ensureFirebaseSessionId() {
    if (!gameState.firebasePlayerId) {
        const stored = localStorage.getItem('pixlectFirebasePlayerId');
        if (stored) {
            gameState.firebasePlayerId = stored;
        } else {
            const generated = `player-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
            gameState.firebasePlayerId = generated;
            localStorage.setItem('pixlectFirebasePlayerId', generated);
        }
    }
    return gameState.firebasePlayerId;
}

function getLeaderboardIdentity() {
    const user = window.firebaseAuth?.currentUser;
    const name = (user?.displayName || gameState.firebaseDisplayName || gameState.companyName || 'Guest').trim() || 'Guest';
    const uid = user?.uid || ensureFirebaseSessionId();
    if (user?.displayName) gameState.firebaseDisplayName = user.displayName;
    if (user?.uid) gameState.firebasePlayerId = user.uid;
    return { uid, name };
}

function updateAuthUi() {
    const button = document.getElementById('google-auth-btn');
    const status = document.getElementById('auth-status');
    if (!button || !status) return;

    const user = window.firebaseAuth?.currentUser;
    if (user) {
        button.innerText = 'SIGN OUT';
        status.innerText = `Signed in as ${user.displayName || user.email || 'Google User'}`;
    } else {
        button.innerText = 'SIGN IN WITH GOOGLE';
        status.innerText = 'Sign in to appear on the leaderboard with your Google account.';
    }
}

function initFirebaseAuth() {
    if (!window.firebaseAuthHelpers || !window.firebaseAuth || !window.firebaseGoogleProvider) return;

    window.firebaseAuthHelpers.onAuthStateChanged(window.firebaseAuth, user => {
        if (user?.displayName) gameState.firebaseDisplayName = user.displayName;
        if (user?.uid) gameState.firebasePlayerId = user.uid;
        updateAuthUi();
        syncLeaderboard();
    });
}

function toggleGoogleAuth() {
    if (!window.firebaseAuthHelpers || !window.firebaseAuth || !window.firebaseGoogleProvider) {
        alert('Firebase authentication is not ready yet.');
        return;
    }

    const user = window.firebaseAuth.currentUser;
    if (user) {
        window.firebaseAuthHelpers.signOut(window.firebaseAuth).catch(() => {
            alert('Unable to sign out right now.');
        });
        return;
    }

    window.firebaseAuthHelpers.signInWithPopup(window.firebaseAuth, window.firebaseGoogleProvider)
        .then(() => {
            updateAuthUi();
            syncLeaderboard();
        })
        .catch(err => {
            console.error(err);
            alert('Google sign-in failed.');
        });
}

window.toggleGoogleAuth = toggleGoogleAuth;

function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function syncLeaderboard() {
    if (!window.firebaseReady || !window.firebaseDb || !window.firebaseHelpers) return;

    const { uid, name } = getLeaderboardIdentity();
    const leaderboardRef = window.firebaseHelpers.ref(window.firebaseDb, `leaderboard/${uid}`);
    window.firebaseHelpers.set(leaderboardRef, {
        playerId: uid,
        name,
        money: Number(gameState.money || 0),
        fans: Number(gameState.fans || 0),
        updatedAt: window.firebaseHelpers.serverTimestamp ? window.firebaseHelpers.serverTimestamp() : Date.now()
    }).catch(() => {
        console.warn('Firebase leaderboard sync failed.');
    });
}

function renderLeaderboard(entries) {
    const list = document.getElementById('leaderboard-list');
    if (!list) return;

    if (!entries.length) {
        list.innerHTML = '<div class="leaderboard-row empty">No leaderboard data yet. Start playing to appear here.</div>';
        return;
    }

    list.innerHTML = entries.map((entry, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`;
        return `<div class="leaderboard-row"><span class="leaderboard-rank">${medal}</span><span class="leaderboard-name">${escapeHtml(entry.name || 'Unknown')}</span><span class="leaderboard-metrics">$${Number(entry.money || 0).toLocaleString()} · ${Number(entry.fans || 0).toLocaleString()} fans</span></div>`;
    }).join('');
}

function subscribeLeaderboard() {
    if (!window.firebaseReady || !window.firebaseDb || !window.firebaseHelpers) return;

    const leaderboardRef = window.firebaseHelpers.ref(window.firebaseDb, 'leaderboard');
    window.firebaseHelpers.onValue(leaderboardRef, snapshot => {
        const values = snapshot.val() || {};
        const entries = Object.values(values)
            .sort((a, b) => (Number(b.money || 0) - Number(a.money || 0)) || (Number(b.fans || 0) - Number(a.fans || 0)));
        renderLeaderboard(entries.slice(0, 8));
    }, () => {
        renderLeaderboard([]);
    });
}

function renderChatMessages(entries) {
    const feed = document.getElementById('chat-feed');
    if (!feed) return;

    if (!entries.length) {
        feed.innerHTML = '<div class="chat-empty">No chat messages yet. Start the conversation.</div>';
        return;
    }

    feed.innerHTML = entries.map(item => `
        <div class="chat-bubble">
            <div class="chat-bubble-head">${escapeHtml(item.name || 'CEO')}</div>
            <div class="chat-bubble-body">${escapeHtml(item.message || '')}</div>
        </div>
    `).join('');
    feed.scrollTop = feed.scrollHeight;
}

function subscribeChat() {
    if (!window.firebaseReady || !window.firebaseDb || !window.firebaseHelpers) return;

    const chatRef = window.firebaseHelpers.ref(window.firebaseDb, 'chat');
    window.firebaseHelpers.onValue(chatRef, snapshot => {
        const values = snapshot.val() || {};
        const entries = Object.entries(values)
            .map(([id, value]) => ({ id, ...value }))
            .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
        renderChatMessages(entries.slice(-20));
    }, () => {
        renderChatMessages([]);
    });
}

function sendChatMessage() {
    if (!window.firebaseReady || !window.firebaseDb || !window.firebaseHelpers) {
        alert('Firebase chat is unavailable right now.');
        return;
    }

    const input = document.getElementById('chat-input');
    if (!input) return;

    const message = input.value.trim();
    if (!message) return;

    const { name } = getLeaderboardIdentity();
    const chatRef = window.firebaseHelpers.ref(window.firebaseDb, 'chat');
    window.firebaseHelpers.push(chatRef, {
        name,
        message,
        createdAt: window.firebaseHelpers.serverTimestamp ? window.firebaseHelpers.serverTimestamp() : Date.now()
    }).catch(() => {
        alert('Firebase chat is unavailable right now.');
    });

    input.value = '';
}

window.sendChatMessage = sendChatMessage;

/* --- 3c. BOT MARKETPLACE (idle NPC purchases) --- */
const BOT_NAMES = [
    "xXx_Gamer99", "RetroQueen", "PixelPete", "8bitBandit", "NoobMaster69",
    "ConsoleCollector", "ByteMeDaily", "TurboTina", "GlitchGary", "SaveStateSam",
    "CartridgeKid", "LagLordLarry", "MintCondition_Mo", "SpeedrunSue", "JoystickJan"
];
let botInterval = null;

function startBotActivity() {
    if (botInterval) clearInterval(botInterval);
    botInterval = setInterval(() => {
        if (isSleeping) return; // don't sell while the sleep animation is running

        const inStock = Object.keys(gameState.stock).filter(name => gameState.stock[name] > 0);
        if (!inStock.length) return; // nothing available to buy

        const name = inStock[Math.floor(Math.random() * inStock.length)];
        const consoleDef = CONSOLE_TREE.find(c => c.name === name);
        const bot = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];

        const qty = Math.min(gameState.stock[name], 1 + Math.floor(Math.random() * 3));
        gameState.stock[name] -= qty;

        const saleAmount = Math.floor((15 + Math.random() * 60) * (1 + gameState.currentGen * 0.4)) * qty;
        const fanGain = Math.floor((1 + Math.random() * 4) * qty);

        gameState.money += saleAmount;
        gameState.fans += fanGain;
        gameState.botRevenue += saleAmount;

        const qtyLabel = qty > 1 ? `${qty}x ${name}` : `a ${name}`;
        addNotification(`🤖 ${bot} bought ${qtyLabel}! +$${saleAmount.toLocaleString()}`);
        showBotPurchasePopup(bot, { name, img: consoleDef ? consoleDef.file : '' }, saleAmount);

        if (gameState.stock[name] <= 0) {
            triggerStockOutRage(name);
            return; // triggerStockOutRage already saves + updates UI
        }

        saveGame();
        updateUI();
    }, 11000 + Math.random() * 6000);
}

/* Angry customers + security lockdown when a console model sells out completely */
function triggerStockOutRage(consoleName) {
    const fanPenalty = Math.floor(50 + Math.random() * 150);
    gameState.fans = Math.max(0, gameState.fans - fanPenalty);
    gameState.timesLockedOut++;

    addNotification(`😡 SOLD OUT: ${consoleName} stock hit zero! Furious fans are flooding your inbox. -${fanPenalty} Fans`);
    updateTicker(`OUTRAGE: ${consoleName} IS SOLD OUT — FANS ARE FURIOUS!`);
    saveGame();
    updateUI();
    lockdownStudio(consoleName);
}

function lockdownStudio(consoleName) {
    // Access key verification removed.
    // If a lockdown would occur, keep the game accessible (remove any passkey/lockout behavior).
    // No DOM changes needed - lockdown no longer blocks access.
}


/* --- 3d. REPAIR BAY (defective batches) --- */
function maybeGenerateDefect() {
    if (!gameState.history.length) return;
    const defectChance = Math.max(0.06, 0.25 - gameState.unlockedTech.length * 0.015);
    if (Math.random() >= defectChance) return;

    const item = gameState.history[Math.floor(Math.random() * gameState.history.length)];
    const repairCost = Math.max(50, Math.floor(150 + gameState.currentGen * 120 + Math.random() * 150));
    gameState.brokenPackages.push({
        id: 'defect_' + Date.now() + '_' + Math.floor(Math.random() * 10000),
        name: item.name,
        img: item.img,
        repairCost,
        day: gameState.day
    });
    addNotification(`⚠️ DEFECT REPORT: A batch of ${item.name} arrived damaged!`);
    updateTicker(`WARNING: Damaged ${item.name} units awaiting repair!`);
}

function renderRepairPanel() {
    const list = document.getElementById('repair-list');
    if (!list) return;
    if (!gameState.brokenPackages.length) {
        list.innerHTML = `<p class="repair-empty">No defects reported.<br>All systems nominal. ✅</p>`;
        return;
    }

    const totalCost = gameState.brokenPackages.reduce((sum, p) => sum + p.repairCost, 0);
    // Build DOM nodes for more robust layout
    list.innerHTML = '';
    gameState.brokenPackages.forEach(p => {
        const item = document.createElement('div');
        item.className = 'repair-item';
        item.innerHTML = `
            <img src="${p.img}" alt="${p.name}">
            <div class="repair-info">
                <strong>${p.name}</strong>
                <p>Defective batch · Day ${p.day}</p>
                <button class="repair-single-btn">REPAIR ($${p.repairCost.toLocaleString()})</button>
            </div>
        `;
        const btn = item.querySelector('.repair-single-btn');
        btn.addEventListener('click', () => repairPackage(p.id));
        list.appendChild(item);
    });

    if (gameState.brokenPackages.length > 1) {
        const btn = document.createElement('button');
        btn.style = 'width:100%;margin-top:10px;border-color:#10b981;color:#10b981;';
        btn.innerText = `REPAIR ALL ($${totalCost.toLocaleString()})`;
        btn.onclick = repairAll;
        list.appendChild(btn);
    }
}

function repairPackage(id) {
    const idx = gameState.brokenPackages.findIndex(p => p.id === id);
    if (idx === -1) return;
    const pkg = gameState.brokenPackages[idx];
    if (gameState.money < pkg.repairCost) return alert("NOT ENOUGH FUNDS TO REPAIR!");

    gameState.money -= pkg.repairCost;
    gameState.fans += Math.floor(pkg.repairCost / 50);
    gameState.totalRepaired++;
    gameState.brokenPackages.splice(idx, 1);
    addNotification(`🔧 REPAIRED: ${pkg.name} batch back in stock!`);
    saveGame();
    updateUI();
}

function repairAll() {
    if (!gameState.brokenPackages.length) return;
    const totalCost = gameState.brokenPackages.reduce((sum, p) => sum + p.repairCost, 0);
    if (gameState.money < totalCost) return alert("NOT ENOUGH FUNDS TO REPAIR ALL!");

    gameState.money -= totalCost;
    gameState.fans += Math.floor(totalCost / 50);
    gameState.totalRepaired += gameState.brokenPackages.length;
    addNotification(`🔧 REPAIRED ALL: ${gameState.brokenPackages.length} batches fixed!`);
    gameState.brokenPackages = [];
    saveGame();
    updateUI();
}

/* --- 4. ENGINE FUNCTIONS --- */
window.onload = () => {
    const saved = localStorage.getItem('pixlectMasterSave');
    if (saved) gameState = Object.assign({}, gameState, JSON.parse(saved));
    if (!gameState.unlockedNS2AtDay && gameState.unlockedNS2AtDay !== 0) gameState.unlockedNS2AtDay = null;
    if (!gameState.companyName) gameState.companyName = prompt("ENTER CEO NAME:") || "CEO";
    if (!gameState.unlockedAchievements) gameState.unlockedAchievements = [];
    if (!gameState.awards) gameState.awards = [];
    if (!gameState.totalLinesTyped) gameState.totalLinesTyped = 0;
    if (!gameState.totalReleases) gameState.totalReleases = 0;
    if (!gameState.brokenPackages) gameState.brokenPackages = [];
    if (!gameState.totalRepaired) gameState.totalRepaired = 0;
    if (!gameState.botRevenue) gameState.botRevenue = 0;
    if (!gameState.stock) gameState.stock = {};
    if (!gameState.timesLockedOut) gameState.timesLockedOut = 0;

    // Access key removed: no lock-screen present


    ensureFirebaseSessionId();
    initFirebaseAuth();
    updateAuthUi();
    syncLeaderboard();
    subscribeLeaderboard();
    subscribeChat();

    updateUI();
    startBotActivity();
};

function saveGame() {
    localStorage.setItem('pixlectMasterSave', JSON.stringify(gameState));
    syncLeaderboard();
}

function updateUI() {
    document.getElementById('display-company-name').innerText = gameState.companyName;
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

    const stockDisplay = document.getElementById('stock-display');
    if (stockDisplay) {
        const inStock = gameState.stock[current.name] || 0;
        stockDisplay.innerText = `Stock: ${inStock.toLocaleString()} unit${inStock === 1 ? '' : 's'}`;
        stockDisplay.style.color = inStock === 0 ? '#ef4444' : '#94a3b8';
    }

    if (next) {
        document.getElementById('next-goal-text').innerText = `Goal: ${next.fansNeeded.toLocaleString()} Fans for ${next.name}`;
        document.getElementById('buy-btn').style.display = (gameState.fans >= next.fansNeeded) ? "block" : "none";
        document.getElementById('buy-btn').innerText = `UPGRADE TO ${next.name} ($${next.cost.toLocaleString()})`;
    } else {
        document.getElementById('next-goal-text').innerText = "PEAK TECHNOLOGY REACHED";
        document.getElementById('buy-btn').style.display = "none";
    }



    document.getElementById('notification-list').innerHTML = gameState.inbox.map(m => `<div class="mail-item">${m}</div>`).join('');

    // Persisted Awards (rebuilt from state, not appended each call)
    const awardsList = document.getElementById('awards-list');
    if (awardsList) {
        awardsList.innerHTML = gameState.awards.length
            ? gameState.awards.map(a => `<div>⭐ Day ${a.day}: ${a.name}</div>`).join('')
            : "No awards yet.";
    }

    renderAchievements();
    renderRepairPanel();
    checkAchievements();
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
        ramSelect.querySelector('option[value="8192"]').disabled = !gameState.unlockedTech.includes("8 MB RAM");
        ramSelect.querySelector('option[value="16384"]').disabled = !gameState.unlockedTech.includes("16 MB RAM");
    }

    const mediaSelect = document.getElementById('conf-media');
    if(mediaSelect) {
        const cdOption = mediaSelect.querySelector('option[value="300"]');
        const cdUnlocked = gameState.unlockedTech.includes("Optical Drive");
        cdOption.disabled = !cdUnlocked;
        cdOption.textContent = cdUnlocked ? "CD-ROM" : "CD-ROM (LOCKED)";
    }

    const secBox = document.getElementById('conf-security');
    if(secBox) secBox.disabled = !gameState.unlockedTech.includes("Anti-Piracy Seal");
    const secLabel = secBox ? secBox.closest('.config-option')?.querySelector('label') : null;
    if (secLabel) secLabel.textContent = gameState.unlockedTech.includes("Anti-Piracy Seal") ? "SECURITY SEAL:" : "SECURITY SEAL: (LOCKED)";
}

function updateWorkshopPreview() {
    let idx = document.getElementById('model-select').value;
    let def = CONSOLE_TREE[idx];
    document.getElementById('workshop-preview-img').src = def.file;
    const stockLabel = document.getElementById('workshop-stock-label');
    if (stockLabel) {
        const inStock = gameState.stock[def.name] || 0;
        stockLabel.innerText = `Current Stock: ${inStock.toLocaleString()} unit${inStock === 1 ? '' : 's'}`;
    }
}

function updateSlider() {
    let val = document.getElementById('unit-slider').value;
    document.getElementById('unit-count').innerText = val;
    // Unit price is $20 each (so $200 buys 10 units)
    document.getElementById('total-cost-display').innerText = "$" + (val * 20).toLocaleString();
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
    gameState.totalReleases++;
    gameState.totalLinesTyped += tempBatch.chars;

    const releasedName = CONSOLE_TREE[tempBatch.modelIndex].name;
    gameState.stock[releasedName] = (gameState.stock[releasedName] || 0) + tempBatch.units;

    updateTicker(`LATEST RELEASE: ${CONSOLE_TREE[tempBatch.modelIndex].name} Rating: ${score}/10`);
    addNotification(`RELEASE: ${CONSOLE_TREE[tempBatch.modelIndex].name} rated ${score}/10!`);
    document.getElementById('config-screen').style.display = 'none';

    // Win condition: unlock NS2 when releasing Nintendo Switch 2 model
    const ns2Name = "Mintendo Smitch 2";
    if (CONSOLE_TREE[tempBatch.modelIndex] && CONSOLE_TREE[tempBatch.modelIndex].name === ns2Name) {
        if (gameState.unlockedNS2AtDay == null) {
            gameState.unlockedNS2AtDay = gameState.day;
            // Win notification removed
            updateTicker(`NS2 UNLOCKED.`);

        }
    }


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
const DAY_EVENTS = [
    { msg: "A viral retro-gaming video boosted your visibility! +200 Fans", apply: gs => gs.fans += 200, chance: 0.15 },
    { msg: "A competitor's console flopped, fans flocked to you! +150 Fans", apply: gs => gs.fans += 150, chance: 0.1 },
    { msg: "Server costs ate into your budget. -$100", apply: gs => gs.money = Math.max(0, gs.money - 100), chance: 0.1 },
    { msg: "A tech blog featured your studio! +$300", apply: gs => gs.money += 300, chance: 0.1 }
];

function rollDayEvent() {
    for (const ev of DAY_EVENTS) {
        if (Math.random() < ev.chance) {
            ev.apply(gameState);
            addNotification(`📰 ${ev.msg}`);
            updateTicker(ev.msg);
            break; // only one event per day
        }
    }
}

let isSleeping = false;
function nextDay() {
    if (isSleeping) return;
    isSleeping = true;

    const overlay = document.getElementById('sleep-overlay');
    const dayLabel = document.getElementById('sleep-day-label');
    if (overlay) {
        if (dayLabel) dayLabel.innerText = `DAY ${gameState.day} COMPLETE`;
        overlay.style.display = 'flex';
        void overlay.offsetWidth; // force reflow so the animation restarts every time
        overlay.classList.add('active');
        setTimeout(() => {
            overlay.classList.remove('active');
            overlay.style.display = 'none';
            isSleeping = false;
            advanceDay();
        }, 1900);
    } else {
        isSleeping = false;
        advanceDay();
    }
}

function advanceDay() {
    gameState.day++;
    
    if (Math.random() < 0.3) {
        const trends = ["RETRO", "HANDHELD", "POWER", "BUDGET"];
        gameState.currentTrend = trends[Math.floor(Math.random() * trends.length)];
        updateTicker(`MARKET TREND SHIFT: ${gameState.currentTrend} IS NOW POPULAR!`);
    }

    rollDayEvent();
    maybeGenerateDefect();

    // Weekly Awards
    if (gameState.day % 7 === 0) {
        let weeklyReleases = gameState.history.filter(h => h.day > gameState.day - 7);
        if (weeklyReleases.length > 0) {
            weeklyReleases.sort((a, b) => b.score - a.score);
            let best = weeklyReleases[0];
            if (best.score >= 8.5) {
                let prize = 5000 * (gameState.currentGen + 1);
                gameState.fans += prize;
                gameState.awards.push({ day: gameState.day, name: best.name });
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

function togglePanel(panelId) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    panel.classList.toggle('collapsed');
    const btn = panel.querySelector('.panel-toggle');
    if (btn) btn.innerText = panel.classList.contains('collapsed') ? '+' : '−';
}
function openGallery() {
    document.getElementById('gallery-screen').style.display = 'flex';
    document.getElementById('gallery-list').innerHTML = gameState.history.map(item => {
        const inStock = gameState.stock[item.name] || 0;
        return `
        <div class="gallery-item" style="border: 1px solid #00d9ff; padding: 10px; margin: 5px;">
            <img src="${item.img}" style="background:${item.color}; width:40px; border-radius: 5px;">
            <p><strong>${item.name}</strong><br>Rating: ${item.score}/10<br>Day: ${item.day}</p>
            <p style="color:${inStock === 0 ? '#ef4444' : '#10b981'}; font-weight:bold;">
                ${inStock === 0 ? 'SOLD OUT' : `Stock: ${inStock.toLocaleString()}`}
            </p>
        </div>`;
    }).join('');
}

function closeWorkshop() { document.getElementById('workshop-screen').style.display = 'none'; }

// BILL/CANCEL flow for making consoles inside the workshop
window.finalizeWorkshopPurchase = function() {
    // In this game, “BILL” purchases the coding step fee (base cost), then moves to coding.
    // Cancel/Back returns to home.
    if (!document.getElementById('workshop-screen')) return;

    // Require player to have enough funds for at least the base cost shown on UI.
    // Base billing: unit price is $20 each
    const baseCost = 20 * (parseInt(document.getElementById('unit-slider')?.value || '1', 10) || 1);
    if (gameState.money < baseCost) return alert('INSUFFICIENT FUNDS FOR BILL!');

    // Deduct base cost immediately
    gameState.money -= baseCost;
    addNotification(`🧾 BILL PAID: -$${baseCost.toLocaleString()}`);
    saveGame();

    // Go to coding OS
    startCodingOS();

    // Move workshop out of the way now; coding-screen will open
    try {
        document.getElementById('workshop-screen').style.display = 'none';
    } catch (e) {}
};

function closeGallery() { document.getElementById('gallery-screen').style.display = 'none'; }
function closeResearch() { document.getElementById('research-screen').style.display = 'none'; }

function resetGame() {
    if (confirm("ARE YOU SURE? This will delete all progress!")) {
        localStorage.clear();
        location.reload();
    }
}

/* --- 9. ANTI-TAMPER: block copy/paste/context menu outside form fields, warn in console --- */
function isFormField(target) {
    return target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
}

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('copy', e => { if (!isFormField(e.target)) e.preventDefault(); });
document.addEventListener('cut', e => { if (!isFormField(e.target)) e.preventDefault(); });
document.addEventListener('paste', e => { if (!isFormField(e.target)) e.preventDefault(); });
document.addEventListener('selectstart', e => { if (!isFormField(e.target)) e.preventDefault(); });
document.addEventListener('keydown', e => {
    if (isFormField(e.target)) return;
    const key = e.key ? e.key.toLowerCase() : '';
    const blockedCombo = (e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'u', 's'].includes(key);
    if (blockedCombo || key === 'f12') e.preventDefault();
});

console.log('%cSTOP!', 'color:#ef4444; font-size:60px; font-weight:bold; text-shadow: 2px 2px 0 #000;');
console.log('%cThis is a browser feature intended for developers. Pasting code here from someone else could let them access your PIXLECT Studios account or data. If you don\'t know exactly what a script does, do not paste it here.', 'color:#00d9ff; font-size:16px;');

/* --- 10. CODE TERMINAL: no pasting allowed, has to be typed by hand --- */
document.addEventListener('DOMContentLoaded', () => {
    const codeTerminal = document.getElementById('code-terminal');
    const pasteWarning = document.getElementById('paste-warning');
    const chatInput = document.getElementById('chat-input');
    if (!codeTerminal) return;

    let warningTimeout = null;
    function flashPasteWarning(msg) {
        if (!pasteWarning) return;
        pasteWarning.innerText = msg;
        clearTimeout(warningTimeout);
        warningTimeout = setTimeout(() => { pasteWarning.innerText = ''; }, 2200);
    }

    if (chatInput) {
        chatInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }

    codeTerminal.addEventListener('paste', e => {
        e.preventDefault();
        flashPasteWarning('🚫 PASTING BLOCKED — type the code yourself!');
    });
    codeTerminal.addEventListener('drop', e => {
        e.preventDefault();
        flashPasteWarning('🚫 DRAG-AND-DROP BLOCKED — type the code yourself!');
    });
    codeTerminal.addEventListener('contextmenu', e => e.preventDefault());
});