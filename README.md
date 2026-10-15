# ShieldText — AI Spam Message Detector (Student Website Project)

## Project overview
ShieldText is a responsive educational website that checks text for common spam and phishing warning signs. It explains why a message may be suspicious and lets the user save results locally.

**Important:** This is a rule-based prototype, not a trained AI model. It does not guarantee that a message is safe or unsafe.

## Files
- `index.html` — page structure and website sections
- `style.css` — responsive layout, colors, cards, dark mode
- `script.js` — rule-based analysis, history, browser storage, CSV export
- `PROJECT_REPORT.md` — assignment report and viva preparation

## Run locally
1. Download and extract the ZIP.
2. Open the `index.html` file in Chrome, Edge, or Firefox.
3. For editing, open the extracted folder in Visual Studio Code.
4. No package installation or API key is required.

## Main features
- Home dashboard and navigation menu
- Message text analysis with explainable warning signals
- Possible spam / not flagged result
- Rule-match indicator (not a calibrated probability)
- Example messages, clear input, copy result
- Local scan history saved in `localStorage`
- Statistics and CSV export
- Clear history control
- Dark/light theme
- Responsive mobile layout
- Safety tips and project information

## Database note
For this assignment prototype, the browser's `localStorage` is used as a small client-side data store. It stores saved scan history on the same browser/device. It is **not** a shared server database and does not sync between devices. If your instructor requires a real server database, the next step would be to add a backend such as Node.js + Express with SQLite/MySQL or Firebase. Do not describe localStorage as MySQL.

## Upload to GitHub Pages
1. Sign in to GitHub and create a public repository, for example `shieldtext-spam-detector`.
2. Upload `index.html`, `style.css`, and `script.js` to the repository root.
3. Open **Settings → Pages**.
4. Under the build/deployment source, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Wait for GitHub Pages to publish the site. Copy the published URL and open it to test.
7. Submit that website URL in your college Google Form: https://forms.gle/xxBYsZkhR9KTNAkb6

Keep `PROJECT_REPORT.md` for the assignment report. If the form asks for a repository link too, submit the GitHub repository URL as well.
