import Note from './note.js';

export class NoteServices {
    constructor() {
        this.notes = [];
        this.filterShowFinishActive = false;
        this.sortOrder = 'sortFinish';

        //this.addNote('1', 'content1', 5, '2021-05-29', false);
        //this.addNote('2', 'Lorem i Stet clita kasd gubergren,amet.', 1, '2021-05-28', false);
        //this.addNote('3', 'Lorem i Stet clita kasd gubergren,amet.', 3, '2021-05-31', false);
        //this.addNote('4', 'Lorem impores et ea rebum. Sakimata sanctus est Lorem ipsum dolor sit amet.', 2, '2021-06-02', false);
        this.updateSortOrder();
    }

    addNote(title, content, importance, dueDate, finished) {
        const note = new Note(this.notes.length, title, content, importance, dueDate, finished);
        this.notes.push(note);
    }

    getNote(id){
        return this.notes.find((element) => element.id === id);
    }

    updateNote(id, title, content, importance, dueDate){
        const note = this.getNote(id);
        note.title = title;
        note.content = content;
        note.importance = importance;
        note.dueDate = new Date(dueDate).setHours(8, 0, 0, 0);
    }

    updateSortOrder(){
        return this[this.sortOrder]();
    }

    sortFinish() {
        this.sortOrder = 'sortFinish';
        this.notes.sort((noteA, noteB) => {
            if (noteA.dueDate > noteB.dueDate){
                return 1;
            }
            if (noteA.dueDate < noteB.dueDate){
                return -1;
            }
            return 0;
        });
        return this.showFinished();
    }

    sortCreate() {
        this.sortOrder = 'sortCreate';
        this.notes.sort((noteA, noteB) => {
            if (noteA.createDate > noteB.createDate){
                return 1;
            }
            if (noteA.createDate < noteB.createDate){
                return -1;
            }
            return 0;
        });
        return this.showFinished();
    }

    sortImportance() {
        this.sortOrder = 'sortImportance';
        this.notes.sort((noteA, noteB) => {
            if (noteA.importance > noteB.importance){
                return -1;
            }
            if (noteA.importance < noteB.importance){
                return 1;
            }
            return 0;
        });
        return this.showFinished();
    }

    showFinished() {
        if (this.filterShowFinishActive === false){
            return this;
        } else {
            const filteredNoteService = new NoteServices();
            filteredNoteService.notes = this.notes.filter((note) => note.finished === false);
            return filteredNoteService;
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
