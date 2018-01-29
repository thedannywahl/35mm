(function($){
  $.fn.colorGetter=function(opts){
    'use strict';

    var colors={meta:{opts:opts,warn:{},error:{}},colors:{}};
    var opts=opts||{};
    opts.count=opts.count||1,
    opts.speed=opts.speed||128,
    opts.color=opts.color||"rgb",
    opts.exclude=opts.exclude||[];
    var img = this;

    if(!this.has("img")){
      colors.meta.error.noimg="No image in selector descendants.";
      console.error(colors.meta.error.noimg);
      return colors;
    }

    //--- begin RGBaster

    function getContext(width, height){
      var canvas = document.createElement("canvas");
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      return canvas.getContext('2d');
    };

    function getImageData(img, loaded){
      var imgObj = new Image();
      var imgSrc = img.src || img;

      // Can't set cross origin to be anonymous for data url's
      // https://github.com/mrdoob/three.js/issues/1305
      if ( imgSrc.substring(0,5) !== 'data:' )
        imgObj.crossOrigin = "Anonymous";

      imgObj.onload = function(){
        var context = getContext(imgObj.width, imgObj.height);
        context.drawImage(imgObj, 0, 0);

        var imageData = context.getImageData(0, 0, imgObj.width, imgObj.height);
        loaded && loaded(imageData.data);
      };

      imgObj.src = imgSrc;

    };

    function mapPalette(palette){
      var arr = [];
      for (var prop in palette) { arr.push( frmtPobj(prop, palette[prop]) ) };
      arr.sort(function(a, b) { return (b.count - a.count) });
      return arr;
    };

    function fitPalette(arr, fitSize) {
      if (arr.length > fitSize ) {
        return arr.slice(0,fitSize);
      } else {
        for (var i = arr.length-1 ; i < fitSize-1; i++) {
          arr.push( frmtPobj('0,0,0', 0) )
        };
        return arr;
      }
    };

    function frmtPobj(a,b){
      return {name: makeRGB(a), count: b};
    }

    getImageData(img, function(data){

              var colorCounts   = {},
                  rgbString     = '',
                  rgb           = [],
                  colors        = {
                    dominant: { name: '', count: 0 },
                    palette:  []
                  };

              var i = 0;
              for (; i < data.length; i += 4) {
                rgb[0] = data[i];
                rgb[1] = data[i+1];
                rgb[2] = data[i+2];
                rgbString = rgb.join(",");

                // skip undefined data and transparent pixels
                if (rgb.indexOf(undefined) !== -1  || data[i + 3] === 0) {
                  continue;
                }

                // Ignore those colors in the exclude list.
                if ( exclude.indexOf( makeRGB(rgbString) ) === -1 ) {
                  if ( rgbString in colorCounts ) {
                    colorCounts[rgbString] = colorCounts[rgbString] + 1;
                  }
                  else{
                    colorCounts[rgbString] = 1;
                  }
                }

              }

              if ( opts.success ) {
                var palette = fitPalette( mapPalette(colorCounts), paletteSize+1 );
                opts.success({
                  dominant: palette[0].name,
                  secondary: palette[1].name,
                  palette:  palette.map(function(c){ return c.name; }).slice(1)
                });
              }
    });
    // -- end RGBaster
    function toColor(o) {
      var c = o;
      switch(opts.color) {
        case "rgb":c=toRGB(o);case "hex":c=toHEX(o);case "hsl":c=toHSL(o);
        case "rgba":c=toRGB(o,true);case "hexa":c=toHEX(o,true);case "hsla":c=toHSL(o, true);
        default:
          if($.inArray(opts.color,["rgb","rgba","hex","hexa","hsl","hsla"]) == -1) {
            colors.meta.warn.badcolor="bad color option (" + opts.color + "), requires: rgb(a), hex(a), or hsl(a).";
            console.warn(colors.meta.warn.badcolor);
          }
          c=toRGB(o);
      }
      return c;
    }
    function toRGB(o, a) {
      return c;
    }
    function toHEX(o, a) {
      return c;
    }
    function toHSL(o, a) {
      return c;
    }

    function getColor(img, q) {
      console.log("getColor of: ", img);
      console.log("getColor count: ", q);
    }

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

    for(var i=0;i<opts.count;i++) {
      var c=getColor(img.attr("src"), i);
      c=toColor(c);
      colors.colors[i]=c;
      if(i==0) {
        colors.colors.primary=c;
      } else if (i==1) {
        colors.colors.secondary=c;
      }
    }

    return colors;
   };
})(jQuery);
