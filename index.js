// IN PROGRESS

import { menuArray } from "./data.js";

// trans in renderMenuItems() later
const menuSection = document.getElementById("menu-section");

const checkoutSection = document.getElementById("checkout-section");
const paymentModal = document.getElementById("payment-modal");
const paymentForm = document.getElementById("payment-form");

const ratingForm = document.getElementById("rating-form");
const ratingModal = document.getElementById("rating-modal");
const ratingModalCloseBtn = document.getElementById("rating-modal-close-btn");

// PAYMENT FORM
let paymentFormData;
let fullName;
let creditCard;
let cvv;

// FEEDBACK FORM
let ratingFormData;
let ratingNumber;
const thankYouSection = document.getElementById("thank-you");

let orderItems = [];

// EVENT LISTENERS   ...... in progress......
document.addEventListener("click", function (e) {
  if (e.target.dataset.menuIncrement) {
    handleIncrementClick(Number(e.target.dataset.menuIncrement));
  }
});
// PAYMENT FORM PROCESS

// ENABLES USERS TO INCREASE THE AMOUNT OF THE DESIRED ITEM
function handleIncrementClick(itemId) {
  // hides away the thank you section
  thankYouSection.style.display = "none";
  const orderItem = retreiveOrderItemsArrayItem(itemId);
  // if same item is selected, increase it; else, add it to the array
  if (orderItem) {
    orderItem.orders++;
  } else {
    addMenuItemToOrderItemsArray(itemId);
  }
  renderCheckoutSection();
}

// RENDERS THE ITEM ON THE CHECKOUT SECTION WHEN SELECTED
function renderCheckoutSection() {
  let checkoutSectionHtml = "";
  let orderItemsHtml = "";
  let discountHtml = "";
  let discountFoodItems = 0;
  let discountDrinkItems = 0;
  let discountAmount = 0;
  let totalPrice = 0;
  if (orderItems.length) {
    orderItems.forEach(function (item) {
      // ITERATE THROUGH orderItems[] ARRAY THEN RENDER ITEM/s ON CHECKOUT SECTION
      orderItemsHtml += `
        <div class="flex-container order-item">
          <h3 class="item-name">${item.itemName}</h3>
          <h6>Orders: ${item.orders}</h6>
          <div class="flex-container" id="plus-minus-icons">
            <i
              class="fa-regular fa-square-minus remove-item fa-2x"
              data-checkout-decrement="${item.id}"
            ></i>
            <i
              class="fa-regular fa-square-plus add-item fa-2x"
              data-checkout-increment="${item.id}"
            ></i>
          </div>
          <h4 class="checkout-item-price">$${(item.price * item.orders).toFixed(
            2
          )}</h4>
        </div>
      `;
      // COMPUTE THE TOTAL PRICE
      totalPrice += item.price * item.orders;
      // COUNT ITEMS QUALIFIED FOR DISCOUNT
      if (item.itemName === "Pizza" || item.itemName === "Hamburger") {
        discountFoodItems += item.orders;
      } else if (item.itemName === "Beer") {
        discountFoodItems += item.orders;
      }
    });

    // COMPUTE THE DISCOUNT AMOUNT
    let beerPrice = menuArray.filter((item) => item.name === "Beer")[0].price;
    discountAmount =
      Math.min(discountDrinkItems, discountFoodItems) * beerPrice * 0.5;
    totalPrice -= discountAmount;

    // DISPLAYS DISCOUNT DETAILS
    if (discountAmount > 0) {
      discountHtml = `
        <div class="flex-container order-item discount-item">
          <h3 class="item-name">Discount</h3>
          <h4 class="checkout-item-price">$${discountAmount.toFixed(2)}</h4>
        </div>
      `;
    }
    checkoutSectionHtml += `
      <h3 id="checkout-title">Your order</h3>
      <div class="flex-container vertical" id="order-items">
        ${orderItemsHtml}
        ${discountHtml}
      </div>
      <div class="flex-container" id="total-price-section">
        <h3 class="total-price-label">Total price:</h3>
        <div id="total-price-sum">$${totalPrice.toFixed(2)}</div>
      </div>
      <button
        id="complete-order-btn"
        class="complete-order-btn"
        type="button"
      >Complete Order</button>
    `;
  }
  checkoutSection.innerHTML = checkoutSectionHtml;
} // function renderCheckoutSection()
