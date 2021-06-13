import {notesStore} from '../services/notesStore.js';

export function getAllNotes(req, res) {
    res.type('text/html');
    res.write("<html>");
    res.write("<p>Was fuer eine Pizze haetten Sie den gerne?</p>");
    res.write("<form action='/orders' method='post'><input name='name' placeholder='pizza name'><input type='submit' value='Order a Pizza'></form>");
    res.end("</html>");
};

export function createNote(req, res) {
    console.log("create new Note start");
    console.log(req.body);
    notesStore.add(req.body.title, req.body.description, 1, req.body.date, false, function (err, order) {
    });
    console.log("create new Note end");
};

export function showNote(req, res) {
    notesStore.get(req.params.id, function (err, order) {
        res.type('text/html');
        res.write("<html>");
        if (order) {
            res.write("<p>Order-Number: " + order._id + "</p>");
            res.write("<p>Status: " + order.state + "</p>");
            if (order.state === "OK") {
                res.write("<form action='/orders/" + order._id + "' method='post'><input type='hidden' name='_method'  value='delete'><input type='submit' value='Delete order'></form>");
            }
        }
        res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
        res.end("</html>");
    });
};

export function deleteNote(req, res) {
    notesStore.delete(req.params.id, function (err, order) {
        res.type('text/html');
        res.write("<html>");
        res.write("<p>Order-Number: " + order._id + "</p>");
        res.write("<p>Status: " + order.state + "</p>");
        res.write("<form action='/' method='get'><input type='submit' value='Zurueck zum start'></form>");
        res.end("</html>");
    });
};
