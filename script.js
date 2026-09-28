const STORAGE_KEY = "phishingLabHistory";
const USER_KEY = "LabUser";

/** Training cases only. Links never navigate; destinations are illustrative lookalikes. */
const CASES = [
    {
        id: "paypal-urgency",
        from: "PayPal Security <security@paypal-secure-alerts.com>",
        subject: "Action required: your account will be limited",
        dateLabel: "Today, 08:14",
        body: `We noticed unusual activity on your account.

To keep your balance available, confirm your identity within 12 hours.

If we do not hear from you, payments may be paused.`,
        link: { label: "Confirm my account", href: "https://paypal-secure-alerts.com/verify" },
        isPhishing: true,
        category: "Brand impersonation",
        difficulty: "Medium",
        redFlags: [
            "The address uses paypal-secure-alerts.com, not paypal.com.",
            "A hard deadline is used to skip careful checking.",
            "The greeting is generic; real notices usually name the account holder."
        ],
        prevention: "Open paypal.com yourself or use the app. Do not follow account-recovery links from email.",
        hint: "Compare the domain after the @ with the company’s real website."
    },
    {
        id: "hr-handbook",
        from: "Sarah Okonkwo <s.okonkwo@northwind.example>",
        subject: "Handbook update — remote work section",
        dateLabel: "Yesterday, 16:02",
        body: `Hi team,

The remote-work section of the handbook was updated on the intranet. Please read it before Friday stand-up.

No action is needed in this thread other than the review.

Sarah Okonkwo
People Operations`,
        isPhishing: false,
        category: "Internal mail",
        difficulty: "Easy",
        redFlags: [
            "Internal domain matches the training tenant (northwind.example).",
            "No payment, password, or download request.",
            "Tone is routine and allows time to review."
        ],
        prevention: "Still confirm policy changes on the intranet if a message ever asks you to sign in elsewhere.",
        hint: "Ask whether the request is ordinary for this sender and whether it asks you to leave trusted systems."
    },
    {
        id: "microsoft-reset",
        from: "Microsoft Account Team <no-reply@microsoft-account-security.net>",
        subject: "Password reset",
        dateLabel: "Today, 09:41",
        body: `A password reset was requested for your Microsoft account.

If this was not you, secure the account immediately.`,
        link: { label: "Reset password now", href: "https://microsoft-account-security.net/reset" },
        isPhishing: true,
        category: "Credential theft",
        difficulty: "Medium",
        redFlags: [
            "microsoft-account-security.net is not a Microsoft-owned login domain.",
            "The mail tries to make you use their link instead of account.microsoft.com.",
            "A one-hour expiry is classic pressure."
        ],
        prevention: "Type the official sign-in address yourself. Never reuse a reset link from unexpected mail.",
        hint: "Real password pages live on the vendor’s own domain, not a lookalike."
    },
    {
        id: "tech-newsletter",
        from: "Northwind Digest <digest@northwind.example>",
        subject: "Weekly ops digest",
        dateLabel: "Mon, 07:00",
        body: `This week:

• Change freeze Thursday 18:00–22:00
• New visitor Wi-Fi SSID posted on the intranet
• Reminder: report suspicious mail with the Report button

Unsubscribe is available in the intranet profile, not in this message.`,
        isPhishing: false,
        category: "Internal mail",
        difficulty: "Easy",
        redFlags: [
            "Known internal sender and domain.",
            "Operational content with no credential or payment ask.",
            "Points people to existing internal processes."
        ],
        prevention: "Newsletters can still be forged. Bookmark official sources instead of hunting links in mail.",
        hint: "Legitimate internal digests rarely need you to sign in through a surprise page."
    },
    {
        id: "bec-wire",
        from: "Jordan Hale (CEO) <j.hale@northwind-exec.com>",
        subject: "Need this handled before the board call",
        dateLabel: "Today, 11:03",
        body: `I am in a session and cannot take calls.

Please send 45,000 to the supplier on the attached coordinates. Treat as confidential — do not loop in finance yet.

I will explain after the meeting.`,
        attachment: "supplier-payment.txt (simulation — not a real file)",
        isPhishing: true,
        category: "Business email compromise",
        difficulty: "Hard",
        redFlags: [
            "Display name is the CEO; the domain is northwind-exec.com, not northwind.example.",
            "Secrecy plus speed is used to skip dual control.",
            "Finance is explicitly told not to be involved."
        ],
        prevention: "Payment requests from executives go through a known process and a callback to a listed number.",
        hint: "Would your finance policy allow a secret wire started only from email?"
    },
    {
        id: "parcel",
        from: "Delivery Desk <updates@parcel-status-center.net>",
        subject: "Your package could not be delivered",
        dateLabel: "Today, 13:22",
        body: `We missed you at the door.

Pay a small redelivery fee so the parcel is not returned to the warehouse.`,
        link: { label: "Schedule redelivery", href: "http://parcel-status-center.net/fee" },
        isPhishing: true,
        category: "Delivery lure",
        difficulty: "Easy",
        redFlags: [
            "Unexpected fee for a parcel you may not have ordered.",
            "Unofficial domain and an unencrypted http link in the simulation.",
            "Uses inconvenience to rush a payment."
        ],
        prevention: "Check tracking in the retailer’s account or the carrier’s official app.",
        hint: "Did you expect a delivery, and does the carrier’s real site match this domain?"
    },
    {
        id: "it-patch",
        from: "IT Helpdesk <helpdesk@northwind.example>",
        subject: "Mandatory: install security patch",
        dateLabel: "Today, 14:55",
        body: `A critical patch must be installed in the next two hours.

Download the attached updater and run it as administrator. Do not wait for the software center.`,
        attachment: "security_update.exe (simulation — do not run real executables from email)",
        isPhishing: true,
        category: "Malware lure",
        difficulty: "Hard",
        redFlags: [
            "IT almost never emails .exe files for staff to run locally.",
            "Bypassing the software center is a warning sign.",
            "Two-hour deadline reduces the chance you will ask a colleague."
        ],
        prevention: "Use the official software center or a ticket. Never run unexpected executables from mail.",
        hint: "How does your organization actually ship patches?"
    },
    {
        id: "invoice-vendor",
        from: "Apex Supplies Billing <billing@apex-supp1ies.com>",
        subject: "Invoice 88421 — overdue",
        dateLabel: "Today, 15:18",
        body: `Invoice 88421 is 14 days overdue.

To avoid interruption of supply, settle via the portal today. Bank details were updated this morning.`,
        link: { label: "Open invoice portal", href: "https://apex-supp1ies.com/pay" },
        isPhishing: true,
        category: "Invoice fraud",
        difficulty: "Hard",
        redFlags: [
            "The domain uses a digit 1 in supp1ies — a homoglyph trick.",
            "Sudden bank-detail change is a classic invoice-fraud move.",
            "Overdue language is meant to skip vendor-master checks."
        ],
        prevention: "Confirm bank-detail changes out of band using a known vendor contact, not the email thread.",
        hint: "Read the domain slowly. Look for swapped letters and new payment instructions."
    }
];

