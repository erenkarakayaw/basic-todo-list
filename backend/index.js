const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors({
    origin : 'http://localhost:5173'
}))


app.get('/', (req, res) => {
    res.json({
        name : "Ali"
    })
})

app.listen(port, () => console.log('started'));