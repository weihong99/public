const transactions = document.querySelector('.transactions');
var balance = 0;

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, {edge: 'right'});
  // add transaction form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, {edge: 'left'});
  //modals
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
});

// render transaction data
const renderTransaction = (data, id) => {

  const html = `
    <div class="card-panel transaction white row" data-id="${id}">
      <img src="/img/money.png" alt="transaction thumb">
      <div class="transaction-details">
        <div class="transaction-title">RM${data.amount}.00</div>
        <div class="transaction-description">${data.description}</div>
      </div>
      <div class="transaction-delete">
        <i class="material-icons" data-id="${id}">delete_outline</i>
      </div>
    </div>
  `;
  transactions.innerHTML += html;

};

// remove transaction
const removeTransaction = (id) => {
  const transaction = document.querySelector(`.transaction[data-id=${id}]`);
  transaction.remove();
};

//render balance
const renderBalance = (data) => {
  balance = balance + Number(data.amount);
  document.querySelector('.balance').innerHTML = `<h4 class="teal-text">Balance: RM${balance}</h4>`
};

//render deleted balance
const renderDeleteBalance = (data) => {
  balance = balance - Number(data.amount);
  document.querySelector('.balance').innerHTML = `<h4 class="teal-text>Balance: RM${balance}</h4>`
};