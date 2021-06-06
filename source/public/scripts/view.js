class View{
    update(noteServiceSort){
        if (noteServiceSort.notes.length === 0) {
            noteList.innerHTML = '';
            const tempTask = document.createElement('div');
            tempTask.className = 'empty-note';
            tempTask.innerHTML = '<h3>Es sind keine Notizen anzeigbar.</h3>';
            noteList.appendChild(tempTask);
        } else {
            noteList.innerHTML = '';
            noteServiceSort.notes.forEach((note) => {
               const tempTask = document.createElement('div');
               tempTask.className = 'note';
               tempTask.innerHTML = createNotesFragmentHtmlString({
                   dueDate: this.renderDate(note.dueDate),
                   title: note.title,
                   importance: Array(note.importance).fill('!').join(' '),
                   id: note.id,
                   content: note.content,
               });
                noteList.appendChild(tempTask);
                if(note.finished === true){
                    document.querySelector(`[data-note-id="${note.id}"]`).setAttribute('checked', '');
                }
            });
        }
    }

    renderDate(date) {
        const actDate = new Date().setHours(0,0,0,0);
        const daysBetweenRaw = (date - actDate) / (24 * 60 * 60 * 1000);
        let daysBetween;
        if(daysBetweenRaw > 0){
            daysBetween = Math.floor(daysBetweenRaw);
        } else{
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
view.update(noteService);
