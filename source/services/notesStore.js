import Datastore from 'nedb-promise';

export class Note {
    constructor(title, content, importance, dueDate, finished = false){
        this.title = title;
        this.content = content;
        this.importance = importance;
        this.createDate = new Date().toISOString().slice(0, 10);
        this.dueDate = new Date(dueDate).toISOString().slice(0, 10);
        this.finished = finished;
    }
}

export class NotesStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(title, content, importance, dueDate, finished) {
        let note = new Note(title, content, importance, dueDate, finished);
        return await this.db.insert(note);
    }

    async delete(id) {
        await this.db.update({_id: id});
        return await this.get(id);
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all() {
        return await this.db.cfind({}).sort({ createDate: -1 }).exec();
    }
}

export const notesStore = new NotesStore();
