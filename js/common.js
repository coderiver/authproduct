head.ready(function() {

	// $(document).on("click", function(){
	//  $(".js-popup").hide();
	// });

	// function scrollFixedElements() {
	//     var scroll_left = $(this).scrollLeft();
	//     $(".fixed-element").css({
	//         left: -scroll_left
	//     });
	// }
	// scrollFixedElements();
	// $(window).scroll(function(){
	//     scrollFixedElements()
	// });

	//fullpage
	if ($('.fullpage').length > 0 && $(window).width() > 768 && $(window).height() > 685){
		var fullPage = $('.fullpage').fullpage({
			scrollingSpeed: 800,
			verticalCentered: false,
			fixedElements: '.header',
			anchors: ['main', 'products', 'blog', 'about', 'all'],
			responsive: 769,


			onLeave: function(index, nextIndex, direction){
				var logo 	  = $('.logo'),
					container = $('.bg'),
					more 	  = $('.more');

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
			},

			afterResize: function(){

				if($(window).width() < 768){
					$('.logo').addClass('small');
				}

			},

			afterLoad:function(){

				if($(window).width() < 768){
					$('.logo').addClass('small');
				}
			}
		});
	}


	$('.nav__link').click(function(e){
		e.preventDefault;
	});

	//svg menu btn animation
	(function() {

		function SVGHamburger( el, options ) {
			this.el = el;
			this.init();
		}

		SVGHamburger.prototype.init = function() {
			this.shapeEl = this.el.querySelector( 'span.morph-shape' );

			var s = Snap( this.shapeEl.querySelector( 'svg' ) );
			this.pathEl1 = s.select( 'path:nth-of-type(1)' );
			this.pathEl2 = s.select( 'path:nth-of-type(2)' );
			this.paths = {
				reset : {
					path1 : this.pathEl1.attr( 'd' ),
					path2 : this.pathEl2.attr( 'd' )
				},
				open : this.shapeEl.getAttribute( 'data-morph-open' ).split( ';' ),
				close : this.shapeEl.getAttribute( 'data-morph-close' ).split( ';' )
			};

			this.isOpen = false;

			this.initEvents();
		};

		SVGHamburger.prototype.initEvents = function() {
			this.el.addEventListener( 'mouseover', this.toggleShow.bind(this) );
			this.el.addEventListener( 'mouseout', this.toggleHide.bind(this) );
		};

		SVGHamburger.prototype.toggleShow = function() {
			var self = this,
				paths = this.isOpen ? this.paths.close : this.paths.open;

				setTimeout( function() { classie.add( self.el, 'is-open' ); }, 200 );

			this.pathEl1.stop().animate( { 'path' : paths[0] }, 300, mina.easeout, function() {
				self.pathEl1.stop().animate( { 'path' : self.paths.reset.path1 }, 800, mina.elastic );
			} );
			this.pathEl2.stop().animate( { 'path' : paths[1] }, 300, mina.easeout, function() {
				self.pathEl2.stop().animate( { 'path' : self.paths.reset.path2 }, 800, mina.elastic );
			} );

			this.isOpen = !this.isOpen;
		};


		SVGHamburger.prototype.toggleHide = function() {
			var self = this,
				paths = this.isOpen ? this.paths.close : this.paths.open;

				setTimeout( function() { classie.remove( self.el, 'is-open' ); }, 200 );

			this.pathEl1.stop().animate( { 'path' : paths[0] }, 300, mina.easeout, function() {
				self.pathEl1.stop().animate( { 'path' : self.paths.reset.path1 }, 800, mina.elastic );
			} );
			this.pathEl2.stop().animate( { 'path' : paths[1] }, 300, mina.easeout, function() {
				self.pathEl2.stop().animate( { 'path' : self.paths.reset.path2 }, 800, mina.elastic );
			} );

			this.isOpen = !this.isOpen;
		};

		new SVGHamburger( document.getElementById('hamburger'));

	})();

	//slick slider
	$('.slick-product').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		adaptiveHeight: true,
		dots: true
	});

	$('.blog').slick({
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

});