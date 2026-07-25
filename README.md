# Editkaro.in Website

This is a website for **Editkaro.in**, an agency that edits videos and handles social media marketing for brands. 

The website is built as a **Single Page Application**. This means all pages (Home, Portfolio, About Us, and Contact Us) are combined into a single file so that clicking links opens pages instantly without reloading.

---

## 📁 What is in this project?

- **`index.html`**: The main file that holds all the text, sections, and forms of the website.
- **`css/styles.css`**: The design file that adds the dark mode theme, glowing purple/blue colors, fonts, and animations.
- **`js/main.js`**: The code file that makes buttons work, filters portfolio videos, opens the video popup modal, and checks if inputs on forms are correct.
- **`js/google-apps-script.js`**: A copy-paste guide to help you connect your forms to a Google Sheet spreadsheet.
- **`img/`**: A folder with generated team profile pictures.

---

## 🚀 How to open and test the website

1. Go to the project folder and double-click **`index.html`** to open the website in your browser.
2. Click on the header menu links to switch between sections.
3. Go to the **Portfolio** section and click on video cards to watch sample videos.
4. Try typing in the **Contact** or **Newsletter** forms. Submitting will show a success message and save the data inside your browser's local memory (`localStorage`) for testing.

---

## 📊 How to save form submissions to Google Sheets

If you want submissions from the website to go directly into a Google Sheet:
1. Open a new Google Sheet.
2. Copy the code from **`js/google-apps-script.js`** and paste it into Extensions ➔ Apps Script.
3. Click Deploy ➔ New deployment (set access to *Anyone*).
4. Copy the Web App link you get.
5. Open **`js/main.js`** and paste the link in the `GOOGLE_SCRIPT_URL` box at the very top.
