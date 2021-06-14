import {noteService} from './services/note-service.js';

class View{
    constructor() {
        this.createNotesFragmentHtmlString = Handlebars.compile(document.getElementById('note-template').innerHTML);
        this.noteList = document.querySelector('.notes-list');
    }

    async update(){
        const noteServiceSort = await noteService.getNotes();
        console.log(noteServiceSort);
        if (noteServiceSort.length === 0) {
            this.noteList.innerHTML = '';
            const tempTask = document.createElement('div');
            tempTask.className = 'empty-note';
            tempTask.innerHTML = '<h3>Es sind keine Notizen anzeigbar.</h3>';
            this.noteList.appendChild(tempTask);
        } else {
            this.noteList.innerHTML = '';
            noteServiceSort.forEach((note) => {
               const tempTask = document.createElement('div');
               tempTask.className = 'note';
               tempTask.innerHTML = this.createNotesFragmentHtmlString({
                   dueDate: View.renderDate(note.dueDate),
                   title: note.title,
                   importance: Array(note.importance).fill('!').join(' '),
                   id: note.id,
                   content: note.content,
               });
                this.noteList.appendChild(tempTask);
                if (note.finished === true){
                    document.querySelector(`[data-note-id="${note.id}"]`).setAttribute('checked', '');
                }
            });
        }
    }

    static renderDate(date){
        const givenDate = new Date(date).setHours(0, 0, 0, 0);
        const actDate = new Date().setHours(0, 0, 0, 0);
        console.log(givenDate - actDate);
        const daysBetweenRaw = (givenDate - actDate) / (24 * 60 * 60 * 1000);
        let daysBetween;
        if (daysBetweenRaw > 0){
            daysBetween = Math.floor(daysBetweenRaw);
        } else {
            daysBetween = Math.ceil(daysBetweenRaw);
        }
        if ((daysBetween < 1) && (daysBetween > -1)) {
            return 'Heute';
        }
        if (daysBetween >= 1){
            // future
            if (daysBetween > 7) {
                return `In ${daysBetween} Tagen`;
            }
            if (daysBetween > 1) {
                return `Am ${View.getDayOfWeek(new Date(givenDate).getDay())}`;
            }
                return 'Morgen';
        }
        if (daysBetween === -1){
            // past
            return `Termin fällig seit ${daysBetween * -1} Tag`;
        }
        if (daysBetween <= -2){
            // past
            return `Termin fällig seit ${daysBetween * -1} Tagen`;
        } else {
            return 'null';
        }
    }

    static getDayOfWeek(day){
        switch (day){
            case 0:
                return 'Sonntag';
            case 1:
                return 'Montag';
            case 2:
                return 'Dienstag';
            case 3:
                return 'Mittwoch';
            case 4:
                return 'Donnerstag';
            case 5:
                return 'Freitag';
            case 6:
                return 'Samstag';
            default:
                return 'This is not a day';
        }
    }
}

const view = new View();
export default view;
