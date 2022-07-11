import express from 'express';
import bodyParser from 'body-parser';
import logsRoutes from './routes/logs.js';



const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/logs', logsRoutes)

app.get('/', (req, res) => {
    res.send('hello backend')
});

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))



