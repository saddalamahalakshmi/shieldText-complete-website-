const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "shieldtext_scan_history_v1";
let currentResult = null;
let toastTimer;

const rules = [
  { name: "Prize or reward language", pattern: /\b(won|winner|prize|lottery|claim your reward|free gift|congratulations)\b/i, points: 2, explanation: "Unexpected prize or reward wording can be used to attract clicks." },
  { name: "Urgent pressure", pattern: /\b(urgent|act now|immediately|limited time|expires today|final warning|account suspended|verify now)\b/i, points: 2, explanation: "The message pressures the reader to act quickly." },
  { name: "Sensitive information request", pattern: /\b(password|one.time password|otp|pin number|bank details|credit card|login credentials)\b/i, points: 3, explanation: "The text mentions credentials or sensitive financial information." },
  { name: "Link or web address", pattern: /(https?:\/\/|www\.|bit\.ly|tinyurl|t\.co\/)/i, points: 1, explanation: "A link is present; verify its destination independently." },
  { name: "Money or payment promise", pattern: /\b(cash prize|earn money|guaranteed income|send money|processing fee|investment returns|cashback)\b/i, points: 2, explanation: "Money or payment wording can be used in fraudulent offers." },
  { name: "Threatening account warning", pattern: /\b(blocked|suspended|unusual activity|legal action|account will be closed)\b/i, points: 2, explanation: "Threatening account warnings can be used to create panic." },
];

