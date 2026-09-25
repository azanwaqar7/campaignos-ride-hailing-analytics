/**
 * CampaignOS — ten synthetic ride-hailing campaign experiments.
 *
 * Recommended: open the imported Google Sheet, choose Extensions > Apps Script,
 * add this Code.gs and an HTML file named index, then deploy as a web app.
 * For a standalone Apps Script project, set SPREADSHEET_ID below.
 *
 * This is an independent synthetic portfolio case study, not Bolt data.
 */
var SPREADSHEET_ID = ''; // Only needed for a standalone project. Paste the ID between quotes.

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('CampaignOS | Ride campaign intelligence');
}

/** Return all six source tables as arrays of primitive values. */
function getDashboardData() {
  var spreadsheet = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error('Spreadsheet not found. Open the imported Google Sheet and use Extensions > Apps Script, or set SPREADSHEET_ID in Code.gs.');
  }

  var required = {
    campaigns: ['Campaigns', 'campaign_id'],
    customers: ['Customers', 'customer_id'],
    assignments: ['Assignments', 'assignment_id'],
    events: ['Events', 'event_id'],
    rides: ['Rides', 'ride_id'],
    costs: ['Costs', 'campaign_id']
  };
  var result = {};
  Object.keys(required).forEach(function (key) {
    var sheetName = required[key][0];
    var expectedFirstColumn = required[key][1];
    var sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error('Missing sheet "' + sheetName + '". Import the CampaignOS workbook into Google Sheets first.');
    }
    var rows = sheet.getDataRange().getValues();
    if (!rows.length || String(rows[0][0]).trim() !== expectedFirstColumn) {
      throw new Error('Sheet "' + sheetName + '" has the wrong headers. Use the original CampaignOS workbook without changing its table columns.');
    }
    // google.script.run cannot transfer Date objects. Convert imported Excel dates
    // to ISO date strings; keep numbers as numbers for the dashboard calculations.
    result[key] = rows.map(function (row) {
      return row.map(function (value) {
        return value instanceof Date
          ? Utilities.formatDate(value, 'GMT', 'yyyy-MM-dd')
          : value;
      });
    });
  });
  result.sheetUrl = spreadsheet.getUrl();
  return result;
}
