export default class Note {
    constructor(title, content, importance, dueDate, finished = false){
        this.title = title;
        this.content = content;
        this.importance = importance;
        this.createDate = new Date().toISOString().slice(0, 10);
        this.dueDate = new Date(dueDate).toISOString().slice(0, 10);
        this.finished = finished;
    }
}
