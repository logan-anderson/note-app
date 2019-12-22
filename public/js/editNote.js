// all js to control the edit list page

hiddenFormNotes = document.querySelector("#note-list-edit");
function add_item_edit() {
    //set the hidden title form value
    document.getElementById("title-form-edit").value = document.getElementById('title-input-edit').value;

    let cols = document.querySelector(".col-edit");
    let itemRow = document.querySelector(".list-items-row-edit");

    // update everything
    hiddenFormNotes.value = JSON.stringify(getData_edit());

    let itemRowNew = itemRow.cloneNode(true);
    itemRowNew.childNodes[1].childNodes[1].value = "";
    cols.appendChild(itemRowNew);
    setupListeners_edit();
}

function setupListeners_edit() {
    let buttons = document.querySelectorAll('.add-item-btn-edit');
    buttons.forEach((x) => {
        x.addEventListener("click", add_item_edit);
    });
}
function getData_edit() {
    let data = [];
    document.querySelectorAll(".list-items-row-edit").forEach((x) => {
        data.push(x.childNodes[1].childNodes[1].value);
    });
    return data;
}
setupListeners_edit();
//update form when the save button is clicked
document.querySelector(".btn-edit-save").addEventListener("click", (event) => {
    hiddenFormNotes.value = JSON.stringify(getData_edit());
    document.getElementById("title-form-edit").value = document.getElementById('title-input-edit').value;
});

//update on key presses if needed
// document.onkeypress = function (e) {
//     e = e || window.event;
//     console.log("key pressed")
// };

