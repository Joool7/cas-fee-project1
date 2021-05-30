class Note {
    constructor(id, title, content, importance, createDate = new Date(), dueDate, finished = false){
        this.id = id;
        this.title = title;
        this.content = content;
        this.importance = importance;
        this.createDate = createDate;
        this.dueDate = dueDate;
        this.finished = finished;
    }
}
