if (typeof(jQuery) == 'undefined') {
	console.log('Blossom did not detect jQuery. Add the src to your HTML.')
} else {

		$(function() {
			loadProgressBars()
			loadActiveProgressBars();
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
