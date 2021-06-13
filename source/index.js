import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import {noteRoutes} from './routes/notesRoutes.js';

const currentDir = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

function methodOverrideFn(req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
    return '';
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride(methodOverrideFn));
app.use(noteRoutes);
app.use(express.static(join(currentDir, '/services')));
app.use(express.static(join(currentDir, '/public')));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
