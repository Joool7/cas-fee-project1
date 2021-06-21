import Datastore from 'nedb-promise';
import {Note} from './note.js';

export class NotesStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    async add(title, content, importance, dueDate, finished) {
        return this.db.insert(new Note(title, content, importance, dueDate, finished));
    }

    async delete(id) {
        return this.db.remove({_id: id});
    }

    async get(id) {
        return this.db.findOne({_id: id});
    }

    async update(id, note) {
        await this.db.update({_id: id}, {$set: {
                                                title: note.title,
                                                content: note.content,
                                                importance: note.importance,
                                                createDate: note.createDate,
                                                dueDate: note.dueDate,
                                                finished: note.finished}});
        return this.get(id);
    }

    async all() {
        return this.db.cfind({}).sort({ dueDate: +1 }).exec();
    }
}

export const notesStore = new NotesStore();
