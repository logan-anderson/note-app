// all js to control entering a note form (from the nav bar)
console.log("connected")
hiddenFormNotes = document.querySelector("#note-list");
function add_item() {
    //set the hidden title form value
    document.getElementById("title-form").value =  document.getElementById('title-input').value;
    
    let cols = document.querySelector(".modal-col-test");
    let itemRow = document.querySelector(".list-items-row");

    let allRows = document.querySelectorAll(".list-items-row");
    let lastRow = allRows[allRows.length-1];
    // update as we go
    // hiddenFormNotes.value = hiddenFormNotes.value + ',' + lastRow.childNodes[1].childNodes[1].value;

    // or update everything
    hiddenFormNotes.value = JSON.stringify(getData());

    let itemRowNew = itemRow.cloneNode(true);
    itemRowNew.childNodes[1].childNodes[1].value = "";
    cols.appendChild(itemRowNew);
    setupListeners();
}

function setupListeners() {
    let buttons = document.querySelectorAll('.add-item-btn');
    buttons.forEach((x) => {
        x.addEventListener("click", add_item);
    });
}
function getData(){
    let data = [];
    document.querySelectorAll(".list-items-row").forEach((x)=>{
        data.push(x.childNodes[1].childNodes[1].value);
    });
    return data;
}
setupListeners();

