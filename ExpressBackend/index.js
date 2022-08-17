import express from 'express';
import bodyParser from 'body-parser';
import logsRoutes from './routes/logs.js';
import cors from 'cors'
import 'dotenv/config'
import fs from 'fs'
import https from 'https'
var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate};

const app = express();
const PORT = 5000;

app.use(cors({
    origin: true
}))
app.use(bodyParser.json());

app.use('/logs', logsRoutes)

app.get('/', (req, res) => {
    console.log('Express')
    res.send('hello from homepage')
});


var httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT);



