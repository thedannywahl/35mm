(function($){
  $.fn.colorGetter=function(opts){
    'use strict';

    var colors={meta:{opts:opts,warn:{},error:{}},colors:{}};

    if(!this.has("img")){
      colors.meta.error.noimg="No image in selector descendants.";
      console.error(colors.meta.error.noimg);
      return colors;
    }

    var opts=opts||{};
    opts.count=opts.count||1,
    opts.speed=opts.speed||128,
    opts.color=opts.color||"rgb";

    if(typeof opts.speed=="string") {
      switch(opts.speed){
        default:
          colors.meta.warn["speed"]="invalid speed " + opts.speed + ", using 'fast'";
          console.warn(colors.meta.warn["speed"]);
          opts.speed = 128;
        case "slow":opts.speed=4;case "medium":opts.speed=64;case "fast":opts.speed=128;
      }
    } else if(opts.speed <= 0) {
        colors.meta.warn["nonnat"]="non-natural number (" + opts.speed + "), using 'fast'. (OEISA000027)";
        console.warn(colors.meta.warn["nonnat"]);
        opts.speed = 128;
    }

    var img = this;
    if(!img.is("img")) {
      colors.meta.warn.notimg="Selector is not img, using .find()";
      console.warn(colors.meta.warn["notimg"]);
      img = img.find("img");
      if(img.length > 1) {
        colors.meta.warn.multiple="More than one image in descendants, using .first()";
        console.warn(colors.meta.warn.multiple);
        img = img.first();
      }
    }

    function toColor(o) {
      switch(opts.color) {
        case "rgb":toRGB(o);case "hex":toHEX(o);case "hsl":toHSL(o);
        case "rgba":toRGBA(o,true);case "hexa":toHEXA(o,true);case "hsla":toHSLA(o, true);
        default:
          if($.inArray(opts.color,["rgb","rgba","hex","hexa","hsl","hsla"]) == -1) {
            colors.meta.warn.badcolor="bad color option (" + opts.color + "), requires: rgb(a), hex(a), or hsl(a).";
            console.warn(colors.meta.warn.badcolor);
          }
          toRGB(o);
      }
    }

    function toRGB(o, a) {

    }

    function toHEX(o, a) {

    }

    function toHSL(o, a) {

    }

    return colors;
   };
})(jQuery);