const state = {
    view: "home",
    name: "",
    cohort: "",
    queue: [],
    index: 0,
    answers: [],
    startedAt: 0,
    hintUsed: false,
    linkClicked: false
};

function $(id) {
    return document.getElementById(id);
}

function toast(message) {
    const el = $("toast");
    el.textContent = message;
    el.hidden = false;
    window.clearTimeout(toast._t);
    toast._t = window.setTimeout(() => {
        el.hidden = true;
    }, 2800);
}

function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
        return [];
    }
}

function saveHistory(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 30)));
}

function shuffle(list) {
    const copy = list.slice();
    for (let i = copy.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function showView(name) {
    state.view = name;
    document.querySelectorAll(".view").forEach((section) => {
        section.hidden = section.id !== `view-${name}`;
    });
    document.querySelectorAll(".nav-link").forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.view === name || (name === "lab" && btn.dataset.view === "home"));
    });
}

function currentCase() {
    return state.queue[state.index];
}

function alreadyAnswered(id) {
    return state.answers.some((a) => a.id === id);
}

function renderInbox() {
    const list = $("threadList");
    list.innerHTML = "";
    state.queue.forEach((item, i) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "thread";
        if (i === state.index) btn.classList.add("active");
        if (alreadyAnswered(item.id)) btn.classList.add("done");
        btn.innerHTML = `<div class="from">${escapeHtml(item.from.split("<")[0].trim())}</div><div class="subj">${escapeHtml(item.subject)}</div>`;
        btn.addEventListener("click", () => {
            if (alreadyAnswered(item.id) || i === state.index) {
                state.index = i;
                renderMessage();
                renderInbox();
            }
        });
        li.appendChild(btn);
        list.appendChild(li);
    });
    $("inboxMeta").textContent = `${state.queue.length} messages`;
    $("progressBadge").textContent = `${state.answers.length} / ${state.queue.length}`;
}

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

