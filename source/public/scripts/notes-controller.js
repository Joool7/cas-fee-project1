const createNotesFragmentHtmlString = Handlebars.compile(document.getElementById('note-template').innerHTML);

const selColorStyle = document.querySelector('[data-drop-style]');
const btnNewNote = document.querySelector('[data-btn-new-note]');

// Sort
const btnSortFinish = document.querySelector('[data-btn-sort-finish]');
const btnSortCreate = document.querySelector('[data-btn-sort-create]');
const btnSortImportance = document.querySelector('[data-btn-sort-importance]');
const btnShowFinished = document.querySelector('[data-btn-toggle-finish]');

// View
const noteList = document.querySelector('.notes-list');

function toggleColorStyle(){
    document.body.classList.toggle('dark-mode');
}

function btnClearActive(){
    const sortButtons = document.querySelectorAll('.btn.sort');
    sortButtons.forEach((element) => element.classList.remove('btn-active'));
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

function bubbleClickFinishNoteHandler(event) {
    if (event.target.type === 'checkbox') {
        const inputNoteId = Number(event.target.dataset.noteId);
        const tempNote = noteService.getNote(inputNoteId);
        if (tempNote.finished === false) {
            tempNote.finished = true;
        } else {
            tempNote.finished = false;
        }
        view.update(noteService.updateSortOrder());
    } else if (event.target.type === 'button') {
        // edit Button
        const inputNoteId = Number(event.target.dataset.noteBtnId);
        const tempNote = noteService.getNote(inputNoteId);
        openEditNotePopUp(tempNote);
    }
}

selColorStyle.addEventListener('change', toggleColorStyle);
btnNewNote.addEventListener('click', openNewNotePopUp);

// Sort
btnSortFinish.addEventListener('click', () => {
    const noteServiceSort = noteService.sortFinish();
    view.update(noteServiceSort);
    btnClearActive();
    btnSortFinish.classList.add('btn-active');
});
btnSortCreate.addEventListener('click', () => {
    const noteServiceSort = noteService.sortCreate();
    view.update(noteServiceSort);
    btnClearActive();
    btnSortCreate.classList.add('btn-active');
});
btnSortImportance.addEventListener('click', () => {
    const noteServiceSort = noteService.sortImportance();
    view.update(noteServiceSort);
    btnClearActive();
    btnSortImportance.classList.add('btn-active');
});
btnShowFinished.addEventListener('click', () => {
    noteService.toggleShowFinished(noteService);
    const noteServiceSort = noteService.showFinished();
    view.update(noteServiceSort);
    btnShowFinished.classList.toggle('btn-active');
});

noteList.addEventListener('click', bubbleClickFinishNoteHandler);
