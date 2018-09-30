//aqui va el router
const express = require('express')
const plantillas = require('./templates.js')
const Router = express.Router()
const bodyParser = require('body-parser');
const path = require('path')

Router.use(bodyParser.json())
Router.use(bodyParser.urlencoded({extended: true}))


Router.get('/', (req, res) => {
        
    res.sendFile(path.join(__dirname, './public', 'index.html'));

})

Router.post('/lista', function(req,res){

    let Ciudades = [];
    let Tipos = [];

    req.app.locals.datos.forEach((element, index) => {
        Ciudades[index] = element.Ciudad
        Tipos[index] = element.Tipo

    })

    let listaTipos = plantillas.plantillaTipos(Tipos)
    let listaCiudades= plantillas.plantillaCiudades(Ciudades)

    res.send({success: true, ciudades: listaCiudades, tipos: listaTipos})
})

Router.post('/buscar', function (req, res) {
    let ciudad = req.body.Ciudad;
    let tipo = req.body.Tipo;
    let minimo = req.body.Minimo;
    let maximo = req.body.Maximo;
    let p = req.app.locals.datos;
    console.log("recibido ciudad " + ciudad + " tipo " + tipo + " minimo " + minimo + " maximo " + maximo)

    let listaRespuesta = plantillas.plantillaResultado(p, ciudad, tipo, minimo, maximo)
    res.send({success: true, respuesta: listaRespuesta })
    
})

module.exports = Router
