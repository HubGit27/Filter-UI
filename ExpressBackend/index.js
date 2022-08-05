import express from 'express';
import bodyParser from 'body-parser';
import logsRoutes from './routes/logs.js';
import cors from 'cors'
import 'dotenv/config'


const app = express();
const PORT = 5000;

app.use(cors({
    origin: `http://${process.env.HOST_IP_ADDRESS}:3000`
}))
app.use(bodyParser.json());

app.use('/logs', logsRoutes)

app.get('/', (req, res) => {
    console.log('Express')
    res.send('hello from homepage')
});



app.listen(PORT, () => console.log(`Server Running on port: http://`+process.env.HOST_IP_ADDRESS+`:${PORT}`))



