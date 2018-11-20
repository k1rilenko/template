$(document).ready(function(){
$(function() {
  $('.mobile-icon').click(function() {
    $(this).siblings('.menu__list').toggle();
    $(this).toggleClass('mobile-icon_open');
    $('.top-menu__list').toggle();
  });
});
  
  $('.slider').slick({
    infinite: true,
    dots: true,
    prevArrow: '<div class="arrow-circle arrow-circle-prev"></div>',
    nextArrow: '<div class="arrow-circle arrow-circle-next"></div>'
  });
  $('.popular__slider').slick({
  infinite: true,
  autoplay: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: '<div class="arrow arrow-prev"></div>',
  nextArrow: '<div class="arrow arrow-next"></div>',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: true,
        slidesToShow: 3
      }
    },
    {
      breakpoint: 740,
      settings: {
        arrows: true,
        slidesToShow: 2
      }
    },
     {
      breakpoint: 680,
      settings: {
        arrows: true,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '130px',
      }
    },
    {
      breakpoint: 600,
      settings: {
        arrows: true,
        centerMode: true,
        slidesToShow: 1
      }
    }
  ]
});
  $('.sale__slider').slick({
  infinite: true,
  slidesToShow: 4,
  autoplay: true,
  slidesToScroll: 4,
  prevArrow: '<div class="arrow arrow-prev"></div>',
  nextArrow: '<div class="arrow arrow-next"></div>',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: true,
        slidesToShow: 3
      }
    },
    {
      breakpoint: 740,
      settings: {
        arrows: true,
        slidesToShow: 2
      }
    },
     {
      breakpoint: 680,
      settings: {
        arrows: true,
        slidesToShow: 1,
        centerMode: true,
        centerPadding: '130px',
      }
    },
    {
      breakpoint: 600,
      settings: {
        arrows: true,
        centerMode: true,
        slidesToShow: 1
      }
    }
  ]
});
  $('.manufacturers__slider').slick({
  infinite: true,
  autoplay: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  prevArrow: '<div class="arrow arrow-prev"></div>',
  nextArrow: '<div class="arrow arrow-next"></div>'  
});
   $('.product__image_big').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  asNavFor: '.product__slider'
});
$('.product__slider').slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  asNavFor: '.product__image_big',
  dots: false,
  arrows: false,
  centerMode: false,
  focusOnSelect: true
});  
});
