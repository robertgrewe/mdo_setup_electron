$(function(){
	$("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 300,
        labels: {
            next: "Continue",
            previous: "Back",
            finish: 'Proceed to checkout'
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            if ( newIndex >= 1 ) {
                $('.steps ul li:first-child a img').attr('src','images/step-1.png');
            } else {
                $('.steps ul li:first-child a img').attr('src','images/step-1-active.png');
            }

            if ( newIndex === 1 ) {
                $('.steps ul li:nth-child(2) a img').attr('src','images/step-2-active.png');
            } else {
                $('.steps ul li:nth-child(2) a img').attr('src','images/step-2.png');
            }

            if ( newIndex === 2 ) {
                $('.steps ul li:nth-child(3) a img').attr('src','images/step-3-active.png');
            } else {
                $('.steps ul li:nth-child(3) a img').attr('src','images/step-3.png');
            }

            if ( newIndex === 3 ) {
                $('.steps ul li:nth-child(4) a img').attr('src','images/step-4-active.png');
                $('.actions ul').addClass('step-4');
            } else {
                $('.steps ul li:nth-child(4) a img').attr('src','images/step-4.png');
                $('.actions ul').removeClass('step-4');
            }
            return true;
        }
    });
    // Custom Button Jquery Steps
    $('.forward').click(function(){
    	$("#wizard").steps('next');
    })
    $('.backward').click(function(){
        $("#wizard").steps('previous');
    })
    // Click to see password
    $('.password i').click(function(){
        if ( $('.password input').attr('type') === 'password' ) {
            $(this).next().attr('type', 'text');
        } else {
            $('.password input').attr('type', 'password');
        }
    })
    // Create Steps Image
    $('.steps ul li:first-child').append('<img src="images/step-arrow.png" alt="" class="step-arrow">').find('a').append('<img src="images/step-1-active.png" alt=""> ').append('<span class="step-order">Airfoil</span>');
    $('.steps ul li:nth-child(2').append('<img src="images/step-arrow.png" alt="" class="step-arrow">').find('a').append('<img src="images/step-2.png" alt="">').append('<span class="step-order">CAD</span>');
    $('.steps ul li:nth-child(3)').append('<img src="images/step-arrow.png" alt="" class="step-arrow">').find('a').append('<img src="images/step-3.png" alt="">').append('<span class="step-order">CFD</span>');
    $('.steps ul li:last-child a').append('<img src="images/step-4.png" alt="">').append('<span class="step-order">CHT</span>');

		// Count input
    $(".quantity span").on("click", function() {

        var $button = $(this);
        var oldValue = $button.parent().find("input").val();

        if ($button.hasClass('plus')) {
          var newVal = parseFloat(oldValue) + 1;
        } else {
           // Don't allow decrementing below zero
          if (oldValue > 0) {
            var newVal = parseFloat(oldValue) - 1;
            } else {
            newVal = 0;
          }
        }
        $button.parent().find("input").val(newVal);
    });
})

// document.getElementById("AutoOpti_logo").style.border = "solid"
document.getElementById("AutoOpti_logo").style.filter = "grayscale(100%)"
document.getElementById("Heeds_logo").style.boxShadow = " 0px 0px 3px 3px #8eb852"
