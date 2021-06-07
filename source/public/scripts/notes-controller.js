import {noteService} from './note-service.js';
import view from './view.js';
import popupController from './popup-controller.js';

class NotesController {
    constructor() {
        this.selColorStyle = document.querySelector('[data-drop-style]');
        this.btnNewNote = document.querySelector('[data-btn-new-note]');

        this.btnSortFinish = document.querySelector('[data-btn-sort-finish]');
        this.btnSortCreate = document.querySelector('[data-btn-sort-create]');
        this.btnSortImportance = document.querySelector('[data-btn-sort-importance]');
        this.btnShowFinished = document.querySelector('[data-btn-toggle-finish]');
        this.popUpContainer = document.querySelector('.popup-container');
        this.body = document.body;
        this.sortButtons = document.querySelectorAll('.btn.sort');
        this.notesClickListener = document.querySelector('.notes');
    }

    toggleColorStyle() {
        this.body.classList.toggle('dark-mode');
    }

    btnClearActive() {
        this.sortButtons.forEach((element) => element.classList.remove('btn-active'));
    }

    openNotePopUp() {
        this.popUpContainer.style.display = 'flex';
    }

    openNewNotePopUp() {
        this.openNotePopUp();
        popupController.initNewNote();
    }

    openEditNotePopUp(note) {
        this.openNotePopUp();
        popupController.openExistingNote(note);
    }

    bubbleClickFinishNoteHandler(event) {
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
            this.openEditNotePopUp(tempNote);
        }
    }

    initEventHandlers(){
        this.selColorStyle.addEventListener('change', () => this.toggleColorStyle());
        this.btnNewNote.addEventListener('click', () => this.openNewNotePopUp());

        this.btnSortFinish.addEventListener('click', () => {
            const noteServiceSort = noteService.sortFinish();
            view.update(noteServiceSort);
            this.btnClearActive();
            this.btnSortFinish.classList.add('btn-active');
        });
        this.btnSortCreate.addEventListener('click', () => {
            const noteServiceSort = noteService.sortCreate();
            view.update(noteServiceSort);
            this.btnClearActive();
            this.btnSortCreate.classList.add('btn-active');
        });
        this.btnSortImportance.addEventListener('click', () => {
            const noteServiceSort = noteService.sortImportance();
            view.update(noteServiceSort);
            this.btnClearActive();
            this.btnSortImportance.classList.add('btn-active');
        });
        this.btnShowFinished.addEventListener('click', () => {
            noteService.toggleShowFinished(noteService);
            const noteServiceSort = noteService.showFinished();
            view.update(noteServiceSort);
            this.btnShowFinished.classList.toggle('btn-active');
        });
        this.notesClickListener.addEventListener('click', (event) => {
            this.bubbleClickFinishNoteHandler(event);
        });
    }

    initialize(){
        this.initEventHandlers();
        view.update(noteService);
    }
}

const notesController = new NotesController();
notesController.initialize();
