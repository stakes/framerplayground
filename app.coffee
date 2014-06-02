APP = {}

$ ()->

  APP.startX = $(window).width()/2 - 120
  APP.startY = 100
  APP.isAnimating = false
  APP.animation = null
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
    velocity: 10
  APP.DemoLayer = null

  APP.DemoLayer = DemoLayer = new Layer
    x: APP.startX
    y: APP.startY
    width: 120
    height: 120
  DemoLayer.style =
    backgroundColor: '#7ed321'
    borderRadius: '10px'
    textAlign: 'center'
    lineHeight: '120px'
    fontSize: '1rem'
  DemoLayer.html = 'Drag me!'

  DemoLayer.draggable.enabled = true
  DemoLayer.on Events.DragEnd, (evt) ->
    springStr = APP.springType
    if springStr == 'spring-rk4'
      props = APP.rk4Props
    else
      props = APP.dhoProps
    APP.animation = new Animation
      layer: @
      properties:
        x: APP.startX
        y: APP.startY
      curve: springStr
      curveOptions: props
    APP.animation.on Events.AnimationStart, () ->
      APP.isAnimating = true
      DemoLayer.html = 'Animating...'
      DemoLayer.opacity = .3
    APP.animation.on Events.AnimationStop, () ->
      APP.isAnimating = false
      DemoLayer.x = APP.startX
      DemoLayer.y = APP.startY
      DemoLayer.html = 'Drag me!'
      DemoLayer.opacity = 1
    APP.animation.start()

  setupControls()
  $(document).foundation()
  $(window).on 'resize', () ->
    resetPosition()







setupControls = () ->

  $('[data-tab]').on 'toggled', (evt, tab) ->
    $(tab).find('[data-slider]').foundation()
    APP.springType = 'spring-'+tab[0].id
    updateCodeString APP[tab[0].id+'Props']
    updatePage()

  $('#rk4 [data-slider]').on 'change', () ->
    valueName = $(@).data('slider-name')
    value = $(@).attr('data-slider')
    $('#rk4 input[name="'+valueName+'"]').val(value)
    APP.rk4Props[valueName] = Number value
    updateCodeString(APP.rk4Props)
    updatePage()
  $('#dho [data-slider]').on 'change', () ->
    valueName = $(@).data('slider-name')
    value = $(@).attr('data-slider')
    $('#dho input[name="'+valueName+'"]').val(value)
    APP.dhoProps[valueName] = Number value
    updateCodeString(APP.dhoProps)
    updatePage()

  $('#rk4 input[type="text"]').on 'change', (evt) ->
    APP.rk4Props[$(@).attr('name')] = Number $(@).val()
    updateCodeString(APP.rk4Props)
    updatePage()
  $('#dho input[type="text"]').on 'change', (evt) ->
    APP.dhoProps[$(@).attr('name')] = Number $(@).val()
    updateCodeString(APP.dhoProps)
    updatePage()

  $('#stop-btn').on 'click', (evt) ->
    evt.preventDefault()
    if APP.isAnimating
      APP.animation.stop()

  Utils.delay .1, () ->
    updateCodeString(APP.rk4Props)
    updatePage()



updateCodeString = (props) ->
  if props.type == 'rk4'
    template = _.template "
myLayer.animate\n
\tproperties:\n
\t\tx: 0\n
\t\ty: 0\n
\tcurve: 'spring-rk4'\n
\tcurveOptions:\n
\t\ttension: <%= tension %>\n
\t\tfriction: <%= friction %>\n
\t\tvelocity: <%= velocity %>\n"
  else
    template = _.template "
myLayer.animate\n
\tproperties:\n
\t\tx: 0\n
\t\ty: 0\n
\tcurve: 'spring-dho'\n
\tcurveOptions:\n
\t\tstiffness: <%= stiffness %>\n
\t\tdamping: <%= damping %>\n
\t\tmass: <%= mass %>\n
\t\tvelocity: <%= velocity %>\n"
  APP.codeString = template props


updatePage = () ->
  $('.snippet').html(APP.codeString)
  Rainbow.color()

resetPosition = () ->
  APP.startX = $(window).width()/2 - 120
  APP.DemoLayer.x = APP.startX