const tipPercentageContainer = document.querySelector(".tip-percentage");
const tipAmountInput = document.querySelector("#bill");
const customTip = document.querySelector("#custom-tip");
const numOfPeople = document.querySelector("#num-of-people");

const tipAmount = document.querySelector("#tip-amount-output");
const totalBill = document.querySelector("#total-bill");
const eachPersonBill = document.querySelector("#each-person-bill");

const generateBill = document.querySelector(".generate-bill");
const resetBill = document.querySelector(".reset");

const billCalculator = document.querySelector("#bill-calculator");

let tipPercentage = 0;

function loopTip(fn) {
  const tips = Array.from(tipPercentageContainer.children);
  tips.forEach((tip) => fn(tip));
}

function disableGenerate() {
  if (tipAmountInput.value && tipPercentage && numOfPeople.value) {
    generateBill.disabled = false;
    console.log(tipAmountInput.value, tipPercentage, numOfPeople.value);
  } else {
    generateBill.disabled = true;
    console.log(tipAmountInput.value, tipPercentage, numOfPeople.value);
  }
}

tipAmountInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  if (e.target.value) {
    tipPercentageContainer.classList.remove("disabled");
    customTip.disabled = false;
    numOfPeople.disabled = false;
  } else {
    tipPercentageContainer.classList.add("disabled");
  }
});

tipPercentageContainer.addEventListener("click", (e) => {
  if (e.target.closest(".tip-amount")) {
    loopTip((tip) => {
      tip.classList.remove("selected");
    });
    e.target.classList.add("selected");
    tipPercentage = String(e.target.textContent).split("%")[0]; // get the tip percentage in number
  }
  disableGenerate();
});

customTip.addEventListener("input", (e) => {
  tipPercentage = e.target.value;
  disableGenerate();
});

numOfPeople.addEventListener("input", () => {
  disableGenerate();
});

function output(outputText, value) {
  outputText.textContent = value;
}

billCalculator.addEventListener("submit", (e) => {
  e.preventDefault();

  const billCalculatorData = new FormData(billCalculator);
  let billAmount = 0;
  let numOfPeople = 0;

  resetBill.disabled = false;

  for (let values of billCalculatorData.entries()) {
    if (values[0] == "bill") billAmount = Number(values[1]);
    else if (values[0] == "num-of-people") numOfPeople = Number(values[1]);
  }

  const totalTip = billAmount * (tipPercentage / 100);
  billAmount += totalTip;

  console.log(billAmount, totalTip, numOfPeople);
  output(tipAmount, totalTip);

  output(totalBill, billAmount);
  output(eachPersonBill, billAmount / numOfPeople);
});

resetBill.addEventListener("click", (e) => {
  tipPercentageContainer.classList.add("disabled");
  tipAmountInput.value = "";
  numOfPeople.value = "";

  output(tipAmount, "");
  output(totalBill, "");
  output(eachPersonBill, "");
  resetBill.disabled = true;
  numOfPeople.disabled = true;
  customTip.disabled = true;
  generateBill.disabled = true;
});
