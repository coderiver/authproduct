head.ready(function() {

	// function scrollFixedElements() {
	//		 var scroll_left = $(this).scrollLeft();
	//		 $(".fixed-element").css({
	//				 left: -scroll_left
	//		 });
	// }
	// scrollFixedElements();
	// $(window).scroll(function(){
	//		 scrollFixedElements()
	// });

	//fullpage
	if ($('.fullpage').length > 0 && $(window).width() > 768 && $(window).height() > 685){
		function fullPage(){
			$('.fullpage').fullpage({
				scrollingSpeed: 800,
				verticalCentered: false,
				fixedElements: '.header, .footer',
				anchors: ['main', 'products', 'blog', 'about', 'all'],


				onLeave: function(index, nextIndex, direction){
					var logo 		= $('.logo'),
						container	= $('.bg'),
						more 		= $('.more'),
						footer		= $('.footer');

					if(index == 1 && direction == 'down'){
						logo.addClass('small');
						container.addClass('position');
						more.addClass('is-hidden');
					}

					else if(index !== 1 && nextIndex == 1 && direction == 'up'){
						logo.removeClass('small');
						container.removeClass('position');
						more.removeClass('is-hidden');
					}

					else if(index == 4 && direction == 'down'){
						footer.addClass('is-visible');
						more.addClass('is-none');
					}

					else if(index == 5 && direction == 'up'){
						footer.removeClass('is-visible');
						more.removeClass('is-none');
					}

				},

				afterLoad: function(anchorLink, index){
					var more 	= $('.more'),
						footer	= $('.footer');

					if(anchorLink == 'all'){
						footer.addClass('is-visible');
						more.addClass('is-none');
					}
				}

			});
		}

		fullPage();
	}

	$(window).resize(function(){

		if($(window).width() < 768 || $(window).height() < 685){
			$.fn.fullpage.destroy('all');
		} else {
			fullPage();
			// $.fn.fullpage.reBuild();
		}

	});

	$('.nav__link').click(function(e){
		e.preventDefault;
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
	if($('.js-form').length > 0){
		$(".js-form").validate({
			rules: {
				firstname: "required",
				lastname: "required",
				name: {
					required: true,
					minlength: 1
				},
				phone: {
					required: true,
					number: true
					},
				message: {
					required: true,
					minlength: 1
				},
				email: {
					required: true,
					email: true
				},
				agree: "required"
			},
		 	messages: {
				required: {
				required: "",
				minlength: ""
				}
			}
		});
	}

	//popups
	$('.js-popup-btn').on('click', function() {

		$('.js-popup').addClass('is-active');
		return false;

	 });
	 $('.js-popup-close').on('click', function() {

		$('.js-popup').removeClass('is-active');
		return false;

	 });

	 $('.js-popup').each(function() {

		$('body').on('click', function () {
		 $('.js-popup').removeClass('is-active');
		});

		$('.popup__inner').on('click', function(event) {
		 event.stopPropagation();
		});

	 });

});