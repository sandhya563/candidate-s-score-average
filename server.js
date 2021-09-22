const express = require('express')
const app = express()
const port = 6000

app.use(express.json())
app.use('/',require('./router'))
app.use('/',require('./database'))

app.listen(port,()=>{
    console.log(`SERVER IS RUNNING AT PORT ${port}`);
});