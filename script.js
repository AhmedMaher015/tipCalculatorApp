'use strict';

// buttons
const btn5 = document.querySelector('.btn-5');
const btn10 = document.querySelector('.btn-10');
const btn15 = document.querySelector('.btn-15');
const btn25 = document.querySelector('.btn-25');
const btn50 = document.querySelector('.btn-50');
const reset = document.querySelector('.reset');

const btns = [btn5, btn10, btn15, btn25, btn50];

// inputs
const bill = document.querySelector('#bill');
const peopleNumberValue = document.querySelector('.people-number-value');
const custom = document.querySelector('.custom');

// result output
const tipAmountResult = document.querySelector('.tip-amount-result');
const totalResult = document.querySelector('.total-result');

// errors
const billError = document.querySelector('.bill-error');
const peopleNumberError = document.querySelector('.people-number-error');
const customError = document.querySelector('.custom-error');

let tipAmount,
  total = 0;
let selected = btn15;

// put selected btn
const selectedBtn = (val) => {
  selected = val;
  btns.forEach((btn) => {
    if (btn.classList.contains('selected')) {
      btn.classList.remove('selected');
    }
  });
  selected.classList.add('selected');
};

// handling errors
const handling = (ele, err) => {
  let check = false;
  if (Number(ele.value) && Number(ele.value) > 0) {
    check = true;
  } else {
    err.textContent = 'invalid positive number';
    ele.style.borderColor = 'red';
  }
  return check;
};

// clear errors
const clearError = () => {
  billError.textContent = '';
  bill.style.borderColor = 'hsl(185, 41%, 84%)';
  peopleNumberError.textContent = '';
  peopleNumberValue.style.borderColor = 'hsl(185, 41%, 84%)';
  customError.textContent = '';
  custom.style.borderColor = 'hsl(189, 41%, 97%)';
};

// clear inputs values on focused
const clearInput = (ele) => {
  ele.value = '';
  clearError();
};

// clear All
const clearAll = () => {
  clearError();
  clearInput(bill);
  clearInput(custom);
  clearInput(peopleNumberValue);
  tipAmountResult.textContent = '00.00';
  totalResult.textContent = '00.00';
};

// function to calculate tip amount & total
const calcValues = (tip = Number(selected.value)) => {
  if (
    tip &&
    tip > 0 &&
    handling(bill, billError) &&
    handling(peopleNumberValue, peopleNumberError)
  ) {
    tipAmount =
      (Number(bill.value) * (tip / 100)) / Number(peopleNumberValue.value);
    total =
      (Number(bill.value) * (tip / 100 + 1)) / Number(peopleNumberValue.value);
    displayResults(tipAmount, total);
  }
};

// function display results
const displayResults = (tipAmo, tot) => {
  clearError();
  tipAmountResult.textContent = '$' + tipAmo.toFixed(2);
  totalResult.textContent = '$' + tot.toFixed(2);
};

btns.forEach((val) => {
  val.addEventListener('click', () => {
    selectedBtn(val);
    calcValues(Number(val.value));
  });
});

custom.addEventListener('keyup', (e) => {
  if (e.key === 'Enter' && handling(custom, customError))
    calcValues(Number(custom.value));
});

bill.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') calcValues();
});

peopleNumberValue.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') calcValues();
});

reset.addEventListener('click', clearAll);
