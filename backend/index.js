const express = require('express')
const app = express()
const cors = require('cors')
const sqlite = require('node:sqlite')
const path = require('path')
const port = 3000
const db = new sqlite.DatabaseSync("db.db");

app.use(cors({
    origin : 'http://localhost:5173'
}))


app.get('/get', (req, res) => {

    let _datas = []
    
    if (!db.isOpen) db.open()    
    
    db.prepare("SELECT TODO_ID, TODO, ISCOMPLETED FROM TODOS").all().forEach((item) => {
        _datas.push({
            todoID: item.TODO_ID,
            todo: item.TODO,
            isCompleted: Boolean(item.ISCOMPLETED)
        })
    })
    
    db.close()

    res.status(200)
    res.json({datas: _datas});
})

app.get('/add', (req,res) => {
    
    const todo=req.query.todo    

    if (!db.isOpen) db.open() 

    try {
        db.prepare("INSERT INTO TODOS (TODO, ISCOMPLETED) VALUES (?, ?)").
        run(todo, 0)
    } catch (err) {
            console.log(err)
    }

    db.close()

    res.status(200)
    res.send()
})

app.get('/update', (req,res) => {

    const isCompleted = req.query.iscompleted
    const todo = req.query.todoid
    
    if (!db.isOpen) db.open() 

    db.exec(
        `UPDATE TODOS SET ISCOMPLETED=${isCompleted} WHERE TODO_ID = ${todo}`
    );       

    db.close()

    res.status(200)
    res.send()
})

app.get('/delete', (req,res) => {
    const todoid = req.query.todoid
    
    if (!db.isOpen) db.open() 

    db.exec(
        `DELETE FROM TODOS WHERE TODO_ID=${todoid}`
    );       

    db.close()

    res.status(200)
    res.send()
})

app.listen(port, () => console.log('started'));