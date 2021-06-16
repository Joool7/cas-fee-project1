import express from 'express';
import bodyParser from 'body-parser';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import noteRoutes from './routes/notesRoutes.js';

const currentDir = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(noteRoutes);
app.use(express.static(join(currentDir, '/public')));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening at http://localhost:${port}`);
});
