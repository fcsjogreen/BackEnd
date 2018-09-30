


module.exports = {

    plantillaCiudades: function (Ciudades) {
        let ciudadesOrdenadas = Ciudades.sort()
        let ciudadesUnicas = ciudadesOrdenadas.filter(function (value, index) {
            return value !== ciudadesOrdenadas[index + 1]
        })

        let ciudadesTemplate = `<option value="todos" selected>Escoge un tipo</option>
            ${ciudadesUnicas.map(ciudades => `<option value="${ciudades}">${ciudades}</option>`).join('')}`

        return ciudadesTemplate
    },

    plantillaTipos: function (Tipos) {
        let tiposOrdenados = Tipos.sort()
        let tiposUnicos = tiposOrdenados.filter(function (value, index) {
            return value !== tiposOrdenados[index + 1]
        })

        let tiposTemplate = `<option value="todos" selected>Escoge un tipo</option>
            ${tiposUnicos.map(tipos => `<option value="${tipos}">${tipos}</option>`).join('')}`

        return tiposTemplate
    },

    plantillaResultado: function (datos, ciudad, tipo, minimo, maximo) {
        let temp = datos.filter(data => {
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

        let resultadoTemplate = `
            ${respuesta.map(datos =>
                `<div class="card horizontal">
                    <div class="card-image">
                        <img src="img/home.jpg">
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

        return resultadoTemplate
    }

}