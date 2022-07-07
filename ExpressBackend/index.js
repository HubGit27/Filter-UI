import express from 'express';
import bodyParser from 'body-parser';
import logsRoutes from './routes/logs.js';



const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/logs', logsRoutes)

app.get('/', (req, res) => {
    console.log('test')
    res.send('hello from homepage')
});

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))



