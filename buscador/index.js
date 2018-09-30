//aqui va el router
const express = require('express')
//const Storate = require('../Storage')
const Router = express.Router()
//const bodyParser = require('body-parser');

const fs = require('fs')
const path = require('path')
const cheerio = require("cheerio");


const Ciudades = [];
const Tipos = [];



Router.get('/', (req, res) => {

    req.app.locals.datos.forEach((element, index) => {
        Ciudades[index] = element.Ciudad
        Tipos[index] = element.Tipo
    
    })
    
    const ciudadesOrdenadas = Ciudades.sort()
    const ciudadesUnicas = ciudadesOrdenadas.filter(function (value, index) {
        return value !== ciudadesOrdenadas[index + 1]
    })
    
    const tiposOrdenados = Tipos.sort()
    const tiposUnicos = tiposOrdenados.filter(function (value, index) {
        return value !== tiposOrdenados[index + 1]
    })
    let $ = cheerio.load(fs.readFileSync('../public/index.html'));
    //let documento = plantilla(ciudadesUnicas, tiposUnicos, "<p></p>")
    let ciudadesTemplate = `<option value="todos" selected>Escoge un tipo</option>
        ${ciudadesUnicas.map(ciudades => `<option value="${ciudades}">${ciudades}</option>`).join('')}`
    let tiposTemplate = `<option value="todos" selected>Escoge un tipo</option>
        ${tiposUnicos.map(tipos => `<option value="${tipos}">${tipos}</option>`).join('')}`

    $('#ciudad').append(ciudadesTemplate)
    $('#tipo').append(tiposTemplate)

    //res.send($.html());
    res.sendFile(path.join(__dirname, '../public', 'index.html'));

})

Router.post('/buscar', function (req, res) {
    let ciudad = req.body.Ciudad;
    let tipo = req.body.Tipo;
    let minimo = req.body.Minimo;
    let maximo = req.body.Maximo;
    let p = req.app.locals.datos;

    console.log("ciudad "+ciudad+" tipo "+tipo)

    let temp = p.filter(data => {
        if (ciudad != "todos") {
            return data.Ciudad == ciudad
        } else {
            return data
        }
    })
    let temp2 = temp.filter(data => {
        if (tipo != "todos") {
            return data.Tipo == tipo
        } else {
            return data
        }
    })
    let respuesta = temp2.filter(data => {
        return Number(data.Precio.replace('$', '').replace(',', '')) >= minimo && Number(data.Precio.replace('$', '').replace(',', '')) <= maximo
    })

    //var numPropiedades = Object.keys(respuesta).length
    
    //let rCiudad = respuesta.map(data => { return data.Ciudad })
    //let rDireccion = respuesta.map(data => { return data.Direccion })
    //let rTelefono = respuesta.map(data => { return data.Telefono })
    //let rPostal = respuesta.map(data => { return data.Codigo_Postal })
    //let rTipo = respuesta.map(data => { return data.Tipo })
    //let rPrecio = respuesta.map(data => { return data.Precio })

    let $ = cheerio.load(fs.readFile(__dirname + '/index.html'));

    let resultadoTemplate = `
        ${respuesta.map(datos =>
                `<div class="card horizontal">
                <div class="card-image">
                    <img src="images/home.jpg">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <div>
                            <b>Direccion: </b><p>${datos.Direccion}</p>
                        </div>
                        <div>
                            <b>Ciudad: </b><p>${datos.Ciudad}</p>
                        </div>
                        <div>
                            <b>Telefono: </b><p>${datos.Telefono}</p>
                        </div>
                        <div>
                            <b>Código postal: </b><p>${datos.Codigo_Postal}</p>
                        </div>
                        <div>
                            <b>Precio: </b><p>${datos.Precio}</p>
                        </div>
                        <div>
                            <b>Tipo: </b><p>${datos.Tipo}</p>
                        </div>
                    </div>
                    <div class="card-action right-align">
                        <a href="#">Ver más</a>
                    </div>
                </div>
            </div>`).join('')}`    
    
    $('.lista').append(resultadoTemplate)
    //res.send($.html());
    res.sendFile(path.join(__dirname, '../public', 'index.html'));

    // ciudad: rCiudad, direccion: rDireccion,  telefono: rTelefono, postal: rPostal, tipo: rTipo, precio: rPrecio
})

module.exports = Router
