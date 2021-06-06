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

function openNotePopUp(){
    document.querySelector('.popup-container').style.display = 'flex';
}

function openNewNotePopUp(){
    openNotePopUp();
    initNewNote();
}

function openEditNotePopUp(note){
    openNotePopUp();
    openExistingNote(note);
}

function closeNewNotePopUp(){
    document.querySelector('.popup-container').style.display = 'none';
}

function bubbleClickFinishNoteHandler(event) {
    console.log(event.target.type);
    if (event.target.type === 'checkbox') {
        const inputNoteId = Number(event.target.dataset.noteId);
        const tempNote = noteService.getNote(inputNoteId);
        if (tempNote.finished === false) {
            tempNote.finished = true;
        } else {
            tempNote.finished = false;
        }
        view.update(noteService);
    } else if (event.target.type === 'button') {
        // edit Button
        const inputNoteId = Number(event.target.dataset.noteBtnId);
        const tempNote = noteService.getNote(inputNoteId);
        openEditNotePopUp(tempNote);
    }
}

selColorStyle.addEventListener('change', toggleColorStyle);
btnNewNote.addEventListener('click', openNewNotePopUp);
btnNewNoteCreate.addEventListener('click', () => {
    if (openedNoteId === ''){
        noteService.addNote(newNoteTitle.value, newNoteDescription.value, newNoteSelImportance, newNoteDate.value, false);
    } else {
        noteService.updateNote(openedNoteId, newNoteTitle.value, newNoteDescription.value, newNoteSelImportance, newNoteDate.value);
    }
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
    noteService.toggleShowFinished(noteService);
    const noteServiceSort = noteService.showFinished(noteService);
    view.update(noteServiceSort);
});

noteList.addEventListener('click', bubbleClickFinishNoteHandler);
