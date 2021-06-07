import {noteService} from './note-service.js';
import view from './view.js';

class PopupController {
    constructor() {
        this.newNoteTitle = document.querySelector('.new-note-title');
        this.newNoteDescription = document.querySelector('.new-note-description');
        this.newNoteImportanceSelector = document.querySelector('.new-note-importance');
        this.importanceView = [...this.newNoteImportanceSelector.querySelectorAll('h1')];
        this.newNoteDate = document.querySelector('.new-note-date');
        this.popUpContainer = document.querySelector('.popup-container');
        this.popUpTitle = document.querySelector('.popup-new-note h2');

        this.btnNoteSave = document.querySelector('.btn-note-create');
        this.btnClosePopUp = document.querySelector('[data-btn-close-popup]');

        this.newNoteSelImportance = 0;
        this.openedNoteId = '';
    }

    closeNewNotePopUp() {
        this.popUpContainer.style.display = 'none';
    }

    paintImportance(length, selection) {
        for (let i = 0; i < length; i++) {
            if (i < selection) {
                this.importanceView[i].classList.add('active');
            } else {
                this.importanceView[i].classList.remove('active');
            }
        }
    }

    initNewNote() {
        this.popUpTitle.innerText = 'Neue Notiz anlegen';
        this.openedNoteId = '';
        this.newNoteTitle.value = '';
        this.newNoteDescription.value = '';
        this.newNoteDate.value = '';
        this.newNoteSelImportance = 1;
        this.paintImportance(5, this.newNoteSelImportance);
    }

    openExistingNote(note) {
        this.popUpTitle.innerText = 'Notiz bearbeiten';
        this.openedNoteId = note.id;
        this.newNoteTitle.value = note.title;
        this.newNoteDescription.value = note.content;
        this.newNoteDate.value = new Date(note.dueDate).toISOString().substring(0, 10);
        this.newNoteSelImportance = note.importance;
        this.paintImportance(5, this.newNoteSelImportance);
    }

    bubbleClickEventHandler(event) {
        this.newNoteSelImportance = Number(event.target.dataset.importance);
        this.paintImportance(this.importanceView.length, this.newNoteSelImportance);
    }

    initEventHandlers() {
        this.newNoteImportanceSelector.addEventListener('click', (event) => this.bubbleClickEventHandler(event));
        this.btnNoteSave.addEventListener('click', () => {
                    if (this.openedNoteId === '') {
                        noteService.addNote(
                            this.newNoteTitle.value,
                            this.newNoteDescription.value,
                            this.newNoteSelImportance,
                            this.newNoteDate.value,
                            false,
                            );
                    } else {
                        noteService.updateNote(
                            this.openedNoteId,
                            this.newNoteTitle.value,
                            this.newNoteDescription.value,
                            this.newNoteSelImportance,
                            this.newNoteDate.value,
                        );
                    }
                    view.update(noteService.updateSortOrder());
                    this.closeNewNotePopUp();
                });
        this.btnClosePopUp.addEventListener('click', () => this.closeNewNotePopUp());

        // close window by click on container
        window.addEventListener(
            'click',
            (event) => {
                if (event.target === this.popUpContainer) {
                    this.popUpContainer.style.display = 'none';
                }
            },
        );
    }
}

const popupController = new PopupController();
popupController.initEventHandlers();
export default popupController;
