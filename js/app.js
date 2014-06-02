(function(){var n,t,r,i,e,o;n={},n.startX=$(window).width()/2-120,n.startY=100,n.isAnimating=!1,n.animation=null,n.springType="spring-rk4",n.codeString="",n.rk4Props={type:"rk4",tension:10,friction:10,velocity:10},n.dhoProps={type:"dho",stiffness:10,damping:10,mass:10,velocity:10},t=new Layer({x:n.startX,y:n.startY,width:120,height:120}),t.style={backgroundColor:"#7ed321",borderRadius:"10px",textAlign:"center",lineHeight:"120px",fontSize:"1rem"},t.html="Drag me!",t.draggable.enabled=!0,t.on(Events.DragEnd,function(r){var i,e;return e=n.springType,i="spring-rk4"===e?n.rk4Props:n.dhoProps,console.log("props -",i),n.animation=new Animation({layer:this,properties:{x:n.startX,y:n.startY},curve:e,curveOptions:i}),n.animation.on(Events.AnimationStart,function(){return n.isAnimating=!0,t.html="Animating...",t.opacity=.3}),n.animation.on(Events.AnimationStop,function(){return n.isAnimating=!1,t.x=n.startX,t.y=n.startY,t.html="Drag me!",t.opacity=1}),n.animation.start()}),i=function(){return $("[data-tab]").on("toggled",function(t,r){return $(r).find("[data-slider]").foundation(),n.springType="spring-"+r[0].id,e(n[r[0].id+"Props"]),o()}),$("#rk4 [data-slider]").on("change",function(){var t,r;return r=$(this).data("slider-name"),t=$(this).attr("data-slider"),$('#rk4 input[name="'+r+'"]').val(t),n.rk4Props[r]=Number(t),e(n.rk4Props),o()}),$("#dho [data-slider]").on("change",function(){var t,r;return r=$(this).data("slider-name"),t=$(this).attr("data-slider"),$('#dho input[name="'+r+'"]').val(t),n.dhoProps[r]=Number(t),e(n.dhoProps),o()}),$('#rk4 input[type="text"]').on("change",function(t){return n.rk4Props[$(this).attr("name")]=Number($(this).val()),e(n.rk4Props),o()}),$('#dho input[type="text"]').on("change",function(t){return n.dhoProps[$(this).attr("name")]=Number($(this).val()),e(n.dhoProps),o()}),$("#stop-btn").on("click",function(t){return n.isAnimating?(t.preventDefault(),n.animation.stop()):void 0}),Utils.delay(.1,function(){return e(n.rk4Props),o()})},e=function(t){var r;return console.log(t.type),r=_.template("rk4"===t.type?"myLayer.animate\n 	properties:\n 		x: 0\n 		y: 0\n 	curve: 'spring-rk4'\n 	curveOptions:\n 		tension: <%= tension %>\n 		friction: <%= friction %>\n 		velocity: <%= velocity %>\n":"myLayer.animate\n 	properties:\n 		x: 0\n 		y: 0\n 	curve: 'spring-dho'\n 	curveOptions:\n 		stiffness: <%= stiffness %>\n 		damping: <%= damping %>\n 		mass: <%= mass %>\n 		velocity: <%= velocity %>\n"),n.codeString=r(t)},o=function(){return $(".snippet").html(n.codeString)},r=function(){return n.startX=$(window).width()/2-120,t.x=n.startX},i(),$(document).foundation(),$(window).on("resize",function(){return r()})}).call(this);
//# sourceMappingURL=./app.map