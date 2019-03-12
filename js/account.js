$(document).ready(function(){


// click function
(function(){

  // friends statistics tabs
  $('.friends-statistics__tabs .tabs-item').on('click',function(){
    var thisEL = $(this),
        thisAttr = thisEL.attr('data-target');

    $('.friends-statistics__block , .tabs-item').removeClass('active');
    thisEL.addClass('active');
    $('.friends-statistics__block[data-target='+thisAttr+']').addClass('active');
  });

  $('.page-table--dropdown .page-table__row ').on('click', function() {
    $(this).parents('.page-table--dropdown').find('.page-table__row').not(this).removeClass('active');
    $(this).toggleClass('active');
  });

}());//

$('.template-element__slider').slick({
  dots: false,
  arrows:true,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite:false,
  prevArrow: '<button class="slick-prev slick-arrow" type="button" style=""><i class="fas fa-angle-left"></i></button>',
  nextArrow: '<button class="slick-next slick-arrow" type="button" style=""><i class="fas fa-angle-left"></i></button>',
});


$('.search-list').on('scroll',function(){
  var thisEl = this;
  var activeElPosition = $(thisEl).parents('.search-result__list').find('.search-list__item.active').position().left;

  $(thisEl).parents('.search-result__list').find('.search-list-background').css({
    'left': activeElPosition+'px',
  });
});

$('.dropdown-tab__item').on('click', function() {
  var button = $(this);

  $('.search-list__item').not($(this).parents()).removeClass('disabled');
  $('.dropdown-tab').not($(this).parents()).removeClass('active');
  button.parents('').toggleClass('active');
  button.parents('.search-list__item').toggleClass('disabled');
  button.parents('.dropdown-tab').find('.dropdown-tab__item').not(this).removeClass('active');
  button.addClass('active')
});

$('.js-search-button').on('click',function(){
  var thisAttr = $(this).attr('data-target');

  if($(this).parents().hasClass('social-template') && !$(this).parents('.search-list__item').hasClass('active')) {
    var templateEl = $('.template-element');

    templateEl.removeClass('active');
    $('.template-element[data-target='+thisAttr+']').addClass('active');
    templateEl.find('.template-element__slider').slick('refresh');

  }else if( $(this).parents().hasClass('personal-page__tabs') && !$(this).parents('.search-list__item').hasClass('disabled') ) {
    var pageContent = $('.page-content');

    $('.search-list__item').removeClass('disabled');
    $('.dropdown-tab').removeClass('active');
    pageContent.removeClass('active');
    $('.page-content[data-target='+thisAttr+']').addClass('active');
    if( pageContent.first().hasClass('active') ) {
        $('.template-element').find('.template-element__slider').slick('refresh');
    };
  };
});

$('.search-list__arrow').on('click',function(){
  var parentsWidth = $(this).parents('.search-result__list').width();

  if($(this).hasClass('search-list__right')) {
    $(this).parents('.search-result__list').find('.search-list').animate({scrollLeft: parentsWidth},300);
  };
  if($(this).hasClass('search-list__left') ) {
    $(this).parents('.search-result__list').find('.search-list').animate({scrollLeft: - parentsWidth},300);
  };
});

(function(){
  var template = '<div class="history-block">'
                  +'<label class="profile-setings__label" for="">'
                  +'<input type="search" name="modal-name">'
                  +'<span class="copy-button"><i class="fas fa-search"></i></span>'
                  +'</label>'
                +'</div>',
      searchClass = ($('.page-table').hasClass('page-table--search'))? template : false;
  $('.page-table').DataTable( {
    "select": false,
    "bPaginate": false,
    "bInfo" : false,
    "columnDefs": [{
      targets: 'no-sort',
      orderable: false ,
    }],
    "oLanguage": {
      sSearch: searchClass,
      "sZeroRecords": "По вашему запросу ничего не найдено",
    },
  });
  $('.history-block input').attr("placeholder", "Введите название магазина");

}());
$('.sortable-list li').on('click', function() {
  var sort =  ($(this).attr('data-sort') !== undefined)? $(this).attr('data-sort') : $(this).attr('data-status'),
      attribute = ($(this).attr('data-sort') !== undefined)? '[data-sort="' + sort + '"]' : '[data-status="' + sort + '"]',
      notThisList = $(this).parents('.page-table').find('.sortable-list').not($(this).parents()),
      notThisText = notThisList.find('li:first').html();

      notThisList.find('li.selected').removeClass('selected').end().find('li:first').addClass('selected').end().find('.selected-el span').html(notThisText);
  if (sort !== 'null') {
    $(this).parents('.page-table').find('.page-table__row').show();
    $(this).parents('.page-table').find('.page-table__row:not(' + attribute + ')').hide();
  }else{
    $(this).parents('.page-table').find('.page-table__row').show();
  };
});


$(function() {
  var settingsObj = {
    defaultDate: "+1w",
    changeMonth: false,
    numberOfMonths: 1,
    stepMonths: 1,
    firstDay: 1,
    monthNames : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    dayNamesMin : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
    prevText: '<i class="fas fa-angle-left"></i>',
    nextText: '<i class="fas fa-angle-right"></i>',
    dateFormat: "dd.mm.yy",
  },
  from = $(".date-picker__from")
    .datepicker(settingsObj)
    .on("change", function() {
      to.datepicker( "option", "minDate", getDate( this ) );
    }),
  to = $(".date-picker__to").datepicker(settingsObj)
    .on("change", function() {
      from.datepicker( "option", "maxDate", getDate( this ) );
      console.log(getDate( this ))
    });

  function getDate( element ) {
    var date;
    try {
      date = $.datepicker.parseDate( "dd.mm.yy", element.value );
    } catch( error ) {
      date = null;
    }
    return date;
  }

});

(function (){
  var chevron = $('.js-chevron.active'),
      parentsWidth = $('.current-status').width(),
      chevronValue = +chevron.find('.chevron-num').text(),
      curentValue = +$('.js-current-num').text(),
      summary = chevronValue - curentValue,
      position = chevron.position().left - ( chevron.width() / 2 ),
      percent = ((position * 100 )/parentsWidth + (summary * 100) /chevronValue);

      console.log( (curentValue * 100) / chevronValue );

  if(Math.sign(summary) === -1) {
    $('.js-left-num').parents('.absolute-block').addClass('negative')
  }
  $('.current-status__line').css({
    'width': (percent)+'%',
  });

  
  $('.js-left-num').text(summary);

}());

});//document ready