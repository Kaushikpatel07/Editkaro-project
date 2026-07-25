/**
 * GOOGLE APPS SCRIPT INTEGRATION GUIDE & CODE
 * 
 * This file contains the script that should be pasted into your Google Apps Script editor
 * to automate storing form data (Newsletter subscriptions and Contact submissions) in Google Sheets.
 * 
 * HOW TO SET IT UP:
 * 
 * 1. Create a new Google Sheet.
 * 2. Name the first sheet tab "Newsletter" and the second sheet tab "Contact submissions".
 * 3. In the "Newsletter" sheet, add these column headers in row 1:
 *    A1: Date/Time | B1: Email
 * 4. In the "Contact submissions" sheet, add these column headers in row 1:
 *    A1: Date/Time | B1: Name | C1: Email | D1: Phone | E1: Message
 * 5. In your Google Sheet menu, click on "Extensions" -> "Apps Script".
 * 6. Delete any code in the editor, and copy-paste the Google Apps Script code block below.
 * 7. Click on the Save icon.
 * 8. Click the "Deploy" button in the top right, and select "New deployment".
 * 9. Click the gear icon next to "Select type" and choose "Web app".
 * 10. Configure the deployment:
 *     - Description: Editkaro Web Forms Receiver
 *     - Execute as: Me (your-email@gmail.com)
 *     - Who has access: Anyone (This is important so the website can send data)
 * 11. Click "Deploy". You might need to authorize permissions.
 * 12. Copy the "Web app URL" provided (it will end in `/exec`).
 * 13. Open your project's `js/forms.js` file and replace the `SCRIPT_URL` variable with your URL.
 */

/* ================== COPY AND PASTE THIS CODE INTO GOOGLE APPS SCRIPT ================== */

function doPost(e) {
  try {
    // Parse the incoming JSON post data or form parameters
    var data;
    if (e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter;
    }
    
    var sheetName = data.sheetName || "Newsletter"; // Fallback sheet name
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName(sheetName);
    
    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({ "result": "error", "error": "Sheet tab '" + sheetName + "' not found." }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    var timestamp = new Date();
    var rowData = [];
    
    if (sheetName === "Newsletter") {
      // Newsletter requires Date and Email
      rowData.push(timestamp);
      rowData.push(data.email);
    } else if (sheetName === "Contact submissions" || sheetName === "Contact") {
      // Contact requires Date, Name, Email, Phone, Message
      rowData.push(timestamp);
      rowData.push(data.name);
      rowData.push(data.email);
      rowData.push(data.phone || "");
      rowData.push(data.message);
    } else {
      // Generic fallback - write all key/value pairs
      rowData.push(timestamp);
      for (var key in data) {
        if (key !== "sheetName") {
          rowData.push(data[key]);
        }
      }
    }
    
    // Append the row
    sheet.appendRow(rowData);
    
    // Return a successful JSON response with CORS headers allowed
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": rowData }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Enable CORS for preflight requests
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
