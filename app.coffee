APP = {}
APP.isAnimating = false
APP.property = 'x'
APP.springType = 'spring-rk4'
APP.codeString = ''
APP.rk4Props =
  type: 'rk4'
  tension: 10
  friction: 10
  velocity: 10
APP.dhoProps =
  type: 'dho'
  stiffness: 10
  damping: 10
  mass: 10
  velocity2: 10





DemoLayer = new Layer
  x: 0
  y: 0
  width: 200
  height: 200
DemoLayer.style =
  backgroundColor: '#7ed321'
  borderRadius: '10px'
  textAlign: 'center'
  lineHeight: '200px'
DemoLayer.html = 'Click me!'

DemoLayer.on Events.Click, (evt) ->
  tension = $('#panel1').find('input[name="tension"]').val()
  friction = $('#panel1').find('input[name="friction"]').val()
  velocity = $('#panel1').find('input[name="velocity"]').val()
  animation = new Animation
    layer: @
    properties:
      x: 500
    curve: 'spring'
    curveOptions: APP.rk4Props
  animation.on 'start', () ->
    DemoLayer.html = 'Animating...'
    DemoLayer.opacity = .3
  animation.on 'end', () ->
    DemoLayer.html = 'Click me!'
    DemoLayer.opacity = 1
  animation.start()





setupForms = () ->
  _.each $('[data-slider]').on 'change', () ->
    valueName = $(@).data('slider-name')
    value = $(@).attr('data-slider')
    $('input[name="'+valueName+'"]').val(value)
    APP.rk4Props[valueName] = Number value
    updateCodeString(APP.rk4Props)
    updatePage()

  _.each $('#panel1 input[type="text"]'), (el) ->
    propName = $(el).attr('name')

  $('#panel1').find('input[type="text"]').on 'change', (evt) ->
    APP.rk4Props[$(@).attr('name')] = Number $(@).val()
    updateCodeString(APP.rk4Props)
    updatePage()



updateCodeString = (props) ->
  if props.type == 'rk4'
    template = _.template "
myLayer.animate\n
properties:\n
  x: 500\n
curve: 'spring'\n
curveOptions:\n
  tension: <%= tension %>\n
  friction: <%= friction %>\n
  velocity: <%= velocity %>\n"
  APP.codeString = template props


updatePage = () ->
  $('.snippet').html(APP.codeString)

setupForms()
$(document).foundation()