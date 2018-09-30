

//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()

let precioMinimo = 0
let precioMaximo = 100000

let rango = $("#rangoPrecio").on("change", function () {
  const self = $(this)
  precioMinimo = self.data("from")
  precioMaximo = self.data("to")
  //console.log("minimo " +precioMinimo+" maximo "+precioMaximo)
})

$(document).ready(function () {

  $("#buscar").click(function () {
    ciudad = $("#ciudad").val()
    tipo = $("#tipo").val()
    minimo = precioMinimo
    maximo = precioMaximo

    $.ajax({
      type: "POST",
      url: "http://localhost:8000/buscar",
      data: {Ciudad: ciudad, Tipo: tipo, Minimo: minimo, Maximo: maximo}
    }).done(function (data) {     
      if (data.success) {
        document.getElementById("resultado").innerHTML=""
        $('#resultado').append(data.respuesta);

        return;
      }
    }).fail(function () {
      //do nothing ....
      console.log('failed...');
      return;
    });
  });

  $.ajax({
    url: 'http://localhost:8000/lista',
    method: 'POST',
    data: { list: "lista" }
  }).done(function (data) {

    if (data.success) {
      $('#ciudad').append(data.ciudades);
      $('#tipo').append(data.tipos);
      return;
    }
  }).fail(function () {
    //do nothing ....
    console.log('failed...');
    return;
  });
});
