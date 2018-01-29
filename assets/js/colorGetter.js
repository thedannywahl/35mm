(function (root, factory) {'use strict';
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return (root.colorify = factory());
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.colorify = factory();
  }
})(this, function () {'use strict';
  var colorify = function(args){

    var _IMAGES = args.images,
    _ACCURACY = args.accuracy || 200,
    cf_item = document.querySelectorAll(_IMAGES),
    cf_item_loaded = 0,
    colormatches = [];

    setTimeout(function(){
      for(var i=0; i < cf_item.length; i++) {
        cf_item_loaded++;
        cf_item[i].onload = isLoaded(cf_item[i]);
      }

      function isLoaded(el){
        var rgb = getAverageRGB(el);
        var rgbstring = rgb.r + ", " + rgb.b + ", " + rgb.g;
        rgb = {
          "image": el,
          "color": rgbstring
        };
        colormatches.push(rgb);
    }

    function getAverageRGBFromZone(zone) {
      var rgb = {r:0,g:0,b:0},
      count = 0,
      i = -4;

      while ((i += _ACCURACY * 4) < zone.data.length ) {
        ++count;
        rgb.r += zone.data[i];
        rgb.g += zone.data[i+1];
        rgb.b += zone.data[i+2];
      }
      rgb.r = ~~(rgb.r/count);
      rgb.g = ~~(rgb.g/count);
      rgb.b = ~~(rgb.b/count);

      return rgb;
    }


    return colormatches;
  }
  return colorify;
});
