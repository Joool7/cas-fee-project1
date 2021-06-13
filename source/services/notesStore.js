import Datastore from 'nedb';
import Note from '../public/scripts/note.js';

const db = new Datastore({filename: '../data/notes.db', autoload: true});

class NotesStore {
    constructor() {
    }

    add(title, content, importance, dueDate, finished, callback) {
        console.log("  publicAddOrder start");
        let note = new Note(title, content, importance, dueDate);
        db.insert(note, function (err, newDoc) {
            console.log("    insert");
            if (callback) {
                callback(err, newDoc);
            }
        });
        console.log("  publicAddOrder end");
    }

    delete(id, callback) {
        db.update({_id: id}, {$set: {"state": "DELETED"}}, {returnUpdatedDocs: true}, function (err, numDocs, doc) {
            callback(err, doc);
        });
    }

    get(id, callback) {
        db.findOne({_id: id}, function (err, doc) {
            callback(err, doc);
        });
    }

    all(callback) {
        db.find({}, function (err, docs) {
            callback(err, docs);
        });
    }
}

export const notesStore = new NotesStore();
