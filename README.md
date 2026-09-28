# Phishing Email Simulation

An in-browser awareness lab that trains people to classify mock inbox messages as phishing or legitimate. You work through eight mixed cases, get per-message feedback, and receive a private session report. Nothing is sent, and no real mailboxes are contacted.

## Features

- Mock inbox with eight shuffled messages (phishing and legitimate)
- Common social-engineering patterns: brand impersonation, credential theft, BEC, delivery lures, malware attachments, invoice fraud, and routine internal mail
- Classify each message as **Phishing** or **Legitimate**
- Optional hint plus simulated links that never navigate away
- Immediate red flags and a prevention note after each decision
- Session report: accuracy, missed items, average decision time, bait clicks, risk level, and category breakdown
- Built-in prevention playbook
- Local training history (this browser only) and JSON export
- Fully client-side — no server, no account, no outbound email

## How to Run

Open `index.html` in a modern web browser (double-click the file, or drag it into a browser window).

No install or backend is required.

## How to Use

1. On **Overview**, enter a participant name (optional session label) and choose **Begin simulation**.
2. Open each message in the inbox. Inspect the From address, body, and any simulated link or attachment.
3. Classify the message. After you decide, review the explanation, then continue.
4. When all eight messages are done, read the **Awareness summary**.
5. Use **Open playbook** for habits to keep, **Export JSON** to save local results, or **Run again** for a new shuffled set.
6. **History** lists up to 30 previous sessions stored on this device.

## Training Cases

| Category | What it practices |
| --- | --- |
| Brand impersonation | Lookalike domains and fake “account limited” urgency |
| Credential theft | Fake password-reset pages on unofficial domains |
| Business email compromise | Executive impersonation and secret wire requests |
| Delivery lure | Unexpected parcel fees and unofficial carrier sites |
| Malware lure | Fake IT patches and `.exe` attachments |
| Invoice fraud | Homoglyph vendor domains and sudden bank-detail changes |
| Internal mail | Legitimate workplace messages with no credential or payment ask |

## Files

- `index.html` — Lab layout (overview, inbox, results, playbook, history)
- `style.css` — Styling and layout
- `script.js` — Cases, scoring, local storage, and UI behavior

## Privacy

- Scores and history stay in this browser (`localStorage`).
- Simulated links are illustrative lookalikes; they do not open real sites.
- Attachments are labels only — no files are downloaded or executed.

## Intended Use

This is an educational simulation for authorized awareness training. Do not use it as a template to send unsolicited or deceptive messages. Do not run real phishing against people or systems you do not own and have permission to test.

## Browser Compatibility

Works in current versions of Chrome, Edge, Firefox, Safari, and Opera.

## Learning Outcomes

- Practice spotting lookalike domains, urgency, and mismatched display names
- Distinguish routine internal mail from social-engineering lures
- Understand why following email links and running unexpected attachments is high risk
- Connect individual habits to simple process controls (MFA, report-phish, dual control for payments)
