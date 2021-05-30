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

function bubbleClickFinishNoteHandler(event) {
    const inputNoteId = Number(event.target.dataset.noteId);
    const tempNote = noteService.getNote(inputNoteId);
    if(tempNote.finished === false){
        tempNote.finished = true;
    } else{
        tempNote.finished = false;
    }
}

selColorStyle.addEventListener('change', toggleColorStyle);
btnNewNote.addEventListener('click', openNewNotePopUp);
btnNewNoteCreate.addEventListener('click', () => {
    noteService.addNote(newNoteTitle.value, newNoteDescription.value, newNoteSelImportance, newNoteDate.value, false);
    view.update(noteService);
    closeNewNotePopUp();
});
btnClosePopUp.addEventListener('click', closeNewNotePopUp);

// Sort
btnSortFinish.addEventListener('click', () => {
    const noteServiceSort = noteService.sortFinish(noteService);
    view.update(noteServiceSort);
});
btnSortCreate.addEventListener('click', () => {
    const noteServiceSort = noteService.sortCreate(noteService);
    view.update(noteServiceSort);
});
btnSortImportance.addEventListener('click', () => {
    const noteServiceSort = noteService.sortImportance(noteService);
    view.update(noteServiceSort);
});
btnShowFinished.addEventListener('click', () => {
    const noteServiceSort = noteService.showFinished(noteService);
    view.update(noteServiceSort);
});

noteList.addEventListener('click', bubbleClickFinishNoteHandler);
