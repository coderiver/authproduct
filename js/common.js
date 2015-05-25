head.ready(function() {

	// $(document).on("click", function(){
	//	$(".js-popup").hide();
	// });

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

	// buttons animations

	(function() {

		function extend( a, b ) {
			for( var key in b ) {
				if( b.hasOwnProperty( key ) ) {
					a[key] = b[key];
				}
			}
			return a;
		}

		function SVGButton( el, options ) {
			this.el = el;
			this.options = extend( {}, this.options );
			extend( this.options, options );
			this.init();
		}

		SVGButton.prototype.options = {
			speed : { reset : 800, active : 150 },
			easing : { reset : mina.elastic, active : mina.easein }
		};

		SVGButton.prototype.init = function() {
			this.shapeEl = this.el.querySelector( 'span.morph-shape' );

			var s = Snap( this.shapeEl.querySelector( 'svg' ) );
			this.pathEl = s.select( 'path' );
			this.paths = {
				reset : this.pathEl.attr( 'd' ),
				active : this.shapeEl.getAttribute( 'data-morph-active' )
			};

			this.initEvents();
		};

		SVGButton.prototype.initEvents = function() {
			this.el.addEventListener( 'mouseover', this.down.bind(this) );
			this.el.addEventListener( 'touchstart', this.down.bind(this) );

			this.el.addEventListener( 'touchend', this.up.bind(this) );

			this.el.addEventListener( 'mouseout', this.up.bind(this) );
		};

		SVGButton.prototype.down = function() {
			this.pathEl.stop().animate( { 'path' : this.paths.active }, this.options.speed.active, this.options.easing.active );
		};

		SVGButton.prototype.up = function() {
			this.pathEl.stop().animate( { 'path' : this.paths.reset }, this.options.speed.reset, this.options.easing.reset );
		};

		[].slice.call( document.querySelectorAll( 'button.button--effect-1' ) ).forEach( function( el ) {
			new SVGButton( el );
		} );

		[].slice.call( document.querySelectorAll( 'button.button--effect-2' ) ).forEach( function( el ) {
			new SVGButton( el, {
				speed : { reset : 650, active : 650 },
				easing : { reset : mina.elastic, active : mina.elastic }
			} );
		} );

	})();

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

});