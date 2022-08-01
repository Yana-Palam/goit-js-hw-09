import { Notify } from 'notiflix/build/notiflix-notify-aio';

//Refs
const refs = {
  form: document.querySelector('.form'),
};

let formData = {
  delay: 0,
  step: 0,
  amount: 0,
};

//Listener
refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', onFormSubmit);

//Functions
function onFormInput(evt) {
  formData[evt.target.name] = Number(evt.target.value.trim());
  // console.log(formData);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  for (let i = 0; i < formData.amount; i += 1) {
    createPromise(i + 1, formData.delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          timeout: 6000,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          timeout: 6000,
        });
      });
    formData.delay = formData.delay + formData.step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