function renderMessage() {
    const item = currentCase();
    if (!item) return;

    $("msgSubject").textContent = item.subject;
    $("msgFrom").textContent = item.from;
    $("msgDate").textContent = item.dateLabel;
    $("sessionWho").textContent = state.cohort ? `${state.name} · ${state.cohort}` : state.name;

    const body = $("msgBody");
    body.innerHTML = "";
    body.appendChild(document.createTextNode(item.body));

    if (item.link) {
        body.appendChild(document.createTextNode("\n\n"));
        const link = document.createElement("button");
        link.type = "button";
        link.className = "sim-link";
        link.textContent = item.link.label;
        link.dataset.href = item.link.href;
        link.title = `Simulated destination: ${item.link.href}`;
        link.addEventListener("click", () => onSimulatedLink(item));
        body.appendChild(link);
        const note = document.createElement("div");
        note.className = "tiny";
        note.textContent = "Hover to preview the simulated URL. Clicks stay inside this lab.";
        body.appendChild(note);
    }

    if (item.attachment) {
        const att = document.createElement("div");
        att.className = "attachment";
        att.textContent = item.attachment;
        body.appendChild(att);
    }

    const answered = alreadyAnswered(item.id);
    $("decidePane").hidden = answered;
    $("feedbackPane").hidden = !answered;
    if (answered) {
        const record = state.answers.find((a) => a.id === item.id);
        paintFeedback(item, record);
    } else {
        state.startedAt = Date.now();
        state.hintUsed = false;
        state.linkClicked = false;
        $("feedbackPane").classList.remove("ok", "bad");
    }
}

function onSimulatedLink(item) {
    state.linkClicked = true;
    if (item.isPhishing) {
        toast("Simulated bait link recorded. In a real attack this would be unsafe.");
    } else {
        toast("Link stays in the lab. Prefer opening known sites directly.");
    }
}

function classify(choice) {
    const item = currentCase();
    if (!item || alreadyAnswered(item.id)) return;

    const seconds = Math.max(1, Math.round((Date.now() - state.startedAt) / 1000));
    const correct = (choice === "phishing") === item.isPhishing;
    const baitClick = Boolean(item.isPhishing && state.linkClicked);

    state.answers.push({
        id: item.id,
        category: item.category,
        difficulty: item.difficulty,
        choice,
        correct,
        seconds,
        hintUsed: state.hintUsed,
        baitClick
    });

    paintFeedback(item, state.answers[state.answers.length - 1]);
    $("decidePane").hidden = true;
    $("feedbackPane").hidden = false;
    renderInbox();
}

function paintFeedback(item, record) {
    const pane = $("feedbackPane");
    pane.classList.toggle("ok", record.correct);
    pane.classList.toggle("bad", !record.correct);

    const title = record.correct ? "Correct classification" : "Incorrect classification";
    const verdict = item.isPhishing ? "This message is a phishing simulation." : "This message is legitimate in this lab.";
    const clickNote = record.baitClick
        ? "<p>You also activated a simulated malicious link. That is treated as a high-risk action.</p>"
        : "";

    $("feedbackInner").innerHTML = `
        <h3>${title}</h3>
        <p>${verdict} ${item.category} · ${item.difficulty}</p>
        ${clickNote}
        <p class="flags"><strong>What to look for</strong></p>
        <ul>${item.redFlags.map((flag) => `<li>${escapeHtml(flag)}</li>`).join("")}</ul>
        <p class="flags"><strong>Prevention</strong> — ${escapeHtml(item.prevention)}</p>
    `;

    $("nextBtn").textContent = state.answers.length >= state.queue.length ? "View report" : "Next message";
}

function finishSession() {
    const total = state.queue.length;
    const correct = state.answers.filter((a) => a.correct).length;
    const accuracy = Math.round((correct / total) * 100);
    const avg = Math.round(state.answers.reduce((sum, a) => sum + a.seconds, 0) / total);
    const clicks = state.answers.filter((a) => a.baitClick).length;
    const missed = total - correct;

    const session = {
        date: new Date().toISOString(),
        name: state.name,
        cohort: state.cohort,
        accuracy,
        correct,
        missed,
        avg,
        clicks,
        answers: state.answers
    };

    const history = loadHistory();
    history.unshift(session);
    saveHistory(history);

    $("finalAccuracy").textContent = `${accuracy}%`;
    $("correctCount").textContent = String(correct);
    $("incorrectCount").textContent = String(missed);
    $("avgTime").textContent = `${avg}s`;
    $("clickCount").textContent = String(clicks);
    $("resultsIntro").textContent = `${state.name}, you classified ${total} simulated messages. Use the gaps below as a training plan, not a scoreboard.`;

    let level = "Elevated exposure";
    let copy = "Several common lures were missed. Slow down on urgency, money, and sign-in requests.";
    if (accuracy >= 85 && clicks === 0) {
        level = "Low exposure";
        copy = "Strong pattern recognition. Keep dual-control for payments and stay current on lookalike domains.";
    } else if (accuracy >= 70) {
        level = "Moderate exposure";
        copy = "Basics are in place. Harder cases (BEC, invoice fraud, fake IT) still need practice.";
    }
    if (clicks > 0) {
        copy += " Simulated bait clicks show a habit of following the message instead of a known site.";
    }

    $("riskLevel").textContent = level;
    $("riskCopy").textContent = copy;

    const byCat = {};
    state.answers.forEach((a) => {
        if (!byCat[a.category]) byCat[a.category] = { ok: 0, n: 0 };
        byCat[a.category].n += 1;
        if (a.correct) byCat[a.category].ok += 1;
    });
    $("categoryBreakdown").innerHTML = Object.entries(byCat)
        .map(([cat, v]) => {
            const pct = Math.round((v.ok / v.n) * 100);
            return `<div class="cat-row"><span>${escapeHtml(cat)}</span><span>${pct}% (${v.ok}/${v.n})</span></div>`;
        })
        .join("");

    const recs = [];
    const weak = Object.entries(byCat).filter(([, v]) => v.ok / v.n < 1);
    if (weak.length) {
        recs.push(`Drill the weaker categories: ${weak.map(([c]) => c).join(", ")}.`);
    }
    if (clicks) recs.push("Open official sites from bookmarks. Do not use email as a navigation bar.");
    if (state.answers.some((a) => a.seconds < 8 && !a.correct)) {
        recs.push("Very fast misses suggest reacting to urgency. Pause and check the domain first.");
    }
    recs.push("Enable MFA and a one-click report-phish button in the real mail client.");
    recs.push("Require a second person for payment or vendor-bank changes.");
    recs.push("Repeat short simulations; awareness decays without practice.");
    $("recommendations").innerHTML = recs.map((r) => `<li>${escapeHtml(r)}</li>`).join("");

    showView("results");
}

