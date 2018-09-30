const bodyParser = require('body-parser'),
    http       = require('http'),
    express    = require('express')
    

const port = process.env.PORT || 8000,
      app     = express(),         
      Server    = http.createServer(app)


app.use(require('./buscador.js'))
app.use(express.static('public'))

app.locals.datos = require('./data.json')

Server.listen(port, () => console.log("server is running on port: " + port))




