// all js to control entering a note form (from the nav bar)
console.log('connected');
const hiddenFormNotes = document.querySelector('#note-list');

function makeDanger(btn) {
  btn.classList.remove('btn-outline-secondary');
  btn.classList.add('btn-outline-danger');
  btn.textContent = 'Remove item';
  // eslint-disable-next-line no-use-before-define
  btn.removeEventListener('click', addItem);
  const row = btn.closest('.list-items-row');
  btn.addEventListener('click', () => {
    row.remove();
  });
}
function makeNormal(btn) {
  btn.classList.add('btn-outline-secondary');
  btn.classList.remove('btn-outline-danger');
  btn.textContent = 'Add item';
  // eslint-disable-next-line no-use-before-define
  btn.addEventListener('click', addItem);
}

function getData() {
  const data = [];
  document.querySelectorAll('.list-items-row').forEach((x) => {
    data.push(x.childNodes[1].childNodes[1].value);
  });
  return data;
}
function addItem() {
  // set the hidden title form value
  document.getElementById('title-form').value = document.getElementById('title-input').value;

  const cols = document.querySelector('.modal-col-test');
  const itemRow = document.querySelector('.list-items-row');

  // or update everything
  hiddenFormNotes.value = JSON.stringify(getData());

  const itemRowNew = itemRow.cloneNode(true);
  itemRowNew.childNodes[1].childNodes[1].value = '';
  cols.appendChild(itemRowNew);

  const allbtns = [...document.querySelectorAll('.add-item-btn')];
  allbtns.slice(0, allbtns.length - 1).forEach(makeDanger);
  makeNormal(allbtns[allbtns.length - 1]);
  // eslint-disable-next-line no-use-before-define
  // setupListeners();
}

function setupListeners() {
  const buttons = document.querySelectorAll('.add-item-btn');
  buttons.forEach((x) => {
    x.addEventListener('click', addItem);
  });
}

setupListeners();
