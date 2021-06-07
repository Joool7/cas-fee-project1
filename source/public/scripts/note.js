export default class Note {
    constructor(id, title, content, importance, dueDate, finished = false){
        this.id = id;
        this.title = title;
        this.content = content;
        this.importance = importance;
        this.createDate = new Date().setHours(8, 0, 0, 0);
        this.dueDate = new Date(dueDate).setHours(8, 0, 0, 0);
        this.finished = finished;
    }
}
