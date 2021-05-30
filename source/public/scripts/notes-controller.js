const createNotesFragmentHtmlString = Handlebars.compile(document.getElementById('note-template').innerHTML);

const selColorStyle = document.querySelector('#sel-color-style');
const btnNewNote = document.querySelector('#btn-new-note');
const btnClosePopUp = document.querySelector('#btn-close-pop-up');
const btnNewNoteCreate = document.querySelector('.btn-note-create');

// Sort
const btnSortFinish = document.querySelector('.btn-sort-finish');
const btnSortCreate = document.querySelector('.btn-sort-create');
const btnSortImportance = document.querySelector('.btn-sort-importance');
const btnShowFinished = document.querySelector('.btn-show-finish');

// View
const noteList = document.querySelector('.notes-list');

function toggleColorStyle(){
    document.body.classList.toggle('dark-mode');
}

function openNewNotePopUp(){
    document.querySelector('.popup-container').style.display = 'flex';
    initNewNote();
}

function closeNewNotePopUp(){
    document.querySelector('.popup-container').style.display = 'none';
}

selColorStyle.addEventListener('change', toggleColorStyle);
btnNewNote.addEventListener('click', openNewNotePopUp);
btnNewNoteCreate.addEventListener('click', () => {
    noteService.addNote(newNoteTitle.value, newNoteDescription.value, newNoteSelImportance, newNoteDate.value, false);
    view.update();
    closeNewNotePopUp();
});
btnClosePopUp.addEventListener('click', closeNewNotePopUp);

// Sort
btnSortFinish.addEventListener('click', () => {
    noteService.sortFinish(noteService);
    view.update();
});
btnSortCreate.addEventListener('click', () => {
    noteService.sortCreate(noteService);
    view.update();
});
btnSortImportance.addEventListener('click', () => {
    noteService.sortImportance(noteService);
    view.update();
});
btnShowFinished.addEventListener('click', () => {
    noteService.showFinished(noteService);
    view.update();
});
