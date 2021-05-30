class NoteServices {
    constructor() {
        this.notes = [];

        this.addNote('1', 'content1', 5, '2021-05-29', false);
        this.addNote('2', 'Lorem i Stet clita kasd gubergren,amet.', 1, '2021-05-30', false);
        this.addNote('3', 'Lorem i Stet clita kasd gubergren,amet.', 3, '2021-05-31', false);
        this.addNote('4', 'Lorem impores et ea rebum. Sakimata sanctus est Lorem ipsum dolor sit amet.', 2,'2021-06-02', false);
    }

    addNote(title, content, importance, dueDate, finished) {
        const note = new Note(this.notes.length, title, content, importance, dueDate, finished);
        this.notes.push(note);
    }

    getNote(id){
        return this.notes.find(element => element.id === id);
    }

    sortFinish() {
        return this.notes.sort((noteA, noteB) =>{
            if(noteA.dueDate > noteB.dueDate){
                return 1;
            } else{
                return -1;
            }
        });
    }

    sortCreate() {
        return this.notes.sort((noteA, noteB) =>{
            if(noteA.createDate > noteB.createDate){
                return 1;
            } else{
                return -1;
            }
        });
    }

    sortImportance() {
        return this.notes.sort((noteA, noteB) =>{
            if(noteA.importance > noteB.importance){
                return -1;
            } else{
                return 1;
            }
        });
    }

    showFinished() {
        return this.notes.filter((note) => note.finished === false);
    }
}

const noteService = new NoteServices();
