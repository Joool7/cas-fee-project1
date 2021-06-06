const newNoteTitle = document.querySelector('.new-note-title');
const newNoteDescription = document.querySelector('.new-note-description');
const newNoteImportanceSelector = document.querySelector('.new-note-importance');
const importanceView = [...newNoteImportanceSelector.querySelectorAll('h1')];
const newNoteDate = document.querySelector('.new-note-date');
const popUpContainer = document.querySelector('.popup-container');
const popUpTitle = document.querySelector('.popup-new-note h2');

const btnNoteSave = document.querySelector('.btn-note-create');
const btnClosePopUp = document.querySelector('[data-btn-close-popup]');

let newNoteSelImportance;
let openedNoteId;

function closeNewNotePopUp(){
    document.querySelector('.popup-container').style.display = 'none';
}

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
    popUpTitle.innerText = 'Neue Notiz anlegen';
    openedNoteId = '';
    newNoteTitle.value = '';
    newNoteDescription.value = '';
    newNoteDate.value = '';
    newNoteSelImportance = 1;
    paintImportance(5, newNoteSelImportance);
}

function openExistingNote(note){
    popUpTitle.innerText = 'Notiz bearbeiten';
    openedNoteId = note.id;
    newNoteTitle.value = note.title;
    newNoteDescription.value = note.content;
    newNoteDate.value = new Date(note.dueDate).toISOString().substring(0,10);
    newNoteSelImportance = note.importance;
    paintImportance(5, newNoteSelImportance);
}

function bubbleClickEventHandler(event) {
    newNoteSelImportance = Number(event.target.dataset.importance);
    paintImportance(importanceView.length, newNoteSelImportance);
}

newNoteImportanceSelector.addEventListener('click', bubbleClickEventHandler);
btnNoteSave.addEventListener('click', () => {
    if (openedNoteId === ''){
        noteService.addNote(newNoteTitle.value, newNoteDescription.value, newNoteSelImportance, newNoteDate.value, false);
    } else {
        noteService.updateNote(openedNoteId, newNoteTitle.value, newNoteDescription.value, newNoteSelImportance, newNoteDate.value);
    }
    view.update(noteService.updateSortOrder());
    closeNewNotePopUp();
});
btnClosePopUp.addEventListener('click', closeNewNotePopUp);

// close window by click on container
window.addEventListener('click', (event) => event.target === popUpContainer ? popUpContainer.style.display = 'none' : '');
