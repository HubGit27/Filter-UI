import express, { Router } from 'express';
import chokidar from "chokidar";
import {readFileSync} from 'node:fs';

const router = express.Router();

//{log: "test1"}
let logs = []

// for (let i = 0; i < 200; i++) {
//     logs = {log: i};
// }

// Routes from here start with /logs
router.get('/', (req,res) => {
    res.send(logs);
});

router.post('/', (req, res) => {
    console.log('post route reached');
    const log = req.body
    logs.push(log)
    res.send(`Log with the name ${log.log} added to the database`);
})

const watcher = chokidar.watch('watch-folder', {
    persistent:true,
//    ignoreInitial:true
})

watcher.on('ready', ()=>{
    console.log("Watching Files")
})

//When file is added
watcher.on('add', path => {
    console.log(path, 'File Added')
    const file = readFileSync(path);
    let decodedVal = Buffer.from(file, 'base64').toString('ascii');
    const loglist = decodedVal.split("\n")
    for (let i = 0; i < loglist.length; i++ ){
        if (loglist[i].length > 0) {
            const logobject = {log : loglist[i]}
            logs.push(logobject)
            console.log(logobject)
        }
    }
})

//when file is deleted
watcher.on('unlink', path => {
    console.log(path, "file removed")
})

//when file is changed
watcher.on('change', path => {
    console.log('Change in', path)
    const file = readFileSync(path);
    let decodedVal = Buffer.from(file, 'base64').toString('ascii');
    const loglist = decodedVal.split("\n")
    const lastlog = (loglist[loglist.length-1])
    if (lastlog.length > 0) {
        const logobject = {log : lastlog}
        logs.push(logobject)
    }

})

export default router