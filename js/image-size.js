function fitImgs(){
$("img").each(function(id){
  //alert($(window).height())
  //console.log('window.height ' + $(window).height())
  //var otherHeight = -$(this).parentsUntil('section').height(); //don't count self's container's size
  var otherHeight = -$(this).height(); //don't count self's container's size
  //console.log(otherHeight)
  //console.log('otherHeight ' + otherHeight)
  var slide = $(this).parentsUntil('section').parent();
  slide.children().each(function(id){
    otherHeight += $(this).height(); 
    //console.log($(this).height());
  });
  //console.log('otherHeight ' + otherHeight)

  //console.log(otherHeight)
  //May need to scale up a little
  var remainHeight = ($(window).height() - slide.offset()['top'] ) - otherHeight;//5: margin
  //console.log('remainHeight ' +remainHeight)
  $(this).css("max-height",  remainHeight * 0.95);
  //$(this).css("min-height",  remainHeight * 0.8);
})
}
window.onresize = fitImgs;
Reveal.addEventListener('slidechanged', function(event){
  // event.previousSlide, event.currentSlide, event.indexh, event.indexv
  fitImgs();
})
/*
Reveal.addEventListener('ready', function(event){
  // event.previousSlide, event.currentSlide, event.indexh, event.indexv
  fitImgs();
})
*/
fitImgs();
