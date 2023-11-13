import { Notify } from 'notiflix/build/notiflix-notify-aio';

const submitForm = document.querySelector('.form');
submitForm.addEventListener('submit', onBtnClickHendler);

function onBtnClickHendler(event) {
  event.preventDefault();

  const delay = parseInt(submitForm.elements.delay.value);
  const step = parseInt(submitForm.elements.step.value);
  const amount = parseInt(submitForm.elements.amount.value);

  if (amount < 0 || step < 0 || delay < 0) {
    return Notify.warning(`'Alert', 'Field values must be > 0', 'Try again'`);
  }

  for (let i = 1; i < amount + 1; i += 1) {
    const dalayInFunc = delay + (i - 1) * step;
    createPromise(i, dalayInFunc)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
}
