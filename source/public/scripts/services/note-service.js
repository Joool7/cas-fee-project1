import { httpService } from './http-service.js';

export class NoteServices {
    constructor() {
        this.filterShowFinishActive = false;
        this.sortOrder = 'sortFinish';
    }

    async createNote(title, content, importance, dueDate, finished) {
        return httpService.ajax('POST', '/notes', { title, content, importance, dueDate, finished });
    }

    async getNotes() {
        return httpService.ajax('GET', '/notes', undefined);
    }

    async getNote(id) {
        return httpService.ajax('GET', `/notes/${id}`, undefined);
    }

    async updateNote(id, note) {
        return httpService.ajax('PATCH', `/notes/${id}`, {note});
    }

    updateSortOrder(){
        return this[this.sortOrder]();
    }

    async sortFinish() {
        this.sortOrder = 'sortFinish';
        const notes = await this.getNotes();
        notes.sort((noteA, noteB) => {
            if (noteA.dueDate > noteB.dueDate){
                return 1;
            }
            if (noteA.dueDate < noteB.dueDate){
                return -1;
            }
            return 0;
        });
        return this.showFinished(notes);
    }

    async sortCreate() {
        this.sortOrder = 'sortCreate';
        const notes = await this.getNotes();
        notes.sort((noteA, noteB) => {
            if (noteA.createDate > noteB.createDate){
                return 1;
            }
            if (noteA.createDate < noteB.createDate){
                return -1;
            }
            return 0;
        });
        return this.showFinished(notes);
    }

    async sortImportance() {
        this.sortOrder = 'sortImportance';
        const notes = await this.getNotes();
        notes.sort((noteA, noteB) => {
            if (noteA.importance > noteB.importance){
                return -1;
            }
            if (noteA.importance < noteB.importance){
                return 1;
            }
            return 0;
        });
        return this.showFinished(notes);
    }

    showFinished(notes) {
        if (this.filterShowFinishActive === false){
            return notes;
        } else {
            const filteredNotes = notes.filter((note) => note.finished === false);
            return filteredNotes;
        }
    }

    toggleShowFinished() {
        if (this.filterShowFinishActive === false){
            this.filterShowFinishActive = true;
        } else {
            this.filterShowFinishActive = false;
        }
    }
}

export const noteService = new NoteServices();
