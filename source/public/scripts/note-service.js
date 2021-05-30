class NoteServices {
    constructor() {
        this.notes = [];

        this.addNote('Title1', 'content1', 5, '2021-05-29', false);
        this.addNote('2', 'Lorem i Stet clita kasd gubergren,amet.', 4, '2021-05-30', false);
        this.addNote('3', 'Lorem i Stet clita kasd gubergren,amet.', 4, '2021-05-31', false);
        this.addNote('4', 'Lorta kasd gubergreest Lorem ipsum dolor sit amet.', 3, '2021-06-01', false);
        this.addNote('5', 'Lorem impores et ea rebum. Sakimata sanctus est Lorem ipsum dolor sit amet.', 2,'2021-06-02', false);
        this.addNote('6', 'Lorem ipsum m ipsu sit amet.', 1, '2021-06-5', false);
        this.addNote('7', 'Loaypsum dolor sit amet.', 1, '2021-06-21', false);
        this.addNote('8', 'Loaypsum dolor sit amet.', 1, '2020-06-21', false);
    }

    addNote(title, content, importance, dueDate, finished) {
        const note = new Note(this.notes.length, title, content, importance, dueDate, finished);
        this.notes.push(note);
    }

    sortFinish() {
        this.notes.sort((noteA, noteB) =>{
            if(noteA.dueDate > noteB.dueDate){
                return 1;
            } else{
                return -1;
            }
        });
    }

    sortCreate() {
        this.notes.sort((noteA, noteB) =>{
            if(noteA.createDate > noteB.createDate){
                return 1;
            } else{
                return -1;
            }
        });
    }

    sortImportance() {
        this.notes.sort((noteA, noteB) =>{
            if(noteA.importance > noteB.importance){
                return -1;
            } else{
                return 1;
            }
        });
    }

    showFinished() {
        this.notes.sort((a,b) =>{
            if(a.dueDate > b.dueDate){
                return 1;
            } else{
                return -1;
            }
        });
    }
}

const noteService = new NoteServices();
