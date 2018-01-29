(function($){
  $.fn.buildGalleryItems = function(){
    this.unwrap().wrap(function(){
      return '<a class="gallery--item" href="'+$(this).attr("src")+'"></a>';
    }).parent().siblings("br").remove();
    return this;
  };
})(jQuery);

(function($){
  $.fn.buildGalleries = function() {
  var imgarr = this,start = -1,oldstart = start,oldstop = stop,stop = -1,index = -1,value = -1,wrapped = {"start":start,"stop":stop};
  imgarr.each(function(index, value){
    if($(this).is("a") && $(this).has("img")&&($(this)[0].childElementCount == 1)) {
      if(!($(this).prev().is("a"))||($(this).prev().has("img")&&!($(this)[0]["previousElementSibling"].childElementCount == 1))) {
        oldstart = start;
        start = index;
        $(this).addClass("gallery--item__first");
        var colors = $(this).colorGetter({count:3,speed:"fast",color:"rgb"});
        console.log(colors);
        //$($image).parents(".gallery").css("background","linear-gradient(0deg, rgba(0,0,0,0), rgba(0,0,0,0), rgba(0,0,0,0))");
      } else if(!($(this).next().is("a"))||($(this).next().has("img")&&!($(this)[0]["nextElementSibling"].childElementCount == 1))) {
        stop = index;
        $(this).addClass("gallery--item__last");
      }
    }
    if((start <= stop)&&(start != -1)&&(stop != -1)&&(start != oldstart)) {
           if( (start != wrapped["start"])
               && (stop != wrapped["stop"])
               ) {
                 var toWrap = $(imgarr).slice(start, stop + 1);
                 $(toWrap).wrapAll('<section class="gallery"></section>');
                 wrapped["start"] = start;
                 wrapped["stop"] = stop;
           }
       }
       var $gallery = $(".gallery");
       if( $($gallery).parent().is("p") ) {
         $(".gallery").unwrap();
       }
       });
     };
     return this;
  })( jQuery );


var $img = $("article img");
$($img).buildGalleryItems();

var $images = $("article a > img:only-child").parent().siblings();
$($images).buildGalleries();

$($img).parent().on('openstart.fluidbox', function() {
  $($img).siblings(".fluidbox__overlay").css("background-image",function(){
  return 'url("' + $(this).siblings("img").attr("src") +'")';
});
})
.fluidbox();
//$(document).keydown(function(e){
//  if(e.which == 27) $(".fluidbox__overlay").trigger("click");
//});
