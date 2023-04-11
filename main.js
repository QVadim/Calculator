// Значение из текстовых инпутов
const totalCost = document.getElementById('total-cost'),
   anInitionalFee = document.getElementById('an-initial-fee'),
   creditTerm = document.getElementById('credit-term');

// Значение из range инпутов
const totalCostRange = document.getElementById('total-cost-range'),
   anInitionalFeeRange = document.getElementById('an-initial-fee-range'),
   creditTermRange = document.getElementById('credit-term-range');

// Итоговые значения
const totalAmountOfCredit = document.getElementById('amount-of-credit'),
   totalMonthlyPayment = document.getElementById('monthly-payment'),
   totalRecommendedIncome = document.getElementById('recommended-income');

// Все range
const inputsRange = document.querySelectorAll('.input-range');

// Все Кнопки с % ставкой
const bankBtns = document.querySelectorAll('.bank');

const assignValue = () => {
   totalCost.value = totalCostRange.value;
   anInitionalFee.value = anInitionalFeeRange.value;
   creditTerm.value = creditTermRange.value;
}

assignValue();

const banks = [
   {
      name: 'alfa',
      precents: 8.7
   },
   {
      name: 'sberbank',
      precents: 8.4
   },
   {
      name: 'pochta',
      precents: 7.9
   },
   {
      name: 'tinkoff',
      precents: 9.2
   },
];


let currentPrecent = banks[0].precents;

for (let bank of bankBtns) {
   bank.addEventListener('click', () => {
      for (let item of bankBtns) {
         item.classList.remove('active')
      }
      bank.classList.add('active');
      takeActiveBank(bank);
   })
}

const takeActiveBank = currentActive => {
   const dataAttrValue = currentActive.dataset.name;
   const currentBank = banks.find(bank => bank.name === dataAttrValue);
   currentPrecent = currentBank.precents;
   calculation(totalCost.value, anInitionalFee.value, creditTerm.value);
}

for (let input of inputsRange) {
   input.addEventListener('input', () => {
      assignValue();
      calculation(totalCost.value, anInitionalFee.value, creditTerm.value);
   })
}

const calculation = (totalCost = 0, anInitionalFee = 10000, creditTerm = 1) => {

   let MonthlyPayment; // ЕП = Ежемесячный платеж
   let lounAmount = totalCost - anInitionalFee; // РК = размер кредита
   let interestRate = currentPrecent; // ПС = Процентная ставка
   let numberOfYears = creditTerm; // КЛ = кол-во лет
   let numberOfMounts = 12 * numberOfYears; // КМ = кол-во месяцев

   /* ЕП = (РК + ((( РК / 100 ) * ПС ) / 12 ) * КМ ) / КМ; */
   MonthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMounts) / numberOfMounts;
   const monthlyPaymentArounded = Math.round(MonthlyPayment);
   console.log(monthlyPaymentArounded);

   // Избавляемя от нулевых значений если они будут
   if (monthlyPaymentArounded < 0) {
      return false;
   } else {
      totalAmountOfCredit.innerHTML = `${lounAmount} ₽`;
      totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} ₽`;
      totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35)} ₽`
   }
}
