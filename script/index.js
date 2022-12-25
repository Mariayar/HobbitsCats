const cardsContainer = document.querySelector('.cards');
const btnOpenPopupForm = document.querySelector('#add');

const formCatAdd = document.querySelector('#popup-form-cat');

const popupAddCat = new Popup('popup-add-cats');
popupAddCat.setEventListener();

function serializeForm(elements) {
  const formData = {};
  elements.forEach( input => {
      if(input.type === 'submit') return;

      if(input.type !== 'checkbox') {
          formData[input.name] = input.value;
      };

      if(input.type === 'checkbox') {
          formData[input.name] = input.checked;
      }
  });
  return formData;
}

function createCat(catData) {
  const cardInstance = new Card(catData, '#card-template');
  const newCardElement = cardInstance.getElement();
  cardsContainer.append(newCardElement);
}

function handleFormAddCat(e) {
  e.preventDefault();

  const elementsFormCat = [...formCatAdd.elements];

  const dataFromForm = serializeForm(elementsFormCat);
  formCatAdd.reset(); // отчистка полей при сабмите

  api.addNewCat(dataFromForm).then(() => {
    createCat(dataFromForm);
  })
  popupAddCat.close();
}

api.getAllCats().then((data) => {
  data.forEach(function (catData) {
    createCat(catData);
  });
});

btnOpenPopupForm.addEventListener('click', () => {
  popupAddCat.open();
});

formCatAdd.addEventListener('submit', handleFormAddCat)