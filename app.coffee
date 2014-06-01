$(document).foundation()

DemoLayer = new Layer
  x: 0
  y: 0
  width: 200
  height: 200
DemoLayer.style.borderRadius = '10px'


DemoLayer.on Events.Click, (evt) ->
  tension = $('#panel1').find('input[name="tension"]').val()
  friction = $('#panel1').find('input[name="friction"]').val()
  velocity = $('#panel1').find('input[name="velocity"]').val()
  tolerance = $('#panel1').find('input[name="tolerance"]').val()
  console.log tension, friction, velocity, tolerance