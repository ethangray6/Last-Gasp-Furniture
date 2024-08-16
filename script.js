const stateABV = ["AK", "AL", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "VI", "WA", "WV", "WI", "WY"];
const storeItems = ["chair", "recliner", "table", "umbrella"];
const storePrices = [25.50, 37.75, 49.95, 24.89];
let shoppingList = [];
let shoppingListQuant = [];
let shippingCharge;
let subtotal;
let response;
let stateShipped = "";
let total;
let tax;
let itemTotal;

function takeOrder() {
  shoppingList = [];
  shoppingListQuant = [];
  shippingCharge = 0;
  subtotal = 0;
  stateShipped = "";
  total = 0;
  tax = 0;
  itemTotal = 0;
  response = "y";
  
  while (response !== "n") {
    
    if (response === "y") {
      
      let order = prompt("What would you like to buy today: chair, recliner, table, or umbrella?").toLowerCase();
      
      while (!storeItems.includes(order.toLowerCase())) {
        order = prompt("Please enter a valid item: chair, recliner, table, or umbrella.").toLowerCase();
      }
      
      let quantity = prompt("How many " + order + "s would you like to buy?");
      
        while(quantity <= 0 || isNaN(quantity)) {
          quantity = prompt("Please enter a valid number greater than 0 for how many " + order + "s you would like to buy?");
        }
      
      shoppingList.push(order);
      shoppingListQuant.push(quantity);
      response = prompt("Keep Shopping? y/n").toLowerCase();
    }
      
    else {
      response = prompt("Please enter y to continue shopping or n to checkout.").toLowerCase();
    }
    
  }
  stateShipped = prompt("What state are you shipping to? Please enter the two letter abbreviation.").toUpperCase();
  while (!(stateABV.includes(stateShipped))) {
    if (stateABV.includes(stateShipped)) {
      calculate();
    }
    else {
      stateShipped = prompt("Please enter an appropiate state, Please enter the two letter abbreviation.").toUpperCase();
    }
  }
  calculate();
}

function calculate() {
  for (let i = 0; i < shoppingList.length; i++) {
    if (shoppingList[i] === "chair") {
      subtotal += (storePrices[0] * shoppingListQuant[i]);
      itemTotal += (storePrices[0] * shoppingListQuant[i]);
    } else if (shoppingList[i] === "recliner") {
      subtotal += (storePrices[1] * shoppingListQuant[i]);
      itemTotal += (storePrices[1] * shoppingListQuant[i]);
    } else if (shoppingList[i] === "table") {
      subtotal += (storePrices[2] * shoppingListQuant[i]);
      itemTotal += (storePrices[2] * shoppingListQuant[i]);
    } else if (shoppingList[i] === "umbrella") {
      subtotal += (storePrices[3] * shoppingListQuant[i]);
      itemTotal += (storePrices[3] * shoppingListQuant[i]);
    }
  }
  if (stateABV.includes(stateShipped)) {
    switch (stateShipped) {
      case "ME":
      case "NH":
      case "VT":
      case "NY":
      case "CT":
      case "RI":
      case "MA":
      case "NJ":
        shippingCharge = 0;
        break;
      case "PA":
      case "OH":
      case "IN":
      case "WV":
      case "VA":
      case "NC":
      case "SC":
      case "DE":
      case "MD":
      case "DC":
      case "KY":
        shippingCharge = 20;
        break;
      case "FL":
      case "GA":
      case "AL":
      case "TN":
      case "IL":
      case "MO":
      case "KS":
      case "IA":
      case "WI":
      case "MI":
      case "MN":
      case "PI":
      case "VI":
        shippingCharge = 30;
        break;
      case "MS":
      case "LA":
      case "AR":
      case "OK":
      case "TX":
      case "CO":
      case "NE":
      case "SD":
      case "ND":
        shippingCharge = 35;
        break;
      case "NM":
      case "WY":
      case "MT":
      case "AZ":
      case "UT":
      case "ID":
      case "WA":
      case "CA":
      case "AK":
      case "HI":
        shippingCharge = 45;
        break;

      default:
        shippingCharge = 0;
        break;
    }
  } else {
    alert("Invalid state abbreviation. Please enter a valid two-letter abbreviation.");
  }

  if (subtotal > 100) {
    shippingCharge = 0;
  }
  
  tax = subtotal * 0.15;
  total = (subtotal+shippingCharge+tax).toFixed(2);
  invoice()
  
}


function invoice() {
  let url = "invoice.html?shoppingList=" + JSON.stringify(shoppingList) + "&shoppingListQuant=" + JSON.stringify(shoppingListQuant) + "&subtotal=" + subtotal.toFixed(2) + "&tax=" + tax.toFixed(2) + "&shippingCharge=" + shippingCharge + "&total=" + total + "&stateShipped=" +stateShipped + "&storePrices=" + JSON.stringify(storePrices) + "&itemTotal=" + itemTotal.toFixed(2);
  window.location.assign(url);
}


function start() {
  window.location.assign("index.html")
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

