// Sheet Names
const INVENTORY_SHEET_NAME = 'Inventory';
const TRANSFERS_SHEET_NAME = 'Transfers';
const FINANCES_SHEET_NAME = 'Finances';

/**
 * Handles the Web App request and serves the HTML file.
 */
function doGet() {
  return HtmlService.createTemplateFromFile('Index')
      .evaluate()
      .setTitle('Respresso Inventory Manager')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Fetches inventory data for display and item selection.
 */
function getInventoryData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const inventorySheet = ss.getSheetByName(INVENTORY_SHEET_NAME);
  
  // Get all data except the header row (Row 1)
  const data = inventorySheet.getRange(2, 1, inventorySheet.getLastRow() - 1, 4).getValues();
  
  const inventoryList = data.map(row => ({
    name: row[0],
    unit: row[1],
    stock: row[2],
    reorderPoint: row[3]
  }));
  
  return JSON.stringify(inventoryList);
}

/**
 * Records an addition to the stock and updates the inventory.
 * @param {string} itemName - The name of the item.
 * @param {number} quantity - The quantity to add.
 */
function addStock(itemName, quantity) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const inventorySheet = ss.getSheetByName(INVENTORY_SHEET_NAME);

  // 1. Find the item
  const dataRange = inventorySheet.getRange(2, 1, inventorySheet.getLastRow(), 1);
  const itemNames = dataRange.getValues().flat();
  
  const rowIndex = itemNames.findIndex(name => name === itemName) + 2; // Row index starts from 2

  if (rowIndex > 1) {
    // Column C (3) is Current Stock
    const currentStock = inventorySheet.getRange(rowIndex, 3).getValue();
    const unit = inventorySheet.getRange(rowIndex, 2).getValue();
    
    // Check if currentStock is a valid number before addition
    const stockValue = (typeof currentStock === 'number') ? currentStock : 0;
    
    const newStock = stockValue + quantity; 
    
    inventorySheet.getRange(rowIndex, 3).setValue(newStock);

    return { 
      success: true, 
      message: `Successfully added ${quantity} ${unit} to stock of ${itemName}. New stock is ${newStock}.` 
    };
  } else {
    return { success: false, message: 'Item not found in inventory.' };
  }
}

/**
 * Records a transfer and updates the stock level.
 * @param {string} itemName - The name of the item.
 * @param {number} quantity - The quantity transferred.
 */
function recordTransfer(itemName, quantity) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const inventorySheet = ss.getSheetByName(INVENTORY_SHEET_NAME);
  const transfersSheet = ss.getSheetByName(TRANSFERS_SHEET_NAME);

  // 1. Update Inventory
  const dataRange = inventorySheet.getRange(2, 1, inventorySheet.getLastRow(), 1);
  const itemNames = dataRange.getValues().flat();
  
  const rowIndex = itemNames.findIndex(name => name === itemName) + 2; 

  if (rowIndex > 1) {
    // Column C (3) is Current Stock
    const currentStock = inventorySheet.getRange(rowIndex, 3).getValue();
    const unit = inventorySheet.getRange(rowIndex, 2).getValue();
    
    // Check if currentStock is a valid number before subtraction
    const stockValue = (typeof currentStock === 'number') ? currentStock : 0;
    
    const newStock = stockValue - quantity; 
    
    // Check for negative stock
    if (newStock < 0) {
      return { success: false, message: `Transfer quantity (${quantity} ${unit}) exceeds current stock (${stockValue} ${unit}).` };
    }
    
    inventorySheet.getRange(rowIndex, 3).setValue(newStock);

    // 2. Record the Transfer
    const userEmail = Session.getActiveUser().getEmail();
    transfersSheet.appendRow([new Date(), itemName, quantity, userEmail]);
    
    return { success: true, message: `Successfully transferred ${quantity} ${unit} of ${itemName}.` };
  } else {
    return { success: false, message: 'Item not found in inventory.' };
  }
}

/**
 * Records a revenue or expense entry.
 * @param {string} type - 'Revenue' or 'Expense'.
 * @param {string} description - Transaction description.
 * @param {number} value - Financial value.
 */
function recordFinance(type, description, value) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const financesSheet = ss.getSheetByName(FINANCES_SHEET_NAME);
  
  // Append the new entry
  financesSheet.appendRow([
    new Date().toLocaleDateString('en-CA'), 
    type,
    description,
    value,
    new Date() 
  ]);
  
  return { success: true, message: `Recorded ${type}: ${value}.` };
}

/**
 * Calculates and returns the financial summary (total revenue, total expenses, net profit).
 */
function getFinanceSummary() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const financesSheet = ss.getSheetByName(FINANCES_SHEET_NAME);
  
  // Check if the sheet has content beyond the header row
  if (financesSheet.getLastRow() <= 1) {
    return { revenue: 0, expenses: 0, netProfit: 0 };
  }
  
  // Get all data except header
  const data = financesSheet.getRange(2, 1, financesSheet.getLastRow() - 1, 4).getValues();
  
  let totalRevenue = 0;
  let totalExpenses = 0;
  
  data.forEach(row => {
    const type = row[1];
    const value = parseFloat(row[3]);
    
    if (type === 'Revenue' && !isNaN(value)) {
      totalRevenue += value;
    } else if (type === 'Expense' && !isNaN(value)) {
      totalExpenses += value;
    }
  });
  
  return {
    revenue: totalRevenue,
    expenses: totalExpenses,
    netProfit: totalRevenue - totalExpenses
  };
}
