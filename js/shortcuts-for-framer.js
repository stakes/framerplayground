(function(){var e;Framer.Shortcuts={},Framer.Defaults.displayInDevice={enabled:!0,resizeToFit:!0,canvasWidth:640,canvasHeight:1136,deviceWidth:770,deviceHeight:1610,deviceImage:"http://shortcuts-for-framer.s3.amazonaws.com/iphone-5s-white.png",bobbleImage:"http://shortcuts-for-framer.s3.amazonaws.com/bobble.png"},Framer.Defaults.FadeAnimation={curve:"ease-in-out",time:.2},Framer.Defaults.SlideAnimation={curve:"ease-in-out",time:.2},Framer.Shortcuts.everyLayer=function(e){var t,r,i;i=[];for(t in window.Layers)r=window.Layers[t],i.push(e(r));return i},Framer.Shortcuts.initialize=function(e){return null!=e?(window.Layers=e,Framer.Defaults.displayInDevice.containerLayer=Layers.Phone,Framer.Shortcuts.everyLayer(function(e){return window[e.name]=e,Framer.Shortcuts.saveOriginalFrame(e),Framer.Shortcuts.initializeTouchStates(e)})):void 0},Layer.prototype.getChild=function(e){var t,r,i;for(r in this.subLayers)if(i=this.subLayers[r],-1!==i.name.toLowerCase().indexOf(e.toLowerCase()))return i;for(r in this.subLayers)if(i=this.subLayers[r],t=i.getChild(e))return t},Layer.prototype.getChildren=function(e){var t,r,i;r=[];for(t in this.subLayers)i=this.subLayers[t],r=r.concat(i.getChildren(e));return-1!==this.name.toLowerCase().indexOf(e.toLowerCase())&&r.push(this),r},Framer.Shortcuts.withinRange=function(e,t,r){return Math.abs(e-t)>r?!1:!0},Framer.Shortcuts.convertRange=function(e,t,r,i,n,o){var a,s,h;return h=t-e,a=n-i,s=(r-e)*a/h+i,o?s>n?n:i>s?i:s:s},Framer.Shortcuts.saveOriginalFrame=function(e){return e.originalFrame=e.frame},Layer.prototype.hover=function(e,t){return this.on("mouseenter",e),this.on("mouseleave",t)},Layer.prototype.tap=function(e){return this.on(Events.TouchEnd,e)},Layer.prototype.click=function(e){return this.on(Events.Click,e)},Layer.prototype.animateTo=function(e,t,r,i){var n,o,a,s;return a=this,s=o=n=null,console.log(e,t,r,i),"number"==typeof t?(s=t,"string"==typeof r&&(o=r,n=i),"function"==typeof r&&(n=r)):"string"==typeof t?(o=t,"function"==typeof r&&(n=r)):"function"==typeof t&&(n=t),null!=s&&null==o&&(o="ease-in-out"),null==o&&(o=Framer.Defaults.Animation.curve),null==s&&(s=Framer.Defaults.Animation.time),a.animationTo=new Animation({layer:a,properties:e,curve:o,time:s}),console.log(a.animationTo),a.animationTo.on("start",function(){return a.isAnimating=!0}),a.animationTo.on("end",function(){return a.isAnimating=null,null!=n?n():void 0}),a.animationTo.start()},_.defer(function(){var e;return e=Framer.Defaults.displayInDevice.containerLayer,null!=e?(e.x=0,e.y=0,e.width=Framer.Defaults.displayInDevice.canvasWidth,e.height=Framer.Defaults.displayInDevice.canvasHeight,e.clip=!0):void 0}),Framer.Shortcuts.slideAnimations={slideFromLeft:{property:"x",factor:"width",from:-1,to:0},slideToLeft:{property:"x",factor:"width",to:-1},slideFromRight:{property:"x",factor:"width",from:1,to:0},slideToRight:{property:"x",factor:"width",to:1},slideFromTop:{property:"y",factor:"height",from:-1,to:0},slideToTop:{property:"y",factor:"height",to:-1},slideFromBottom:{property:"y",factor:"height",from:1,to:0},slideToBottom:{property:"y",factor:"height",to:1}},_.each(Framer.Shortcuts.slideAnimations,function(e,t){return Layer.prototype[t]=function(){var t,r,i,n;return(i=Framer.Defaults.displayInDevice.containerLayer)?(n=e.property,r=i[e.factor],null!=e.from&&(this[n]=e.from*r),t={},t[n]=e.to*r,this.animate({properties:t,time:Framer.Defaults.SlideAnimation.time,curve:Framer.Defaults.SlideAnimation.curve})):void console.log("Please wrap your project in a layer named Phone, or set Framer.Defaults.displayInDevice.containerLayer to whatever your wrapper layer is.")}}),Layer.prototype.constrainDragX=function(){return this.on(Events.DragMove,function(e){return window.requestAnimationFrame(function(e){return function(){return e.x=e.originalFrame.x}}(this))})},Layer.prototype.constrainDragY=function(){return this.on(Events.DragMove,function(e){return window.requestAnimationFrame(function(e){return function(){return e.y=e.originalFrame.y}}(this))})},Layer.prototype.show=function(){return this.opacity=1,this},Layer.prototype.hide=function(){return this.opacity=0,this.style.pointerEvents="none",this},Layer.prototype.fadeIn=function(e){return null==e&&(e=Framer.Defaults.FadeAnimation.time),1!==this.opacity?(this.visible||(this.opacity=0,this.visible=!0),this.animateTo({opacity:1},e,Framer.Defaults.FadeAnimation.curve)):void 0},Layer.prototype.fadeOut=function(e){var t;return null==e&&(e=Framer.Defaults.FadeAnimation.time),0!==this.opacity?(t=this,this.animateTo({opacity:0},e,Framer.Defaults.FadeAnimation.curve,function(){return t.style.pointerEvents="none"})):void 0},_.each(["show","hide","fadeIn","fadeOut"],function(e){return Object.defineProperty(Array.prototype,e,{enumerable:!1,value:function(t){return _.each(this,function(r){return r instanceof Layer?Layer.prototype[e].call(r,t):void 0}),this}})}),Event.prototype.touchX=function(){return Events.touchEvent(this).pageX},Event.prototype.touchY=function(){return Events.touchEvent(this).pageY},Framer.Shortcuts.initializeTouchStates=function(e){var t,r,i,n;return r=e.getChild("default"),e.name.toLowerCase().indexOf("touchable")&&r&&(Framer.Utils.isMobile()||(n=e.getChild("hover")),i=e.getChild("down"),null!=n&&n.hide(),null!=i&&i.hide(),(n||i)&&(t=new Layer({background:"transparent",frame:r.frame}),t.superLayer=e,t.bringToFront()),n&&e.hover(function(){return r.hide(),n.show()},function(){return r.show(),n.hide()}),i)?(e.on(Events.TouchStart,function(){return r.hide(),null!=n&&n.hide(),i.show()}),e.on(Events.TouchEnd,function(){return i.hide(),n?n.show():r.show()})):void 0},e=function(){function e(){}return e.prototype.build=function(e){return _.extend(this,e),this.enabled&&this.containerLayer&&!Framer.Utils.isMobile()?(this.enableCursor(),this.backgroundLayer=new Layer({x:0,y:0,width:window.innerWidth,height:window.innerHeight,image:this.backgroundImage,backgroundColor:"white"}),this.backgroundLayer.name="BackgroundLayer",this.backgroundLayer.style,this.handLayer=new Layer({midX:window.innerWidth/2,midY:window.innerHeight/2,width:this.handWidth,height:this.handHeight,image:this.handImage,backgroundColor:"transparent"}),this.handLayer.name="HandLayer",this.handLayer.superLayer=this.backgroundLayer,this.deviceLayer=new Layer({midX:window.innerWidth/2,midY:window.innerHeight/2,width:this.deviceWidth,height:this.deviceHeight,image:this.deviceImage}),this.deviceLayer.name="DeviceLayer",window.addEventListener("resize",function(e){return function(){return e.resize()}}(this)),window.addEventListener("keydown",function(e){return function(t){return 32===t.keyCode?(e.enabled=!e.enabled,e.refresh()):void 0}}(this)),this.refresh(),this.resize()):void 0},e.prototype.enableCursor=function(){return document.body.style.cursor="url("+Framer.Defaults.displayInDevice.bobbleImage+") 32 32, default"},e.prototype.refresh=function(){return this.enabled?(this.containerLayer.superLayer=this.deviceLayer,this.containerLayer.midX=this.deviceLayer.width/2,this.containerLayer.midY=this.deviceLayer.height/2,this.backgroundLayer.show(),this.deviceLayer.show()):(this.containerLayer.superLayer=null,this.containerLayer.x=0,this.containerLayer.y=0,this.backgroundLayer.hide(),this.deviceLayer.hide())},e.prototype.resize=function(){var e;return this.backgroundLayer.width=window.innerWidth,this.backgroundLayer.height=window.innerHeight,this.deviceLayer.midX=this.handLayer.midX=window.innerWidth/2,this.resizeToFit&&(e=window.innerHeight/this.deviceLayer.height*.95,this.deviceLayer.scale=this.handLayer.scale=e),this.resizeToFit||window.innerHeight>this.deviceLayer.height?this.deviceLayer.midY=this.handLayer.midY=window.innerHeight/2:(this.deviceLayer.y=this.handLayer.y=0,this.backgroundLayer.height=this.deviceLayer.height)},e}(),Framer.Device=new e,_.defer(function(){return Framer.Device.build(Framer.Defaults.displayInDevice)})}).call(this);
//# sourceMappingURL=./shortcuts-for-framer.map