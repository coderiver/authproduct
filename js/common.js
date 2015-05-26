head.ready(function() {

	// mobile menu
	$('.container, .js-mob-close').on('click', function(){
		$('.out').removeClass('open-menu');
		$('.bg').removeClass('is-hidden');

	});
	$('#hamburger').on('click', function(event){
		$('.out').addClass('open-menu');
		$('.bg').addClass('is-hidden');
		event.stopPropagation();
	});

	//scrollTo
	function scrollTo(page){

		$('html, body').animate({
			scrollTop: $(page).offset().top
		}, 800);

	}

	$('.js-link').click(function (e) {

		e.preventDefault();
		var page = $(this).attr("href");
		scrollTo(page);

	});

	$('.js-top').click(function(){

		$('html, body').animate({
			scrollTop: 0,
		}, 800);
	});

	$(window).scroll(function(){

		var top = $(window).scrollTop();

		if(top > 100){
			$('.logo').addClass('small');
			$('.bg').addClass('position');
		} else{
			$('.logo').removeClass('small');
			$('.bg').removeClass('position');
		}

	});

	$('.container').on('scroll touchmove mousewheel', function(e){

	  if ($('.out').hasClass('open-menu')) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	  }

	});

	//slick slider
	$('.slick-product').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		adaptiveHeight: true,
		dots: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
				dots: false,
				slidesToShow: 1,
				slidesToScroll: 1
				}
			}
		]
	});

	$('.js-blog').slick({
		arrows: false,
		slidesToShow: 3,
		responsive: [
			{
				breakpoint: 1028,
				settings: {
				slidesToShow: 2,
				slidesToScroll: 2,
				arrows: true
				}
			},
			{
				breakpoint: 768,
				settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true
				}
			}
		]
	});

	//slick slider inner
	var total = $('.gallery__item').length;

	$('.js-slick').slick({
		infinite: true,
		arrows: true,
		slidesToShow: 1
	 });
	$('.gallery__total').text(total);

	$('.js-slick').on('afterChange', function(event, slick, currentSlide, nextSlide){
		$('.gallery__current').text($('.slick-active').index());
	});

	$('.gallery__prev').on('click', function(){
		$('.slick-prev').trigger('click');
		return false;
	 });

	$('.gallery__next').on('click', function(){
		$('.slick-next').trigger('click');
		return false;
	});

	//plus/minus
	function number() {
		var number = $(".js-number");
		number.each(function(){
			var max_number = +($(this).attr("data-max-number"));
			var input = $(this).find("input");
			var plus = $(this).find(".js-plus-number");
			var minus = $(this).find(".js-minus-number");
			plus.on("click", function(){
				var val = +(input.val());
				if (val >= max_number) {
					return false
				}
				else {
					val += 1;
					input.val(val);
				}
			});
			minus.on("click", function(){
				var val = +(input.val());
				if (val > 1) {
					val -= 1;
					input.val(val);
				}
				return false;
			});
			input.on("change", function(){
				var val = +$(this).val();
				if (val > max_number) {
					val = max_number;
					$(this).val(val);
				}
				if (val == '') {
					val = 1;
					$(this).val(val);
				}
			});
		});
	}
	number();

	//tabs
	$(".js-tab-btn").click(function () {

		$('.js-tab-btn').removeClass('is-active');
		$(this).addClass('is-active');

		var id = $(this).data("btn"),
		$item = $('.js-tab-block');

		var $currItem = $('.js-tab-block[data-block=' + id + ']');

		$('.js-tab-block[data-block=' + id + ']').addClass('is-active');
		$item.not($currItem).removeClass('is-active');

		return false;

	 });

	//validate
	var form_validate = $('.js-validate');

		if (form_validate.length) {

		form_validate.each(function () {

			var form_this = $(this);
			$.validate({
				form : form_this,
				validateOnBlur : false,
				borderColorOnError : false,
				scrollToTopOnError : false,

			onSuccess : function() {
				$('.js-form').addClass('is-success');
				$('.js-form-back').addClass('is-success');
		 		// ajaxSubmit(form_this);
				return false;
		   }
	   	});

	  	});

	 };

	$('.js-form-return').on('click', function(){

	 	$('.js-validate').trigger('reset');
	 	$('.js-form').removeClass('is-open is-success');
		$('.js-form-back').removeClass('is-success');

	 });

	//popups
	// $('.js-popup-btn').on('click', function() {

	// 	$('.js-popup').addClass('is-active');
	// 	return false;

	//  });
	//  $('.js-popup-close').on('click', function() {

	// 	$('.js-popup').removeClass('is-active');
	// 	return false;

	//  });

	//  $('.js-popup').each(function() {

	// 	$('body').on('click', function () {
	// 	 $('.js-popup').removeClass('is-active');
	// 	});

	// 	$('.popup__inner').on('click', function(event) {
	// 	 event.stopPropagation();
	// 	});

	//  });

	 // popups
	 (function() {

	 	$('.js-popup').on( 'click', function () {

	 		var somedialog = $(this).data('dialog'),

	 		somedialog = $('#' + somedialog);


	 		var morphEl = somedialog.find( '.morph-shape' ),
	 			morphElSvg = morphEl.find('svg');

	 		var s = Snap( morphElSvg[0] ),
	 		path = s.select( 'path' ),
	 		steps = {
	 			open : morphEl.attr( 'data-morph-open' ),
	 			close : morphEl.attr( 'data-morph-close' )
	 		},
	 		dlg = new DialogFx( somedialog[0], {
	 			onOpenDialog : function( instance ) {
	 				// animate path
	 				path.stop().animate( { 'path' : steps.open }, 400, mina.easeinout );
	 			},
	 			onCloseDialog : function( instance ) {
	 				// animate path
	 				path.stop().animate( { 'path' : steps.close }, 400, mina.easeinout );
	 			}
	 		} );

	 		dlg.toggle();
	 	});

	 })();

});