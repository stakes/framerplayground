(function(){var n,t,i,r,e;n={},n.startX=$(window).width()/2-60,n.isAnimating=!1,n.animation=null,n.springType="spring-rk4",n.codeString="",n.rk4Props={type:"rk4",tension:10,friction:10,velocity:10},n.dhoProps={type:"dho",stiffness:10,damping:10,mass:10,velocity:10},t=new Layer({x:n.startX,y:0,width:120,height:120}),t.style={backgroundColor:"#7ed321",borderRadius:"10px",textAlign:"center",lineHeight:"120px",fontSize:"1rem"},t.html="Drag me!",t.draggable.enabled=!0,t.on(Events.DragEnd,function(i){var r,e;return e=n.springType,r="spring-rk4"===e?n.rk4Props:n.dhoProps,console.log("props -",r),n.animation=new Animation({layer:this,properties:{x:n.startX,y:0},curve:e,curveOptions:r}),n.animation.on(Events.AnimationStart,function(){return n.isAnimating=!0,t.html="Animating...",t.opacity=.3}),n.animation.on(Events.AnimationStop,function(){return n.isAnimating=!1,t.x=n.startX,t.y=0,t.html="Drag me!",t.opacity=1}),n.animation.start()}),i=function(){return $("[data-tab]").on("toggled",function(t,i){return $(i).find("[data-slider]").foundation(),n.springType="spring-"+i[0].id,r(n[i[0].id+"Props"]),e()}),$("#rk4 [data-slider]").on("change",function(){var t,i;return i=$(this).data("slider-name"),t=$(this).attr("data-slider"),$('#rk4 input[name="'+i+'"]').val(t),n.rk4Props[i]=Number(t),r(n.rk4Props),e()}),$("#dho [data-slider]").on("change",function(){var t,i;return i=$(this).data("slider-name"),t=$(this).attr("data-slider"),$('#dho input[name="'+i+'"]').val(t),n.dhoProps[i]=Number(t),r(n.dhoProps),e()}),$('#rk4 input[type="text"]').on("change",function(t){return n.rk4Props[$(this).attr("name")]=Number($(this).val()),r(n.rk4Props),e()}),$('#dho input[type="text"]').on("change",function(t){return n.dhoProps[$(this).attr("name")]=Number($(this).val()),r(n.dhoProps),e()}),$("#stop-btn").on("click",function(t){return t.preventDefault(),n.animation.stop()}),Utils.delay(.1,function(){return r(n.rk4Props),e()})},r=function(t){var i;return console.log(t.type),i=_.template("rk4"===t.type?"myLayer.animate\n 	properties:\n 		x: 0\n 	curve: 'spring-rk4'\n 	curveOptions:\n 		tension: <%= tension %>\n 		friction: <%= friction %>\n 		velocity: <%= velocity %>\n":"myLayer.animate\n 	properties:\n 		x: 0\n 	curve: 'spring-dho'\n 	curveOptions:\n 		stiffness: <%= stiffness %>\n 		damping: <%= damping %>\n 		mass: <%= mass %>\n 		velocity: <%= velocity %>\n"),n.codeString=i(t)},e=function(){return $(".snippet").html(n.codeString)},i(),$(document).foundation()}).call(this);
//# sourceMappingURL=./app.map