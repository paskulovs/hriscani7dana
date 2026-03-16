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

	$('.about-entry').each(function() {
		var $entry = $(this);
		var $toggle = $entry.find('.about-entry__toggle');
		var $meta = $toggle.find('.about-entry__meta');
		var $firstParagraph = $entry.find('.about-entry__content p').first();

		if (!$firstParagraph.length || $toggle.find('.about-entry__preview').length) {
			return;
		}

		$('<p class="about-entry__preview"></p>')
			.text($firstParagraph.text())
			.insertBefore($toggle.find('.about-entry__meta'));

		if ($meta.length && !$entry.find('.about-entry__action').length) {
			$meta.removeClass('about-entry__meta').addClass('about-entry__action').appendTo($entry);
		}
	});

	$('.about-entry__toggle, .about-entry__action').on('click', function() {
		var $entry = $(this).closest('.about-entry');
		var $toggle = $entry.find('.about-entry__toggle');
		var $content = $entry.find('.about-entry__content');
		var $action = $entry.find('.about-entry__action');
		var isExpanded = $toggle.attr('aria-expanded') === 'true';

		$toggle.attr('aria-expanded', String(!isExpanded));
		$entry.toggleClass('is-open', !isExpanded);
		$action.text(!isExpanded ? 'Prikaži manje' : 'Prikaži više');

		if (isExpanded) {
			$content.stop(true, true).slideUp(220, function() {
				$content.attr('hidden', true);
			});
			return;
		}

		$content.removeAttr('hidden').hide().stop(true, true).slideDown(220);
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
