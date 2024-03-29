// Business Logic
var totalPriceArray = []; //Only global variable in code
function Order (customSize, cheese) {
  this.customSize = customSize;
  this.sauce = 100;
  this.cheese = cheese;
  this.veggie1 = 100;
  this.veggie2 = 100;
  this.meat = 200;
  this.pizzaPrice = 0;
  this.sidePrice = 300;
}
Order.prototype.pizzaCost = function () {
  if (this.customSize === "Small 10 in.") {
    this.pizzaPrice += 600;
  } else if (this.customSize === "Medium 14 in.") {
    this.pizzaPrice += 900;
  } else if (this.customSize === "Large 18 in.") {
    this.pizzaPrice += 1200;
  }
  if (this.cheese === "cheese") {
    this.pizzaPrice += 100;
  } else if (this.cheese === "light cheese") {
    this.pizzaPrice += 50;
  } else if (this.cheese === "extra cheese") {
    this.pizzaPrice += 150;
  }
  this.pizzaPrice += this.sauce;
  this.pizzaPrice += this.veggie1;
  this.pizzaPrice += this.veggie2;
  this.pizzaPrice += this.meat;
  return this.pizzaPrice;
}
Order.prototype.sideCost = function () {
  return this.sidePrice;
}
Order.prototype.finalCost = function () {
  var cartTotalPrice = 0;
  for (var arrayElement = 0; arrayElement < totalPriceArray.length; arrayElement ++) {
    cartTotalPrice += totalPriceArray[arrayElement]; //////////////////////IMPORTANT!!! How to add contents of an array together
  }
  return cartTotalPrice;
}
function Address (streetAddress, city, constituency, houseNumber) {
  this.streetAddress = streetAddress;
  this.city = city;
  this.constituency = constituency;
  this.houseNumber = houseNumber;
  this.deliveryAddress = (streetAddress + "  " + city + ", " + constituency+ "  " + houseNumber);
}


//User Interface Logic
$(document).ready(function(event) {
/////Landing Page Btns
  $("#pickup-btn").click(function() {
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("PICKUP BY CUSTOMER");
  });
  $("#delivery-btn").click(function() {
    $("#address").show();
    $("#pickup-btn,#delivery-btn,#landing-tagline").hide();
  });
  $("form#address-form").submit(function(event) {
    event.preventDefault();
    var streetAddress = $("input#street-add").val();
    var city = $("input#city-add").val();
    var constituency = $("select#constituency-select").val();
    var houseNumber = $("input#house-add").val();
    var newAddress = new Address(streetAddress, city, constituency, houseNumber)
    $("#order-content").show();
    $("#landing-content").hide();
    $("#delivery-option").text("DELIVER TO: " + newAddress.deliveryAddress);
  });
  $("form#custom-pizza").submit(function(event) {
    event.preventDefault();
    var customSize = $("select#size").val();
    var sauce = $("select#sauce").val();
    var cheese = $("select#cheese").val();
    var veggie1 = $("select#veggie1").val();
    var veggie2 = $("select#veggie2").val();
    var meat = $("select#meat").val();
    var pizzaDetails = (customSize + " - " + sauce + ", " + cheese + ", " + veggie1 + ", " + veggie2 + ", " + meat);
    var newPizzaOrder = new Order(customSize, cheese);
    newPizzaOrder.pizzaCost();
    totalPriceArray.push(newPizzaOrder.pizzaPrice);
    $("#pizza-details-dropdown").show();
    $("#final-cost").text(newPizzaOrder.finalCost());
    $("#pizza-details").append("<ul><li>" + pizzaDetails + "</li></ul>");
    $("#size, #sauce, #cheese, #veggie1, #veggie2, #meat").val("");
  });
  $("#pizza-details-dropdown").click(function() {
    $("#pizza-details").toggle();
  });
/////Side Orders
  var newSideOrder = new Order();
  $("#breadsticks").click(function() {
    newSideOrder.sideCost();
    totalPriceArray.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "3 garlic breadsticks" + "</li></ul>");
  });
  $("#brownie").click(function() {
    newSideOrder.sideCost();
    totalPriceArray.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "1 jumbo, double-chocolate brownie" + "</li></ul>");
  });
  $("#soda").click(function() {
    newSideOrder.sideCost();
    totalPriceArray.push(newSideOrder.sidePrice);
    $("#final-cost").text(newSideOrder.finalCost());
    $("#sides-dropdown").show();
    $("#sides-details").append("<ul><li>" + "16oz., root-beer italian soda" + "</li></ul>");
  });
  $("#sides-dropdown").click(function() {
    $("#sides-details").toggle();
  });
///Checkout Btn
  $("#checkout-btn").click(function() {
    location.reload();
  });
});
