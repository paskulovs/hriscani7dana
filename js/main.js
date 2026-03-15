jQuery(document).ready(function($) {

	'use strict';

	var $header = $('.header');

	function syncHeaderState() {
		var isActive = $(window).scrollTop() > 100;
		$header.toggleClass('active', isActive);
	}

	$(window).on('scroll', function() {
		syncHeaderState();
	});

	syncHeaderState();

	$('.scroll-link').on('click', function(event) {
		event.preventDefault();
		var sectionID = $(this).attr('data-id');
		scrollToID('#' + sectionID, 750);
	});

	$('.scroll-top').on('click', function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop: 0}, 'slow');
	});

	$('#nav-toggle').on('click', function(event) {
		event.preventDefault();
		$('#main-nav').toggleClass('open');
	});

	function scrollToID(id, speed) {
		var offSet = 50;
		var target = $(id);
		var mainNav = $('#main-nav');

		if (!target.length) {
			return;
		}

		$('html,body').animate({scrollTop: target.offset().top - offSet}, speed);

		if (mainNav.hasClass('open')) {
			mainNav.css('height', '1px').removeClass('in').addClass('collapse');
			mainNav.removeClass('open');
		}
	}

	if (typeof console === 'undefined') {
		console = {
			log: function() {}
		};
	}

});
