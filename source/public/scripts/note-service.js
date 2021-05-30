class NoteServices {
    constructor() {
        this.notes = [];

        this.addNote('Title1', 'content1', 5, new Date('2021-05-29'), new Date('2021-05-30'), false);
        this.addNote('1', 'Lorem i Stet clita kasd gubergren,amet.', 4, new Date(), new Date('2021-05-31'), false);
        this.addNote('2', 'Lorta kasd gubergreest Lorem ipsum dolor sit amet.', 3, new Date('2021-05-32'), new Date('2021-06-01'), false);
        this.addNote('3', 'Lorem impores et ea rebum. Sakimata sanctus est Lorem ipsum dolor sit amet.', 2, new Date('2021-05-29'), new Date('2021-06-02'), false);
        this.addNote('4', 'Lorem ipsum m ipsu sit amet.', 1, new Date('2021-05-29'), new Date('2021-06-5'), false);
        this.addNote('5', 'Loaypsum dolor sit amet.', 1, new Date('2021-05-29'), new Date('2021-06-21'), false);
        this.addNote('6', 'Loaypsum dolor sit amet.', 1, new Date('2021-05-29'), new Date('2020-06-21'), false);
    }

    addNote(title, content, importance, createDate, dueDate, finished) {
        const note = new Note(this.notes.length, title, content, importance, createDate, dueDate, finished);
        this.notes.push(note);
        return note;
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
                return 1;
            } else{
                return -1;
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
