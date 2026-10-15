# Website Making Task — Project Report

## 1. Project Title
**ShieldText: AI Spam Message Detector**

## 2. Abstract
ShieldText is a student web application that demonstrates how a message can be checked for common spam and phishing warning signs. A user enters a message, and the website looks for suspicious phrases, urgency, requests for private information, links, money-related promises, and other patterns. The result includes an explanation of the signals found. Saved results can be viewed later and exported as a CSV file.

This implementation is an educational rule-based prototype. It is not a trained AI model and should not be treated as a security product.

## 3. Problem Statement
People receive unwanted messages that may use fake prizes, urgent warnings, suspicious links, or requests for sensitive details. A simple tool that highlights these warning signs can help users learn to review messages more carefully.

## 4. Objectives
- Build a useful, responsive website using HTML, CSS, and JavaScript.
- Accept a message from the user and analyze its text.
- Display a result with understandable warning signals.
- Store scan history in the browser.
- Display simple statistics and export the history.
- Provide cyber-safety guidance.

## 5. Technologies Used
- **HTML5:** page structure, forms, sections, tables.
- **CSS3:** responsive design, cards, theme colors, mobile navigation.
- **JavaScript:** rule checks, result rendering, events, statistics, CSV export.
- **Browser localStorage:** client-side storage of saved scan history and theme choice.
- **CSV:** downloadable history format.

## 6. System Requirements
- Computer or smartphone with a modern browser.
- Internet browser such as Chrome, Edge, or Firefox.
- Visual Studio Code is optional for editing.
- No server installation or API key is required for this demo.

## 7. Modules
1. **Home dashboard:** introduces the website and shows scan statistics.
2. **Message detector:** accepts text and checks for known warning patterns.
3. **Result explanation:** shows possible spam/not flagged and lists signals.
4. **Scan history:** lists saved results and dates.
5. **Statistics:** counts saved scans and classifications.
6. **CSV export:** downloads saved records for review.
7. **Safety guide:** explains suspicious links, urgency, private data, and independent verification.
8. **Theme control:** switches between light and dark appearance.
9. **About section:** describes the project and technologies.

## 8. Algorithm
1. Read the message entered by the user.
2. If the message is empty, ask the user to enter text.
3. Check the text against simple rules for prize language, urgency, private information, links, money promises, and account threats.
4. Add points for each matching rule.
5. Convert the total points into a rule-match indicator.
6. If the total score crosses the chosen threshold, display **Possible Spam**; otherwise display **Not Flagged**.
7. List the signals that were found.
8. If the user chooses Save, store the result in browser localStorage.
9. Update the history table and dashboard statistics.

## 9. Database / Data Storage
The project uses browser `localStorage` as a simple client-side store. Saved records include the message text, classification, rule-match indicator, warning signals, and date. The user can export records as CSV or clear the stored history.

**Limitation:** localStorage is not a centralized database. Records are stored only in the current browser profile and may be removed when browser data is cleared. A production version could use a backend and a database such as SQLite, MySQL, or Firebase, with suitable privacy and security controls.

## 10. Testing
| Test case | Input/action | Expected result |
|---|---|---|
| Empty input | Click Analyze with no text | Shows a prompt to enter a message |
| Suspicious message | Use the prize example | Usually displays Possible Spam and warning signals |
| Normal message | Use the meeting example | Usually displays Not Flagged |
| Save result | Analyze and click Save to history | Record appears in the history table |
| CSV export | Click Export CSV with saved records | CSV file download starts |
| Clear history | Confirm Clear history | Saved rows and statistics reset |
| Theme | Click Theme | Appearance switches between light and dark |
| Mobile layout | Open on a narrow screen | Navigation and content adapt to screen width |

## 11. Advantages
- Simple and easy to use.
- Explains the patterns that triggered a warning.
- Works without account creation or external API.
- Keeps history in the current browser.
- Offers CSV export and responsive layout.
- Supports cyber-safety awareness.

## 12. Limitations
- Uses manually written rules rather than machine learning.
- May miss new or carefully disguised scams.
- May flag legitimate messages that contain suspicious phrases.
- The score is a rule-match indicator, not a true probability.
- Browser storage is local and is not shared between users or devices.

## 13. Future Scope
- Train and evaluate a machine-learning classifier on a suitable labelled dataset.
- Add a backend API and a real database.
- Add user accounts only with appropriate security and consent.
- Support multiple languages and more message patterns.
- Add a feedback feature to improve the rules.
- Test accuracy, precision, recall, and false-positive rate using a labelled test set.

## 14. Conclusion
ShieldText demonstrates a complete front-end website that analyzes text with simple rules, explains possible warning signs, and stores results locally. It combines web development with basic cybersecurity awareness. A future version could use a trained model and a secure backend database.

## 15. Viva Questions and Short Answers
**Q1. What is the purpose of this project?**  
It demonstrates how a website can highlight common spam and phishing warning signs in a message.

**Q2. Which technologies are used?**  
HTML, CSS, and JavaScript.

**Q3. Is this a real trained AI model?**  
No. The current version is a rule-based educational prototype.

**Q4. What is localStorage?**  
It is a browser feature that stores small amounts of data for a website on the same browser profile.

**Q5. What is the purpose of CSV export?**  
It lets the user download saved scan history in a format that spreadsheet software can open.

**Q6. Can a “Not Flagged” message still be dangerous?**  
Yes. The rules can miss scams, so users must verify the sender and links independently.

**Q7. How could a real database be added?**  
A backend API could store records in a database such as SQLite or MySQL, with appropriate access controls and privacy protection.
