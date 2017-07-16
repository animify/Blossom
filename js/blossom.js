if (typeof(jQuery) == 'undefined') {
  console.log('Blossom did not detect jQuery. Include the latest source url at the end of your body markup.')
} else {

    $(function() {
      loadProgressBars()
      loadActiveProgressBars()
      $('.dropdown').dropdown()

      $('body').on('click', '.menu .item', function(e) {
        const _parent = $(this).parents('.menu')
        _parent.find('.item').removeClass('active')
        $(this).addClass('active')
      }).on('click', '.accordion .title', function(e) {
        if ($(this).parent().hasClass('single') && !$(this).hasClass('open')) {
          $('.accordion .title, .accordion .content').removeClass('open')
          $('.accordion .content').slideUp('fast')
        }

        if ($(this).hasClass('open')) {
          $(this).removeClass('open').next().slideUp('fast')
        } else {
          $(this).addClass('open').next().slideDown('fast')
        }
      })
    })

    $.fn.extend({
      dropdown: function(o){
        o = $.extend({ maxHeight: 600, buffer: 100, delay: 0 }, o)

        return this.each(function(){
          var dropdown = $(this),
            toggle = dropdown.find('.toggle'),
            menu = dropdown.find('.menu'),
            a = dropdown.find('a')

          if(!dropdown.length) return

          toggle.unbind("click")
          toggle.click(function(e){
            (!menu.is(':visible')) && $('.menu').parent().removeClass('open')

            setTimeout(function() {
              menu.parent().addClass('open')
            }, o.delay)
          })

          a.bind('click', function(e){
            menu.parent().removeClass('open')
          })

          $(document).bind('click', function(e) {
            if (! $(e.target).parents().hasClass('dropdown'))
              menu.parent().removeClass('open')
           })
        })
      }
    })


    function loadProgressBars() {
      $('.progress:not(.active) .bar[data-percent]').each(function () {
        const progress = $(this)
        const status = $(this).find('.status')
        const percentage = Math.ceil($(this).attr('data-percent')) + '%'
        progress.css('width',percentage)
        status.text(percentage)
      })
    }

    function loadActiveProgressBars() {
      $('.progress.active .bar[data-percent]').each(function () {
        const progress = $(this)
        const status = $(this).find('.status')
        const percentage = Math.ceil($(this).attr('data-percent'))
        $({countNum: 0}).animate({countNum: percentage}, {
          duration: 1600,
          easing:'linear',
          step: function() {
            var pct = ''
            if(percentage == 0){
              pct = Math.floor(this.countNum) + '%'
            }else{
              pct = Math.floor(this.countNum+1) + '%'
            }
            status.text(pct) && progress.css('width',pct)
          }
        })
      })
    }
}
