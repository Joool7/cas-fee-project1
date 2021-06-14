import {notesStore} from '../services/notesStore.js';

export class NotesController{
    async getNotes(req, res) {
        res.json((await notesStore.all()));
    }

    async createNote(req, res) {
        res.json(await notesStore.add(
            req.body.title,
            req.body.content,
            req.body.importance,
            req.body.dueDate,
            req.body.finished,
        ));
    }

    async showNote(req, res) {
        res.json(await notesStore.get(req.params.id));
    }

    async updateNote(req, res) {
        res.json(await notesStore.update(
            req.params.id,
            req.body.note,
            ));
    }

    async deleteNote(req, res) {
        res.json(await notesStore.delete(req.params.id));
    }
}

export const notesController = new NotesController();