function getHistory() {
  try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); return Array.isArray(value) ? value : []; }
  catch { return []; }
}
function setHistory(history) { localStorage.setItem(STORAGE_KEY, JSON.stringify(history)); }
function showToast(message) {
  const toast = $("toast"); toast.textContent = message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
function analyzeMessage(text) {
  const signals = [];
  let points = 0;
  const checkRules = rules;
  checkRules.forEach(rule => { if (rule.pattern.test(text)) { points += rule.points; signals.push(rule.explanation); } });
  if ((text.match(/[A-Z]/g) || []).length >= 12 && (text.match(/[A-Z]/g) || []).length / Math.max(text.length, 1) > 0.35) {
    points += 1; signals.push("A large share of the message uses capital letters.");
  }
  if (/(?:!{2,}|\?{2,})/.test(text)) { points += 1; signals.push("Repeated exclamation or question marks are present."); }
  const score = Math.min(100, Math.round(points / 10 * 100));
  const spam = points >= 3;
  if (!signals.length) signals.push("No common warning patterns were detected by these simple rules.");
  return { spam, score, signals, points };
}
function updateResult(text, analysis) {
  currentResult = { text, ...analysis, date: new Date().toISOString() };
  $("emptyResult").hidden = true; $("analysisResult").hidden = false;
  $("resultIcon").textContent = analysis.spam ? "!" : "✓";
  $("resultIcon").classList.toggle("safe-result", !analysis.spam);
  $("resultLabel").textContent = analysis.spam ? "POSSIBLE SPAM" : "NOT FLAGGED";
  $("resultLabel").className = "pill " + (analysis.spam ? "spam-pill" : "");
  $("resultTitle").textContent = analysis.spam ? "Potential spam warning signs found" : "No strong spam signals found";
  $("resultSummary").textContent = analysis.spam
    ? "This message contains patterns often seen in spam or phishing. Do not click links or share private information until you verify the sender."
    : "The rules did not find enough common warning signs to flag this message. This does not prove that the message is safe.";
  $("scoreText").textContent = analysis.score + "%";
  $("scoreBar").style.width = analysis.score + "%";
  $("signalsList").replaceChildren();
  analysis.signals.forEach(signal => { const li = document.createElement("li"); li.textContent = signal; $("signalsList").appendChild(li); });
  $("saveResult").disabled = false;
}
function renderStats() {
  const history = getHistory(), spam = history.filter(x => x.spam).length, safe = history.length - spam;
  $("totalScans").textContent = history.length;
  $("spamScans").textContent = spam;
  $("safeScans").textContent = safe;
  $("safetyRate").textContent = history.length ? Math.round(safe / history.length * 100) + "%" : "—";
  $("historyCount").textContent = `${history.length} saved scan${history.length === 1 ? "" : "s"}`;
}
function renderHistory() {
  const history = getHistory(); const body = $("historyBody"); body.replaceChildren();
  if (!history.length) {
    const row = document.createElement("tr"), cell = document.createElement("td");
    cell.colSpan = 4; cell.className = "empty-cell"; cell.textContent = "No saved scans yet. Analyze a message and save the result."; row.appendChild(cell); body.appendChild(row);
  } else {
    history.slice().reverse().forEach(item => {
      const row = document.createElement("tr");
      const preview = document.createElement("td"); preview.className = "preview-cell"; preview.textContent = item.text.replace(/\s+/g, " ").slice(0, 100); preview.title = item.text;
      const result = document.createElement("td"), badge = document.createElement("span"); badge.className = "status " + (item.spam ? "spam" : "safe-status"); badge.textContent = item.spam ? "POSSIBLE SPAM" : "NOT FLAGGED"; result.appendChild(badge);
      const score = document.createElement("td"); score.textContent = item.score + "%";
      const date = document.createElement("td"); date.textContent = new Date(item.date).toLocaleString();
      [preview, result, score, date].forEach(cell => row.appendChild(cell)); body.appendChild(row);
    });
  }
  renderStats();
}
function runAnalysis() {
  const text = $("messageInput").value.trim();
  if (!text) { showToast("Please enter a message first."); $("messageInput").focus(); return; }
  const analysis = analyzeMessage(text); updateResult(text, analysis); showToast("Analysis complete. Review the signals found.");
}
function saveCurrentResult() {
  if (!currentResult) { showToast("Analyze a message before saving."); return; }
  const history = getHistory();
  const item = { id: Date.now(), text: currentResult.text, spam: currentResult.spam, score: currentResult.score, signals: currentResult.signals, date: currentResult.date };
  history.push(item); setHistory(history.slice(-200)); renderHistory(); showToast("Result saved in this browser.");
}
function escapeCsv(value) { return '"' + String(value ?? "").replace(/"/g, '""') + '"'; }
function exportCsv() {
  const history = getHistory();
  if (!history.length) { showToast("There is no history to export yet."); return; }
  const rows = [["Message", "Classification", "Rule-match indicator", "Signals", "Date"], ...history.map(x => [x.text, x.spam ? "Possible spam" : "Not flagged", x.score + "%", x.signals.join("; "), x.date])];
  const csv = rows.map(row => row.map(escapeCsv).join(",")).join("\r\n");
  const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = "shieldtext-scan-history.csv"; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  showToast("CSV export started.");
}
$("messageInput").addEventListener("input", () => $("charCount").textContent = `${$("messageInput").value.length} / 5000 characters`);
$("analyzeBtn").addEventListener("click", runAnalysis);
$("clearInput").addEventListener("click", () => { $("messageInput").value = ""; $("charCount").textContent = "0 / 5000 characters"; $("messageInput").focus(); });
$("saveResult").addEventListener("click", saveCurrentResult);
$("exportBtn").addEventListener("click", exportCsv);
$("deleteHistoryBtn").addEventListener("click", () => {
  if (!getHistory().length) { showToast("History is already empty."); return; }
  if (confirm("Delete all saved scan history from this browser?")) { localStorage.removeItem(STORAGE_KEY); renderHistory(); showToast("Scan history cleared."); }
});
$("copyResult").addEventListener("click", async () => {
  if (!currentResult) return;
  const text = `ShieldText result: ${currentResult.spam ? "POSSIBLE SPAM" : "NOT FLAGGED"}\nRule-match indicator: ${currentResult.score}%\nSignals: ${currentResult.signals.join("; ")}\n\nReminder: this educational rule-based result is not a guarantee of safety.`;
  try { await navigator.clipboard.writeText(text); showToast("Result copied."); }
  catch { showToast("Copy is unavailable in this browser. You can select the result text manually."); }
});
document.querySelectorAll(".example-chip").forEach(button => button.addEventListener("click", () => {
  $("messageInput").value = button.dataset.example === "spam"
    ? "CONGRATULATIONS!! You won a FREE PRIZE. Act now and click https://bit.ly/claim to claim your reward immediately!!!"
    : "Hi, our project meeting is scheduled for 3 PM tomorrow. Please bring your notes. Thanks!";
  $("charCount").textContent = `${$("messageInput").value.length} / 5000 characters`;
  $("messageInput").focus();
}));
$("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  $("themeToggle").textContent = dark ? "☀ Light" : "☾ Theme";
  try { localStorage.setItem("shieldtext_theme", dark ? "dark" : "light"); } catch {}
});
$("menuToggle").addEventListener("click", () => $("nav").classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(link => link.addEventListener("click", () => {
  document.querySelectorAll(".nav-link").forEach(x => x.classList.remove("active"));
  link.classList.add("active"); $("nav").classList.remove("open");
}));
try { if (localStorage.getItem("shieldtext_theme") === "dark") { document.body.classList.add("dark"); $("themeToggle").textContent = "☀ Light"; } } catch {}
renderHistory();
