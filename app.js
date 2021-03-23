const express = require('express')
const app = express()
const port = 8080

app.use(express.static('images'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})