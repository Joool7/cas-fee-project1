class View{
    update(){
        if (noteService.notes.length === 0) {
        } else {
            noteList.innerHTML = '';
            noteService.notes.forEach((note) => {
               const tempTask = document.createElement('div');
               tempTask.className = 'note';
               tempTask.innerHTML = createNotesFragmentHtmlString({
                   dueDate: this.renderDate(note.dueDate),
                   title: note.title,
                   importance: Array(note.importance).fill('!').join(' '),
                   id: note.id,
                   finished: note.finished,
                   content: note.content,
               });
                noteList.appendChild(tempTask);
            });
        }
    }

    renderDate(date) {
        const actDate = new Date().setHours(0,0,0,0);
        const bli = (date - actDate);
        const blu = bli / (24*60*60*1000);
        let daysBetween;
        if(blu > 0){
            daysBetween = Math.floor(blu);
        } else{
            daysBetween = Math.ceil(blu);
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
                return `Am ${this.getDayOfWeek(new Date(date).getDay())}`;
            } else {
                return 'Morgen';
            }
        }
        if (daysBetween === -1){
            // past
            return `Termin fällig seit ${daysBetween * -1} Tag`;
        }
        if (daysBetween <= -2){
            // past
            return `Termin fällig seit ${daysBetween * -1} Tagen`;
        }
    }

    getDayOfWeek(day){
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
        }
    }
}

const view = new View();
view.update();
