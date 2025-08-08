const express = require('express')
const app = express()
const cors = require('cors')
const sqlite = require('sqlite')
const path = require('path')
const port = 3000
const db = sqlite.Database("./db.db");

app.use(cors({
    origin : 'http://localhost:5173'
}))


app.get('/', (req, res) => {

    let _datas = []

    console.log(db.prepare("SELECT TODO, ISCOMPLETED FROM TODOS").all());

    
    res.json({datas: _datas});
})

app.listen(port, () => console.log('started'));