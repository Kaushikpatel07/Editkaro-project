# Editkaro.in SPA - Video Editing & Marketing Agency Website

A premium, high-performance **Single Page Application (SPA)** built using **pure HTML, Vanilla CSS, and modern JavaScript (ES6)**. Designed with rich glassmorphic visuals, neon glowing boundaries, cinematic image assets, and smooth micro-animations.

---

## 📂 Project Directory Structure

```
editkaro/
├── index.html                 # Unified HTML containing Home, Portfolio, About, and Contact sections
├── README.md                  # Project documentation and setup guides
├── css/
│   └── styles.css             # Unified styling sheets (variables, grid elements, animations, page states)
├── js/
│   ├── main.js                # Consolidated scripts (routing, mobile nav, modal overlays, validation)
│   └── google-apps-script.js  # Instructions & script block for Google Sheets automation
└── img/
    ├── team_creative_director.png  # Creative Director AI Portrait
    ├── team_lead_editor.png        # Lead Editor AI Portrait
    └── team_motion_designer.png    # Motion Designer AI Portrait
```

---

## ✨ Features

- **Consolidated SPA Router**: Page changes are processed instantly in the client using URL hashes (e.g., `#home`, `#portfolio`) to toggle CSS visibility blocks, scroll to top, and refresh intersection animations. Fully supports browser history back/forward and deep linking.
- **Cinematic Portfolio Filters**: Filters showcase videos across all **9 required categories**: Short Form, Long Form, Gaming Videos, Football Edits, eCommerce Ads, Documentary Style, Color Grading, Anime Videos, and Ads.
- **Custom Lightbox Player**: Click video assets to launch a custom full-screen video player overlay. Playback automatically terminates and clears stream references on exit.
- **Modern Forms with Floating Labels**: Custom inputs with sliding labels, input format validation rules, and double submission guards.
- **Responsive Navigation**: Glassmorphic header nav that shrinks on scroll and opens into a full-screen drawer layout on mobile viewports.
- **SEO Ready**: Structural tags, metadata, descriptive titles, alt image hooks, and unified header hierarchies (`<h1>` tags) optimized for search indexing.

---

## ⚡ Form Setup: Google Sheets Integration

Both the **Email Collector** and **Contact Form** can write submission records directly to a Google Spreadsheet using **Google Apps Script**.

### Step 1: Prepare Your Google Sheet
1. Open a new Google Sheet.
2. Rename sheet tab 1 to `Newsletter` and sheet tab 2 to `Contact submissions`.
3. Set the first row headers exactly as follows:
   - **Newsletter**: `A1: Date/Time` | `B1: Email`
   - **Contact submissions**: `A1: Date/Time` | `B1: Name` | `C1: Email` | `D1: Phone` | `E1: Message`

### Step 2: Set Up Apps Script Webhook
1. In Google Sheets, navigate to **Extensions ➔ Apps Script**.
2. Clear the editor and paste the JavaScript code from [google-apps-script.js](file:///C:/Users/kaush/.gemini/antigravity/scratch/editkaro/js/google-apps-script.js).
3. Click the Save icon.
4. Click **Deploy ➔ New deployment**.
5. Select **Web app** as the deployment type (click the gear icon to verify).
6. Configure the options:
   - **Execute as**: `Me` (your Google account email)
   - **Who has access**: `Anyone`
7. Click **Deploy** and grant standard permission approvals.
8. Copy the **Web App URL** provided (it ends in `/exec`).

### Step 3: Link Webhook to the Website
1. Open [js/main.js](file:///C:/Users/kaush/.gemini/antigravity/scratch/editkaro/js/main.js).
2. Replace the empty string in the `GOOGLE_SCRIPT_URL` variable at the top with your copied Web App URL:
   ```javascript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/.../exec";
   ```
3. Save the file. Your website forms are now fully live and connected to your Google Sheet!

---

## 🧪 Local Testing & Backup Fallback

If no `GOOGLE_SCRIPT_URL` is defined, the forms will write records to the browser's **LocalStorage** as a mock database.

### Inspecting Local Data:
1. Open `index.html` in your browser.
2. Submit a form (e.g., newsletter subscription).
3. Press `F12` (or right-click ➔ **Inspect**) and open the Developer Tools.
4. Go to the **Application** tab (Chrome/Edge) or **Storage** tab (Firefox) ➔ **Local Storage** ➔ Select the website URL.
5. Check keys `editkaro_newsletter` and `editkaro_contact_submissions` to inspect captured records.
