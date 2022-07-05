import express, { Router } from 'express';

const router = express.Router();

let logs = {log: "test1"}

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


export default router