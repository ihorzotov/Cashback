$(document).ready(function(){
    document.addEventListener("touchstart", function(){}, true);

$(function(){
  $('.modal-search.active').scroll(function(){
    var winTop = $('.modal-search.active').scrollTop();

        if( winTop >= 1 ){
            $(".modal-form").addClass("fixed modal-form--min");
        }else{
            $(".modal-form").removeClass("fixed modal-form--min");
        }
  });
});


$(document).on('click','.modal-form.fixed',function(){
  $(this).removeClass('modal-form--min');
  $(this).find('.modal-form__input').focus();
});

$('.main-front__slider').slick({
    dots: true,
    arrows:false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite:false,
});


$('.review-block__slider').slick({
    dots: true,
    arrows:true,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendArrows:$('.review-block__arrows'),
    appendDots:$('.review-block__arrows'),
    prevArrow: '<button class="slick-prev slick-arrow" type="button" style=""><i class="fas fa-angle-left"></i></button>',
    nextArrow: '<button class="slick-next slick-arrow" type="button" style=""><i class="fas fa-angle-right"></i></button>',
});

$('.authentication .btn-arrow').click(function(){
  $('.authentication').toggleClass('active-login');
});

$('.pagename-questions .spoiler').click(function(){
  $(this).toggleClass('active');
})

  $('.wrap-drop').each(function(key,item){
    var selectedText = $(item).find('.selected').html();
      
      $(item).not('.connector-dropdown,.polishing-dropdown').find('.selected-el span').html(selectedText);

      $(item).on('click', function(){
        $('.wrap-drop').not(this).removeClass('active');
        $(this).toggleClass('active');
      });

      $(item).on('click','.drop>li',function(){
        var thisText = $(this).html();
        $(this).addClass('selected').siblings().removeClass('selected');
        $(this).parents('.wrap-drop').find('.selected-el span').html(thisText);
      });
  });
  $(document).on('click', function(event){
  var if_thisbutton = $(event.target).hasClass('wrap-drop.active')? true: $(event.target).parents('.wrap-drop.active').length > 0? true: false;
      
      if( !if_thisbutton ){
          $('.wrap-drop').removeClass('active');
      }
});


$(document).on('click','.search-list__item',function(){
  var activeListPosition = $(this).position().left;

      $(this).addClass('active');
      $(this).parents('.search-list').find('.search-list__item').not(this).removeClass('active');
      $(this).parents('.search-result__list').find('.search-list-background').css({'left':activeListPosition+"px"});
      listShadowBlock();

      if( $(this).parents().hasClass('header-search__tabs') ) {
          var thisAttr = $(this).attr('data-target');

              $('.search-tab').removeClass('active');
              $('.search-tab[data-target='+thisAttr+']').addClass('active');

      }else if( $(this).parents().hasClass('social-template')) {
                $(this).parents('.social-template').find('.search-list__item .search-list__bg').css({
                  'border-radius' : '0px ',
                });
                $(this).prev().find('.search-list__bg').css({
                  'border-radius' : '0 24px 24px 0 ',
                });
      }
      if( $(this).parents().hasClass('modal-search') ){
          var listItem = $('.search-list__item'),
              listBG = $('.search-list-background'),
              radiusEl = $('.js-content__radius');
              
              if( $('.modal-search.active').find(listItem).first().hasClass('active') ){
                $('.modal-search.active').find(radiusEl).css({'border-radius':'0 25px 25px 25px','transition-delay':".3s"});
              }else{
                  $('.modal-search.active').find(radiusEl).css({'border-radius':'25px','transition-delay':"0s"});
              }
              if($('.modal-search.active').find(listItem).last().hasClass('active') ){
                  $('.modal-search.active').find(radiusEl).css({'border-radius':'25px 0px 25px 25px' ,'transition-delay':".3s"});
              }
      }
});


$('.form-button').click(function(){
  $(this).parents('.questions-form').toggleClass('active');
});

// modal input
  $('.modal-form__input').on('keyup',function(){
    if($(this).val().length > 0) {
        $('.input-clear').addClass('active');
    } else {
        $('.input-clear').removeClass('active');
    }
  });

  $('.input-clear').click(function(){
    $('.modal-form__input').val('');
    $(this).removeClass('active');
  });

function listShadowBlock(){
  var listItem = $('.search-list__item'),
      listBG = $('.search-list-background'),
      radiusEl = $('.js-content__radius');

      $('.search-result__list').each(function(k,i){
        if( $(i).find(listItem).first().hasClass('active') ){
            $(i).find(listBG).addClass('acr-left');
            $('.modal-search.active').find(radiusEl).css({'border-radius':'0 25px 25px 25px','transition-delay':".3s"});
        }else{
            $(i).find(listBG).removeClass('acr-left');
            $('.modal-search.active').find(radiusEl).css({'border-radius':'25px','transition-delay':"0s"});
        }
        if( $(i).find(listItem).last().hasClass('active') ){
            $(i).find(listBG).addClass('acr-right');
            $('.modal-search.active').find(radiusEl).css({'border-radius':'25px 0px 25px 25px' ,'transition-delay':".3s"});
        }else{
            $(i).find(listBG).removeClass('acr-right');
        };
      });
}
listShadowBlock();

$('.search-list__item[data-quantity = "0"]').click(function(){
  return false;
});

// // tabs
// $(".search-tab").not(":first").addClass('hidden');


// $(".search-list__item").click(function() {
//     $(".search-list__item").removeClass("active").eq($(this).index()).addClass("active");
//     $(".search-tab").addClass('hidden').removeClass('active').eq($(this).index()).removeClass('hidden').addClass('active');
// });
// // 

$('.coupon-amount .text').each(function(key,item){
  var couponTextWidth = $(item).width();
  var couponParentWidth = $(item).parents('.coupon-amount').width();
      if( couponTextWidth > couponParentWidth ){
          $(item).parents('.coupon-amount').addClass('overflow');
      };
});

// examle --------- MUST TO REMOVE ON PRODUCTION
$('.show-more').click(function(){
  $(".loading").addClass('active');
  setTimeout (function(){
    $(".loading").removeClass('active');
  }, 1000);
  var clone = $('.search-tab.active').find('.search-card__item').clone();
  var stepList = 150;
  $(clone).removeClass('active').each(function(key,item){
    $(item).appendTo($('.search-tab.active .search-card__content'));
    setTimeout (function(){
      $(item).addClass('active');
    },stepList*key);
  });
});
// 

(function(){
  var lastPagination = $(document).find('.pagination__item').last();

      $('.ajax-show__more').click(function(){
        $('.pagination__item.active').removeClass('active').next('.pagination__item').addClass('active');
        if(lastPagination.hasClass('active')){
          $('.ajax-show__more').click(function(){
            lastPagination.addClass('active');
          });
        }
      });
}());

$('.aside-list__item').click(function(){
  $(this).toggleClass('active');
})

$('.news-form__input').focus(function(){
  var inputLenght = $(this).val().length;

      if( inputLenght !== 0 ) {
          $(this).parents('.form-wrapper').addClass('active');
      }
})

$('.news-form__input').on('keyup',function(){
  var inputLenght = $(this).val().length;

      $(this).parents('.form-wrapper').addClass('active');
      if( inputLenght == 0 ){
          $(this).parents('.form-wrapper').removeClass('active');
      };
      $(this).blur(function () {
        $('.form-wrapper').removeClass('active');
      });
});

function hashtagLenght(){
  var lengthCounter = $('.selected-hashtag .selected-hashtag__item').length;

      if( lengthCounter == 0 ){
          $('.selected-hashtag').addClass('hidden');
      }else{
          $('.selected-hashtag').removeClass('hidden');
      }

}
hashtagLenght();

$('.hashtag-btn').click(function(){
  var hashtagBlock = $('.selected-hashtag')
  var hashtag = $(this).parent('.hashtag').find('.title').text();
  var hashtagHtml = '<li class="selected-hashtag__item">\
                    <span class="text">'+hashtag+'</span>\
                    <span class="remove">&times;</span>\
                  </li>';
      hashtagBlock.append(hashtagHtml);
      hashtagLenght();
});

$(document).on('click','.selected-hashtag__item', function(){
  $(this).remove();
  hashtagLenght();
});

$('.modal-review.active .drop>li').click(function(){
  var selectedText = $(this).text();

      if( this.hasAttribute('data-value') ){
          $('.modal-review.active #hidden-input').val(selectedText);
      }else{
          $('.modal-review.active #hidden-input').val('');
      }
});


$('.header-content__authorized').click(function () {
  $(this).toggleClass('active');
});


function counter() {
  var counter = 60;
  var counterHtml = $('.counter__num-js');
  var interval = setInterval(function(){
                    if( counter != 0 ){
                        counter--
                        counterHtml.html(counter);
                    }else{
                        clearInterval(interval);
                        counter = 60;
                        counterHtml.html(counter);
                        $('.counter-js').hide();
                        $('.repeat-button').show();
                    }
                  } , 1000);

      if( $('.phone-change__js').hasClass('change') ) {
          clearInterval(interval);
          counter = 60;
          counterHtml.html(counter);
      };
}

$('.phone-change__js').click(function () {
  $(this).parents('.phone-change').addClass('active');
  counter();
});

$('.repeat-button').click(function () {
  $(this).hide();
  $('.counter-js').show();
  counter();
});

$('.phone-change__accept').click(function () {
  $(this).parents('.phone-change').removeClass('active');
  $('.phone-change__js').addClass('change');
});

$(document).on('click','.data-js-button.fake-class',function(){
  $(this).removeClass('fake-class');
  $(this).parents('.data-block').addClass('active').find('.read-only__remove').removeAttr('readonly').focus();
});
$(document).on('click','.data-js-button:not(.fake-class)',function(){
  var comparisonPass = $('.password-change .new-pass').val();
  var rightVal = $('.password-change .repeat-pass').val();
      $(this).parents('.data-block').removeClass('active').find('.read-only__remove').attr('readonly', true).end().find('.data-js-button:not(.fake-class)').addClass('fake-class');
  
      if( rightVal == "" || comparisonPass == "" || rightVal != comparisonPass ) {
          $('.password-change .repeat-pass,.password-change .new-pass').addClass('error');
          $(this).parents('.data-block').addClass('active').find('.read-only__remove').removeAttr('readonly').end().find('.data-js-button.fake-class').removeClass('fake-class');
      }
});

$('.cancel-js').click(function(){
  $(this).parents('.data-block').removeClass('active').find('.read-only__remove').attr('readonly', true).end().find('.data-js-button:not(.fake-class)').addClass('fake-class');
  $('.password-change .new-pass ,.password-change .repeat-pass').val('');
});

$('.password-change .repeat-pass').on('change',function(){
  var comparisonPass = $('.password-change .new-pass').val();
  var thisVal = $(this).val();
      if( thisVal != comparisonPass ) {
          $('.password-change .repeat-pass,.password-change .new-pass').addClass('error');
      }
      else{
          $('.password-change .repeat-pass,.password-change .new-pass').removeClass('error');
      }
});

$('.show-pass').click(function(){
  $(this).parents('.profile-setings__label').toggleClass('pass');
  if( $(this).parents('.profile-setings__label').hasClass('pass') ) {
      $('.password-change').find('input[type="password"]').prop("type", "text");
      $(this).find('i.show').hide();
      $(this).find('i.hide').show();
  }
  else{
      $(this).find('i.hide').hide();
      $(this).find('i.show').show();
      $('.password-change').find('input[type="text"]').prop("type", "password");
  }
});

$('.finance-card__add').click(function(){
  $('.cards-block').addClass('active');
  $('.cards-block__item.active').click();
  $('.card-settings').removeClass('active');
});

$('.cards-block__item').click(function(){
  var thisAttr = $(this).attr('data-mode'),
      obj = JSON.parse(thisAttr),
      htmlEl="",
      isBodyClass = ($(this).parents('body').hasClass('pagename-infer'))? 'js-withdrawal-value':'';
      
      $(this).addClass('active').siblings('.cards-block__item').removeClass('active');

      $.each(obj.fields, function(key,item){
        var appendEl ='<label class="profile-setings__label" data-key="'+key+'" for="">\
                            <p class="title">'+item.title+'</p>\
                            <input type="text" class="js-cycle-val '+isBodyClass+'" data-name="'+item.name+'" >\
                            <p class="text">'+item.hint+'</p>\
                          </label>';
            htmlEl += appendEl;
      });

      if( obj.menu !== 'null') {
          var appendEl = $('<label></label>').html('<label class="profile-setings__label"><p class="title">'+obj.menu.title+'</p><div class="wrap-drop"><div class="selected-el"><span>'+obj.menu.selected+'</span></div></div></label>'),
              ulEl = $('<ul></ul>').addClass('drop').html('<li class="selected"><a>'+obj.menu.selected+'</a></li>');

              $(appendEl).find('.wrap-drop').append($(ulEl));

              $.each(obj.menu.list, function(key, item){
                $(appendEl).find('.drop').append('<li><a>'+item+'</a></li>');
              });

              htmlEl += $(appendEl).html();
      };

      $('.cards-block__content').html(htmlEl);
});

$('.cards-block__add').click(function(){
  var activeListAttr = $(document).find('.cards-block__item.active').attr('data-mode'),
      obj = JSON.parse(activeListAttr),
      cardText = $(document).find('.cards-block__content .wrap-drop .selected-el').text(),
      unparseJson = JSON.stringify(obj.fields),
      appendItem = $('<div></div>').addClass('finance-card').attr('data-mode', unparseJson),
      isEmptyInput = false,
      nameArray = [];

      $('.js-cycle-val').each(function(k,i){
        var itemAttr = $(i).attr('data-name'),
            thisVal = $(i).val();
            
            nameArray.push({[itemAttr]: thisVal});
      });

      appendItem.html('<div class="finance-card__info"><div class="finance-card__img"><img src="'+obj.img+'" alt=""></div><span class="text js-field-text" data-name="'+Object.keys(nameArray[0])+'">'+Object.values(nameArray[0])+'</span></div><span class="text js-text"><span class="num  js-field-text" data-name="'+Object.keys(nameArray[1])+'">'+Object.values(nameArray[1])+'</span></span><input class="personName js-field-text" data-name="'+Object.keys(nameArray[2])+'" type="hidden" value="'+Object.values(nameArray[2])+'">');
      if( cardText !="" ) {
          appendItem.find('span.js-text').prepend('<span class="currency">'+cardText+'</span>');
      }

      $('.cards-block__content input').each(function(){
        if( $(this).val().length == 0 ){
            isEmptyInput = true;
            $(this).addClass('error');
        }else{
            $(this).removeClass('error');
        };
      });

    if( isEmptyInput == false ){
        $('.cards-block').removeClass('active');
        $('.cards-block__content input').each(function(){
          $(this).val('');
        });

        $('.finance-block').prepend(appendItem);
    };
    
});

$('.cards-block__cansel').click(function(){
  $('.cards-block').removeClass('active');
  $('.cards-block__content input').each(function(){
      $(this).val('');
  });
});

$(document).on('click', '.finance-card:not(.finance-card__add)' ,function(){
   var thisAttr = $(this).attr('data-mode'),
       obj = JSON.parse(thisAttr),
       htmlEl = '',
       disabledInput = ($(this).hasClass('disabled-change'))? 'disabled': '',
       isBodyClass = ($(this).parents('body').hasClass('pagename-infer'))? 'js-withdrawal-value':'';
       $('.cards-block').removeClass('active');
       $('.finance-card').removeClass('active');
       $(this).addClass('active');
 
       $.each(obj,function(key,item){

          var appendEl ='<label class="profile-setings__label" data-key="'+key+'" for="">\
                              <p class="title">'+item.title+'</p>\
                              <input type="text" data-name="'+item.name+'" class="'+isBodyClass+'" '+disabledInput+' value="" >\
                              <p class="text">'+item.hint+'</p>\
                            </label>';
          htmlEl += appendEl;
        });

       $('.card-settings').addClass('active').find('.card-settings__js').html(htmlEl);

            eachNameValue();
        });

$('.card-settings__cancel').click(function(){
  $('.finance-card').removeClass('active');
  $('.card-settings').removeClass('active');
});

function eachNameValue ( ){
  $('.finance-card.active .js-field-text').each( function(key,item){
     var thisText = "",
         thisAttr = $(item).attr('data-name');
      if( $(item).hasClass('personName')) {
          thisText = $(item).val();
      }
      else{
          thisText = $(item).text();
      }
      $(document).find('.card-settings input[data-name="'+thisAttr+'"]').val(thisText);
  });
};
$('.card-settings__save').click(function(){

      eachNameValue();

      $('.finance-card').removeClass('active');
      $('.card-settings').removeClass('active');
});

$('.settings-notifications .close').click(function(){
  $(this).parents('.settings-notifications').removeClass('active');
});

$('.account-remove .button-js').click(function(){
   $('.remove-account').addClass('active');
   $('html,body').addClass('no-scroll');
});

$('.modal-block .modal-close ,.modal-cancel').click(function(){
  $(this).parents(".modal-block").removeClass('active');
  $('html,body').removeClass('no-scroll');
});

$('.remove-card').click(function(){
  $('.modal-remove__card').addClass('active');
  $('html,body').addClass('no-scroll');
});

// custom input file with removable items
function readURL(input,fileName) {
  if( input.files && input.files[0] ) {
      var reader = new FileReader();

          reader.readAsDataURL(input.files[0]);

          reader.onload = function(e) {
              var appendInput = '<input type="hidden" name="file[]" data-title="'+fileName+'" value="'+e.target.result+'">';

                  $(input).parents('.file-wrapper').find('.input-dropdown').append(appendInput);
          }
  };
};

$(".js-file-uploader").on("change", function (event) {
  var files = event.originalEvent.target.files,
      sliceAftDot = files[0].name.slice((files[0].name.lastIndexOf(".")+1  >>> 0)),
      fileName = files[0].name.slice(0,files[0].name.lastIndexOf(".")),
      sliceBefDot = (fileName.replace(/[^a-zA-Zа-яА-Я0-9]/g,'') == "")? undefined : fileName.replace(/[^a-zA-Zа-яА-Я0-9]/g,''),
      extensionsObj = {
        png:'pic',
        jpeg:'pic',
        gif: 'pic',
        jpg:'pic',
        svg:'pic',
        tiff:'pic',
        bmp:'pic',
      },
      imgUrl = (extensionsObj[sliceAftDot])? extensionsObj[sliceAftDot]: 'document',
      appendContent ='<div class="selectedFiles__el" title="'+fileName+'.'+sliceAftDot+'">\
                        <img src="../img/'+imgUrl+'-icon.png" alt="">\
                        <div class="files-text">\
                          <p class="files-text__el selectedFiles__name">'+sliceBefDot+'</p>\
                          <p class="files-text__el selectedFiles__ext">'+'.'+sliceAftDot+'</p>\
                        </div>\
                        <span class="selectedFiles__remove">X</span>\
                      </div>';

      if( this.files[0].size < 5000000 && $(this).parents('.file-wrapper').find('input[data-title='+sliceBefDot+']').length == 0 ){
          readURL(this , sliceBefDot);
          $(this).parents('.file-wrapper').find('.selectedFiles').append(appendContent);
      }else{
          alert("Ошибка");
          this.value = "";
      };

      $(this).val('');
});



$(document).on('click','.selectedFiles__remove',function(){
  var fileName = $(this).parents('.selectedFiles__el').find('.selectedFiles__name').text(),
      fileExtensions = $(this).parents('.selectedFiles__el').find('.selectedFiles__ext').text();

      $(this).parents('.file-wrapper').find('input[data-title='+fileName+']').remove();
      $(this).parents('.selectedFiles__el').remove();
});
//

$('.help-history__top').on('click',function(){
  var thisParents = $(this).parents('.help-history'),
      isParentsAttr = +thisParents.attr('data-is_new-message'),
      allMsgeHeight = 0;
      
      $('.help-history').not(thisParents).removeClass('active');
      thisParents.toggleClass('active');

      if( isParentsAttr >= 1 && thisParents.hasClass('active')) {
          var firsNewOffset = thisParents.find('.message-block__new:first'),
              realHeight = thisParents.find('.history-dropdown__content').prop('scrollHeight');
          
                $.each( thisParents.find('.message-block__new'), function(k,i) {
                       var thisEl = $(this).height(),
                           kCount = (k == 0)? 85 : 35;

                       allMsgeHeight += +thisEl + kCount;
                });

                thisParents.find('.history-dropdown__content').scrollTop(realHeight - allMsgeHeight);

                doAnimations = function() {

                    firsNewOffset = thisParents.find('.message-block__new:first');
                
                    $.each( firsNewOffset, function(i) {
                      var thisEl = $(this),
                          parentsHeight = thisEl.parents('.history-dropdown__content').position().top + thisEl.parents('.history-dropdown__content').height();;

                          if( parentsHeight > thisEl.position().top + 190 ) {
                              setTimeout(function(){
                                thisEl.removeClass('message-block__new');
                                
                                var counter = +thisParents.find('.message-block__new').length;

                                    thisParents.find('.help-status').attr('data-new-message',counter)
                                    if (counter == 0) {
                                      thisParents.attr('data-is_new-message',0);
                                    }
                              },400);

                            
                          };
                      });
                  
                };

              $(thisParents.find('.history-dropdown__content')).on('scroll',doAnimations);


              $('body,html').animate({scrollTop: firsNewOffset.offset().top - 160}, 500);
      }else if( isParentsAttr == 0 && thisParents.hasClass('active')){
                var firsNewOffset = thisParents.find('.message-block:last'),
                    realHeight = thisParents.find('.history-dropdown__content').prop('scrollHeight');

                    thisParents.find('.history-dropdown__content').scrollTop(realHeight - firsNewOffset.height());
                    $('body,html').animate({scrollTop: firsNewOffset.offset().top - 30}, 500);
                    
      }
});

$('.finance-tabs__item').on('click', function(){
  var thisAttr = $(this).attr('id');
      $('.finance-tabs__item').removeClass('active');
      $(this).addClass('active');

    $('.finance').removeClass('active');
    $('.finance[data-target="'+thisAttr+'"]').addClass('active');
});

$('.pagename-infer .cards-block__item:first, .pagename-infer .finance-card:first').click();

$('.js-withdrawal').click(function(){
  var element = $('.finance.active .js-withdrawal-value, .form-content__block .js-withdrawal-value'),
      isThisEmpty = false;

      $.each(element , function(key,item){
          var thisAttr = $(item).attr('data-name'),
              thisVal = $(item).val();

              if( thisVal != '' ) {
                  $(item).parents("body").find('.js-modal-value[data-target="'+thisAttr+'"]').html(thisVal);
                  $(item).removeClass('error');
              }else{
                  isThisEmpty = true;
                  $(item).addClass('error');
              }
      });

   if( isThisEmpty != true ) {
       $('.modal-withdrawal').addClass('active');
       $("body , html").addClass('no-scroll');
   };
});


// schedule
(function(){
  var scheduleHeight = $('.schedule').height(),
      scheduleWidth = $('.schedule__container').width(),
      scheduleLength = $('.schedule-element').length,
      basеLevel = 75,
      activeEl = $('.schedule-element.active'),
      activeElAttr = activeEl.attr('data-target'),
      nextElNum = +activeEl.next('.schedule-element').find('.num').text() - +activeEl.find('.num').text(),
      currentStepNum = ((+$('.current-step .num-js').text() - +activeEl.find('.num').text()) * 100) / nextElNum ;

      $('.schedule-element').each(function(k,i){
        var keyPlus = k+1,
            itemAttr = $(i).attr('data-target');
            adaptiveWidth  =  (keyPlus == 1)? basеLevel : (keyPlus == 2)? basеLevel*2 : (scheduleWidth - basеLevel*3) / (scheduleLength-2);
            if (scheduleLength < 4) {
              adaptiveWidth = scheduleWidth/ scheduleLength
            }
            $(i).css({
              'width':adaptiveWidth+'px',
            });

            setTimeout(function(){
              $('.schedule-element__number[data-target='+itemAttr+']').css({
                'left': ($(i).position().left + $(i).width())-25.5 +"px",
                'opacity':'1',
              });
             },500);
          });

          setTimeout(function(){
            var activeElPosition = activeEl.position().left + activeEl.width()+2,
                nextElWidth = (activeEl.next('.schedule-element').width() * currentStepNum)/100 ;
                $('.schedule__container .container-angle__line').css({
                  'width': activeElPosition+'px',
                });

                $('.schedule .current-step').css({
                  'width': activeElPosition+nextElWidth+'px',
                });

                if( (activeElPosition+nextElWidth) > ( scheduleWidth - 80)) {
                    $('.schedule .current-step .text').css({
                      'left': 'auto',
                      'right':'10px',
                    });
                }
                if( $('.schedule-element:last').hasClass('active')) {
                    $('.schedule .current-step').css({
                      'width': activeElPosition+'px',
                    });
                    $('.schedule .current-step .text').css({
                      'left': 'auto',
                      'right':'10px',
                    });
                }
          },500);

      $('.schedule-element__number[data-target='+activeElAttr+']').addClass('active');

}());

//

function movingStar(event,boolean,item,click){
  var elementTarget = +(event.pageX - $(item).offset().left + 0.8).toFixed(0),
      parentsWidth = +$(item).width(),
      percentCalc = +((elementTarget * 100)/ parentsWidth).toFixed(0),
      clipCalc = (parentsWidth - elementTarget);

      $(click).addClass('checked').attr('data-rating',percentCalc);

      if($(item).hasClass('checked') == boolean ) {
          $(item).find('.rating-list__clip').css({
            'clip': 'rect(0px, auto, auto, '+clipCalc+'px)',
          });
      }
};

$('.js-rating-hover').mousemove(function(e){
  var boolean = false;
      $(this).removeClass('fill');
       movingStar(e,boolean,this)
});

$('.js-rating-hover').on('click',function(e){
  var boolean = true;

      $(this).removeClass('checked').css({
        'animation-duration': '0s',
      });
      movingStar(e,boolean,this,this)
});
$('.js-rating-hover').on('mouseleave',function(){
  setPercentage(this)
  $(this).addClass('fill').removeClass('checked');

});

function setPercentage (item){
  var itemAttr = +$(item).attr('data-rating'),
      itemWidth = +$(item).width();
      clipCalc = itemWidth - (itemWidth * itemAttr)/100;

      $(item).find('.rating-list__clip').css({
        'clip': 'rect(0px, auto, auto, '+clipCalc+'px)',
      });
};

$('.js-rating-static').each(function(k,i){
  setPercentage (this);
});

$('.pagename-reviews .aside .modal-btn').click(function(){
  $('.modal-review').addClass('active');
  $('html,body').addClass('no-scroll');
});

// copy to clipboard
$('.js-copy').click(function(){
  var text = $(this).parents('.js-input--link').find('input');

  text.attr('disabled', false).select();
  document.execCommand("copy");
  text.attr('disabled', true);
  window.getSelection().removeAllRanges();

});


});//document ready
