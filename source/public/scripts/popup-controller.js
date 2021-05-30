const newNoteTitle = document.querySelector('.new-note-title');
const newNoteDescription = document.querySelector('.new-note-description');
const newNoteImportanceSelector = document.querySelector('.new-note-importance');
const importanceView = [...newNoteImportanceSelector.querySelectorAll('h1')];
const newNoteDate = document.querySelector('.new-note-date');
const popUpContainer = document.querySelector('.popup-container');
let newNoteSelImportance;

function paintImportance(length, selection){
    for (let i = 0; i < length; i++) {
        if(i < selection) {
            importanceView[i].classList.add('active');
        } else{
            importanceView[i].classList.remove('active');
        }
    }
}

function initNewNote(){
    newNoteTitle.value = '';
    newNoteDescription.value = '';
    newNoteDate.value = '';
    newNoteSelImportance = 1;
    paintImportance(5, newNoteSelImportance);
}

function bubbleClickEventHandler(event) {
    newNoteSelImportance = Number(event.target.dataset.importance);
    paintImportance(importanceView.length, newNoteSelImportance);
}


newNoteImportanceSelector.addEventListener('click', bubbleClickEventHandler);

window.addEventListener('click', (event) => event.target === popUpContainer ? popUpContainer.style.display = 'none' : '');
