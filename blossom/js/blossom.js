if (typeof(jQuery) == 'undefined') {
	console.log('Blossom did not detect jQuery. Add the src to your HTML.')
} else {

		$(function() {
			loadProgressBars()
			loadActiveProgressBars();
			$('.dropdown').dropdown();
		});

		$.fn.extend({
			dropdown: function(o){
				var o = $.extend({ maxHeight: 600, buffer: 100, delay: 500 }, o);

				return this.each(function(){
					var dropdown = $(this),
						toggle = dropdown.find('.toggle'),
						menu = dropdown.find('.menu'),
						a = dropdown.find('a'),
						liheight = dropdown.height();

					if(!dropdown.length){ return; }


					toggle.click(function(e){
						if(!menu.is(':visible')) {
							$('.menu').parent().removeClass('open');
						}
						menu.parent().addClass('open');
					});

					$(document).bind('click', function(e){
						if (! $(e.target).parents().hasClass('dropdown'))
							menu.parent().removeClass('open');
					 });
				});
			}
		});


		function loadProgressBars() {
			$('.progress:not(.active) .bar[data-percent]').each(function () {
				var progress = $(this);
				var status = $(this).find('.status');
				var percentage = Math.ceil($(this).attr('data-percent')) + '%';
				progress.css('width',percentage)
				status.text(percentage)
			});
		}

		function loadActiveProgressBars() {
			$('.progress.active .bar[data-percent]').each(function () {
				var progress = $(this);
				var status = $(this).find('.status');
				var percentage = Math.ceil($(this).attr('data-percent'));
				$({countNum: 0}).animate({countNum: percentage}, {
					duration: 1600,
					easing:'linear',
					step: function() {
						var pct = '';
						if(percentage == 0){
							pct = Math.floor(this.countNum) + '%';
						}else{
							pct = Math.floor(this.countNum+1) + '%';
						}
						status.text(pct) && progress.css('width',pct);
					}
				});
			});
		}
}
