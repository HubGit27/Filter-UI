import express from 'express';
import chokidar from "chokidar";
import {readFileSync} from 'node:fs';

const router = express.Router();

//{log: "test1"}
let logs = []

let filelogs = new Object();

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
    console.log(logs)
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
            const logobject = {log : loglist[i]}
            logs.push(logobject)
        }
    }
    console.log(logs)
})

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
//when file is deleted
watcher.on('unlink', path => {
    console.log(path, "file removed")
    for (let i = 0; i < filelogs[path].length; i++ ){
        logs = removeItemOnce(logs,filelogs[path][i])
    }
    delete filelogs[path]
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
                const logobject = {log : loglist[i]}
                logs.push(logobject)
            }
        }
    } else if (loglist.length < filelogs[path].length){
        let difference = filelogs[path].filter(x => !loglist.includes(x));
        logs = logs.filter( ( el ) => !difference.includes( el ) );
        filelogs[path] = filelogs[path].filter( ( el ) => !difference.includes( el ) );

    }

    console.log(logs)

})

export default router