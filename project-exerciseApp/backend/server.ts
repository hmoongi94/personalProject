import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';

const app = express();
const port = 3560;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

