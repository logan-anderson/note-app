// all js to control entering a note form (from the nav bar)
console.log('connected');
const hiddenFormNotes = document.querySelector('#note-list');

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

  const allRows = document.querySelectorAll('.list-items-row');
  // const lastRow = allRows[allRows.length - 1];

  // or update everything
  hiddenFormNotes.value = JSON.stringify(getData());

  const itemRowNew = itemRow.cloneNode(true);
  itemRowNew.childNodes[1].childNodes[1].value = '';
  cols.appendChild(itemRowNew);

  // eslint-disable-next-line no-use-before-define
  setupListeners();
}

function setupListeners() {
  const buttons = document.querySelectorAll('.add-item-btn');
  buttons.forEach((x) => {
    x.addEventListener('click', addItem);
  });
}

setupListeners();
