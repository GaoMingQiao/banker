"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKER APP

// Data
const account1 = {
  owner: "Mingqiao Gao",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 6666,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//fonctions
function displayMovements(movements) {
  containerMovements.innerHTML = "";
  for (let [i, mov] of movements.entries()) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__date">3 days ago</div>
          <div class="movements__value">${mov}</div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  }
}
//displayMovements(account1.movements);

// const inputLoginUsername = document.querySelector(".login__input--user");
// const btnLogin = document.querySelector(".login__btn");
function getUname(accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((item) => item[0])
      .join("");
  });
}
console.log(accounts);
getUname(accounts);

const calcDispalyBalance = function (movements) {
  // let balance = movements.reduce((a, b) => a + b);
  currentAccount.balance = movements.reduce((a, b) => a + b);

  labelBalance.textContent = `${currentAccount.balance} euros`;
};
//calcDispalyBalance(account1.movements);
// console.log(n);
//console.log(currentAccount.value);

// movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
const calcDisplaySummary = function (movements) {
  const incomes = movements.filter((mov) => mov > 0).reduce((a, b) => a + b);

  labelSumIn.textContent = `${incomes} €`;

  const out = movements.filter((mov) => mov < 0).reduce((a, b) => a + b);
  labelSumOut.textContent = `${Math.abs(out)} €`;
  const interest = movements
    .map((mov) => (mov * 0.012 > 1 ? mov * 0.012 : 0))
    .reduce((a, b) => a + b);
  labelSumInterest.textContent = `${interest} €`;
};
//calcDisplaySummary(account1.movements);

const updateUI = function (acc) {
  displayMovements(acc.movements);
  calcDispalyBalance(acc.movements);
  calcDisplaySummary(acc.movements);
};
let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("click");

  const inputLoginUsernameValue = inputLoginUsername.value;

  const inputLoginPinValue = inputLoginPin.value;
  console.log(inputLoginPinValue);
  console.log(inputLoginUsernameValue);

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsernameValue
  );

  if (currentAccount.pin === Number(inputLoginPinValue)) {
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("click");

  let amount = Number(inputTransferAmount.value);
  let receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = "";
  }
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("a");
  const user = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);

  let id = accounts.findIndex((acc) => acc.username === user);
  console.log(id);

  if (currentAccount.pin === pin) {
    accounts.splice(id, 1);
    console.log(accounts);
    labelWelcome.innerHTML = "Log in to get started";
    containerApp.style.opacity = 0;
  }
});
