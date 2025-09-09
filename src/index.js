import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router.js';

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
//app.use(express.static("static"));

app.listen(+PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
