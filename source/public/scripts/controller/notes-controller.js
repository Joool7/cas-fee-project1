import {noteService} from '../services/note-service.js';
import view from '../view.js';
import popupController from './popup-controller.js';

class NotesController {
    constructor() {
        this.selColorStyle = document.querySelector('[data-drop-style]');
        this.btnNewNote = document.querySelector('[data-btn-new-note]');

        this.popUpContainer = document.querySelector('.popup-container');
        this.body = document.body;
        this.sortButtons = document.querySelectorAll('.btn.sort');
        this.noteHeaderButtons = document.querySelector('.note-header-buttons');
        this.notesClickListener = document.querySelector('.notes');
    }

    toggleColorStyle() {
        this.body.classList.toggle('dark-mode');
    }

    btnToggleActive() {
        this.sortButtons.forEach((element) => element.classList.remove('btn-active'));
    }

    openNotePopUp(note) {
        this.popUpContainer.style.display = 'flex';
        popupController.openNote(note);
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
            await this.openNotePopUp(tempNote);
        }
    }

    async bubbleClickNoteHeaderButtonsHandler(event){
        if ((event.target.classList.contains('sort')) || (event.target.classList.contains('filter'))){
            if (event.target.classList.contains('finish')){
                noteService.setSortOrderFinish();
            }
            if (event.target.classList.contains('create')){
                noteService.setSortOrderCreate();
            }
            if (event.target.classList.contains('importance')){
                noteService.setSortOrderImportance();
            }
            if (event.target.classList.contains('finished')){
                noteService.toggleShowFinished(noteService);
            }
            const notes = await noteService.updateSortOrder();
            event.target.classList.toggle('btn-active');
            if (event.target.classList.contains('sort')){
                this.btnToggleActive();
                view.update(notes);
            }
            if (event.target.classList.contains('filter')){
                view.update(await noteService.showFinished(notes));
            }
        }
    }

    initEventHandlers(){
        this.selColorStyle.addEventListener('change', () => this.toggleColorStyle());
        this.btnNewNote.addEventListener('click', () => this.openNotePopUp());
        this.noteHeaderButtons.addEventListener('click', (event) =>{
            this.bubbleClickNoteHeaderButtonsHandler(event);
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