function startLab(name, cohort) {
    state.name = name;
    state.cohort = cohort;
    state.queue = shuffle(CASES);
    state.index = 0;
    state.answers = [];
    localStorage.setItem(USER_KEY, JSON.stringify({ name, cohort }));
    showView("lab");
    renderInbox();
    renderMessage();
}

function renderHistory() {
    const list = $("historyList");
    const history = loadHistory();
    if (!history.length) {
        list.innerHTML = "<p class=\"muted\">No sessions yet.</p>";
        return;
    }
    list.innerHTML = history
        .map((s) => {
            const when = new Date(s.date).toLocaleString();
            const extra = s.cohort ? ` · ${escapeHtml(s.cohort)}` : "";
            return `<div class="history-item"><div><div>${escapeHtml(s.name)}${extra}</div><div class="tiny">${escapeHtml(when)} · ${s.correct}/${s.correct + s.missed} correct · ${s.clicks} bait click(s)</div></div><strong>${s.accuracy}%</strong></div>`;
        })
        .join("");
}

function exportLatest() {
    const history = loadHistory();
    if (!history.length) {
        toast("No results to export yet.");
        return;
    }
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), sessions: history }, null, 2)], {
        type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aegis-awareness-report.json";
    a.click();
    URL.revokeObjectURL(url);
}

function bind() {
    document.querySelectorAll("[data-view]").forEach((el) => {
        el.addEventListener("click", () => {
            const target = el.dataset.view;
            if (target === "history") renderHistory();
            showView(target);
        });
    });

    $("startForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const name = $("participantName").value.trim();
        if (!name) {
            toast("Enter a participant name to start.");
            return;
        }
        startLab(name, $("cohort").value.trim());
    });

    $("markPhish").addEventListener("click", () => classify("phishing"));
    $("markLegit").addEventListener("click", () => classify("legitimate"));

    $("nextBtn").addEventListener("click", () => {
        if (state.answers.length >= state.queue.length) {
            finishSession();
            return;
        }
        const next = state.queue.findIndex((item) => !alreadyAnswered(item.id));
        state.index = next === -1 ? state.index : next;
        renderInbox();
        renderMessage();
    });

    $("hintBtn").addEventListener("click", () => {
        const item = currentCase();
        if (!item) return;
        state.hintUsed = true;
        toast(item.hint);
    });

    $("exitBtn").addEventListener("click", () => {
        if (state.answers.length && !window.confirm("Leave the inbox? Unfinished messages are not saved.")) return;
        showView("home");
    });

    $("retryBtn").addEventListener("click", () => showView("home"));
    $("exportBtn").addEventListener("click", exportLatest);

    try {
        const saved = JSON.parse(localStorage.getItem(USER_KEY) || "null");
        if (saved?.name) $("participantName").value = saved.name;
        if (saved?.cohort) $("cohort").value = saved.cohort;
    } catch {
        /* ignore */
    }

    const history = loadHistory();
    if (history.length) {
        $("lastSession").hidden = false;
        $("prevAccuracy").textContent = `${history[0].accuracy}%`;
        $("prevCount").textContent = String(history.length);
    }
}

document.addEventListener("DOMContentLoaded", bind);
