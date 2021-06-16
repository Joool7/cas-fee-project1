import {noteService} from '../services/note-service.js';
import view from '../view.js';
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

    async bubbleClickFinishNoteHandler(event) {
        if (event.target.type === 'checkbox') {
            const inputNoteId = event.target.dataset.noteId;
            const tempNote = await noteService.getNote(inputNoteId);
            if (tempNote.finished === false) {
                tempNote.finished = true;
            } else {
                tempNote.finished = false;
            }
            await noteService.updateNote(inputNoteId, tempNote);
            view.update(await noteService.updateSortOrder());
        } else if (event.target.type === 'button') {
            // edit Button
            const inputNoteId = event.target.dataset.noteBtnId;
            const tempNote = await noteService.getNote(inputNoteId);
            await this.openEditNotePopUp(tempNote);
        }
    }

    initEventHandlers(){
        this.selColorStyle.addEventListener('change', () => this.toggleColorStyle());
        this.btnNewNote.addEventListener('click', () => this.openNewNotePopUp());

        this.btnSortFinish.addEventListener('click', async () => {
            const notes = await noteService.sortFinish();
            view.update(notes);
            this.btnClearActive();
            this.btnSortFinish.classList.add('btn-active');
        });
        this.btnSortCreate.addEventListener('click', async () => {
            const notes = await noteService.sortCreate();
            view.update(notes);
            this.btnClearActive();
            this.btnSortCreate.classList.add('btn-active');
        });
        this.btnSortImportance.addEventListener('click', async () => {
            const notes = await noteService.sortImportance();
            view.update(notes);
            this.btnClearActive();
            this.btnSortImportance.classList.add('btn-active');
        });
        this.btnShowFinished.addEventListener('click', async () => {
            noteService.toggleShowFinished(noteService);
            const notes = await noteService.sortImportance();
            view.update(await noteService.showFinished(notes));
            this.btnShowFinished.classList.toggle('btn-active');
        });
        this.notesClickListener.addEventListener('click', (event) => {
            this.bubbleClickFinishNoteHandler(event);
        });
    }

    async initialize(){
        this.initEventHandlers();
        const notes = await noteService.getNotes();
        view.update(notes);
    }
}

const notesController = new NotesController();
notesController.initialize();
