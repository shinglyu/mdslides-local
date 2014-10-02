$("img").each(function(id){
  //console.log($(window).height())
  var otherHeight = -$(this).parentsUntil('section').height();
  //console.log(otherHeight)
  $(this).parentsUntil('section').parent().children().each(function(id){
    otherHeight += $(this).height(); 
    //console.log($(this).height());
  });

  //console.log(otherHeight)
  //May need to scale up a little
  var remainHeight = $(window).height() - otherHeight;
  //console.log(remainHeight)
  $(this).css("max-height",  remainHeight);
})
