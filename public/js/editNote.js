// all js to control the edit list page
const hiddenFormNotesEdit = document.querySelector('#note-list-edit');
function makeDanger(btn) {
  btn.classList.remove('btn-outline-secondary');
  btn.classList.add('btn-outline-danger');
  btn.textContent = 'Remove item';
  // eslint-disable-next-line no-use-before-define
  btn.removeEventListener('click', addItemEdit);
  const row = btn.closest('.list-items-row-edit');
  btn.addEventListener('click', () => {
    row.remove();
  });
}
function makeNormal(btn) {
  btn.classList.add('btn-outline-secondary');
  btn.classList.remove('btn-outline-danger');
  btn.textContent = 'Add item';
  // eslint-disable-next-line no-use-before-define
  btn.addEventListener('click', addItemEdit);
}

function getDataEdit() {
  const data = [];
  document.querySelectorAll('.list-items-row-edit').forEach((x) => {
    data.push(x.childNodes[1].childNodes[1].value);
  });
  return data;
}
function setupListenersEdit() {
  const allbtns = [...document.querySelectorAll('.add-item-btn-edit')];
  allbtns.slice(0, allbtns.length - 1).forEach(makeDanger);
  makeNormal(allbtns[allbtns.length - 1]);
}
function addItemEdit() {
  // set the hidden title form value
  document.getElementById('title-form-edit').value = document.getElementById('title-input-edit').value;

  const cols = document.querySelector('.col-edit');
  const itemRow = document.querySelector('.list-items-row-edit');

  // update everything
  hiddenFormNotesEdit.value = JSON.stringify(getDataEdit());

  const itemRowNew = itemRow.cloneNode(true);
  itemRowNew.childNodes[1].childNodes[1].value = '';
  cols.appendChild(itemRowNew);

  const allbtns = [...document.querySelectorAll('.add-item-btn-edit')];
  allbtns.slice(0, allbtns.length - 1).forEach(makeDanger);
  makeNormal(allbtns[allbtns.length - 1]);
}


setupListenersEdit();
// update form when the save button is clicked
document.querySelector('.btn-edit-save').addEventListener('click', (event) => {
  hiddenFormNotesEdit.value = JSON.stringify(getDataEdit());
  document.getElementById('title-form-edit').value = document.getElementById('title-input-edit').value;
});

// update on key presses if needed
// document.onkeypress = function (e) {
//     e = e || window.event;
//     console.log("key pressed")
// };
