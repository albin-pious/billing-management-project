import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import dbConnection from './database/dbConnection.js';
import config from './config/config.js';
import router from './routes/index.js';
import { getDirname } from './utils/helper.js';

const app = express();
dotenv.config();
const port = config.port
const __dirname = getDirname(import.meta.url);

// database configuration.
dbConnection();

app.use(cors(config.corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/bills', express.static(path.join(__dirname, 'bills')));
app.use('/api', router);

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).send('Something broke! Internal Server Error');
})

app.listen(port, ()=>{
    console.log(`Server running on port http://127.0.0.1:${port}`);
})
