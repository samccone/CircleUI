function circle(_args) {

  var ctx,
      handle,
      holder,
      mouseOver = false,
      args      = _args,
      rad       = args.rad,
      rad2      = args.innerRad;

  function init() {
    createDOMElements();
    drawCircle();
    setListeners();
  }

  function setListeners() {
    holder.mouseenter(function(){mouseOver=true;holder.addClass('over')});
    holder.mouseleave(function(){mouseOver=false;holder.removeClass('over')});
    holder.bind('mousemove',function(e){mouseOver&&onMove(e)});
  }

  function createDOMElements() {
    var toAdd   = $('<div><div class="holder"><canvas height="'+args.rad*2+'px" width="'+args.rad*2+'px"></canvas><div class="handle"></div></div></div>');
    holder      = $('.holder',toAdd);
    ctx         = $('canvas',toAdd)[0].getContext('2d');
    handle      = $('.handle',toAdd);
    holder.css({
      'height':args.rad*2+'px','width':args.rad*2+'px'});
    args.holder ? $(args.holder).append(toAdd) : $('body').append(toAdd);
  }

  function drawCircle() {
    var spacing = args.spacing > 0 ? args.spacing : 1;
    ctx.beginPath();
    ctx.strokeStyle = args.color;
    ctx.moveTo(0,0);
    for(var i=0;i<359;i+=spacing) {
      _cos = Math.cos(i * Math.PI/180);
      _sin = Math.sin(i * Math.PI/180);
      var _x = rad + (rad * _cos);
      var _y = rad + (rad * _sin);
      var _x2 = rad + (rad2 * _cos);
      var _y2 = rad + (rad2 * _sin);
      ctx.moveTo(_x,_y);
      ctx.lineTo(_x2,_y2);
    }
    ctx.stroke();
  }
  
  function onMove(e) {
    var _t = $(e.currentTarget);
    var x = e.pageX - rad - _t.position().left;
    var y = rad - e.pageY- _t.position().top;
    var tan = y/x;
    var angle = Math.atan(tan) * 180 / Math.PI;
    holder.data({'value': (1.25 - angle/360) % 1 * 100});
    if (x < 0) {
      angle = (angle + 180) % 180;
      if (y < 0) {
        angle -= 180;
      } 
    }
    setTransform((-90 - angle) + 'deg');
    handle.css({
      'left': rad + Math.cos(angle * Math.PI / 180) * (rad+rad2)/2 - handle.width()/2,
       'top': rad - Math.sin(angle * Math.PI / 180) * (rad+rad2)/2 - handle.height()/2
    })
  }

  function setTransform(angle) {
    var _rule = "rotate("+angle+")";
    handle.css({
      'transform': _rule,
      '-ms-transform':_rule,
      '-moz-transform':_rule,
      '-webkit-transform':_rule,
      '-o-transform':_rule
    });
  }

  init();
  return {}
}