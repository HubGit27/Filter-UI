import express, { Router } from 'express';
import chokidar from "chokidar";
import {readFileSync} from 'node:fs';
import e from 'express';

const router = express.Router();

//{log: "test1"}
let logs = []
let filelogs = new Object();
let sort = {data:"Oldest"}
let important = false
let importantLogs = []


const sortLogs = (value) => {
    if (value.data === "A-Z"){
        logs = logs.sort((a,b) => {
            return (a.log > b.log) ? 1 : -1
        })
        } else if  (value.data === "Z-A"){
        logs = logs.sort((a,b) => {
            return (a.log < b.log) ? 1 : -1
        })
        } else if (value.data === "Oldest"){
        logs = logs.sort((a,b) => {
            return (a.time > b.time) ? 1 : -1
        })
        } else if (value.data === "Newest"){
        logs = logs.sort((a,b) => {
            return (a.time < b.time) ? 1 : -1
        })
        }

    displayImportant()
}

const displayImportant = () => {
    var re = /(?<=\").*?(?=\")+/g;
    importantLogs = []
    for (let i = 0; i < logs.length; i++ ){
        let temp = (logs[i].log.match(re) || []).join('');
        if (temp.length > 0){
            importantLogs.push({log:temp, time: logs[i].time})
        }
    }
}


// Routes from here start with /logs
router.get('/', (req,res) => {
    if (important === false){
        res.send(logs);
    }
    else{
        res.send(importantLogs);
    }
});

router.post('/', (req, res) => {
    console.log('post route reached');
    sort = req.body
    if (sort.data === false || sort.data === true){
        important = sort.data
        res.send(`important sort ${req.body}`);
    }
    else{
    sortLogs(sort)
    res.send(`Logs sorted by ${req.body}`);
    }
})

const watcher = chokidar.watch('watch-folder', {
    persistent:true,
//    ignoreInitial:true
})
watcher.add('test-folder');

watcher.on('ready', ()=>{
    console.log("Watching Files")
})

//When file is added
watcher.on('add', path => {
    console.log(path, 'File Added')
    const file = readFileSync(path);
    let decodedVal = Buffer.from(file, 'base64').toString('ascii');
    const loglist = decodedVal.split("\n")
    filelogs[path] = loglist
    for (let i = 0; i < loglist.length; i++ ){
        if (loglist[i].length > 0) {
            const logobject = {log : loglist[i], time : Date.now()+i}
            logs.push(logobject)
        }
    }
    sortLogs(sort)
    console.log(logs)
})

//when file is deleted
watcher.on('unlink', path => {
    console.log(path, "file removed")
    logs = []
    delete filelogs[path]
    for (const key in filelogs) {
        for (let i = 0; i < filelogs[key].length; i++ ){
            if (filelogs[key][i].length > 0){
                logs.push({log: filelogs[key][i], time : Date.now()+i})
            }
        }
    }
    sortLogs(sort)
    console.log(logs)
})

//when file is changed
watcher.on('change', path => {
    console.log('Change in', path)
    const file = readFileSync(path);
    let decodedVal = Buffer.from(file, 'base64').toString('ascii');
    const loglist = decodedVal.split("\n")

    if (loglist.length > filelogs[path].length){
        for (let i = filelogs[path].length; i < loglist.length; i++ ){
            if (loglist[i].length > 0) {
                filelogs[path].push(loglist[i])
                const logobject = {log : loglist[i], time : Date.now()+i}
                logs.push(logobject)
            }
        }
    } else{
        delete filelogs[path]
        filelogs[path] = loglist
        logs = []
        for (const key in filelogs) {
            for (let i = 0; i < filelogs[key].length; i++ ){
                if (filelogs[key][i].length > 0){
                    logs.push({log: filelogs[key][i], time : Date.now()+i})
                }
            }
        }
    }
    sortLogs(sort)
    console.log(logs)
})

export default router