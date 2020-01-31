
var currentTab = 0; // Current tab is set to be the first tab (0)

$(function(){
	$("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        transitionEffectSpeed: 300,
        labels: {
            next: "Next",
            previous: "Back",
            finish: 'Proceed to checkout'
        },
        onStepChanging: function (event, currentIndex, newIndex) {

						$(".step_circles").removeClass("active")
						$(".step_circles").slice(0,newIndex+1).addClass("active")

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

		// logo responsiveness
		$( ".img-logo" ).click(function() {
			$(".img-logo").removeClass("selected");
			$(this).addClass("selected");
		});

		// arrows responsiveness in row name text box
		var rows = ["R1", "S1", "R2", "S2", "R3", "S3", "R4", "S4"]; // define choosable row names

		// array rotate function
		function arrayRotate(arr, reverse) {
			if (reverse) arr.unshift(arr.pop());
			else arr.push(arr.shift());
			return arr;
		}

		// when arrow_up clicked
		$('#arrow_upp').click(function(){
			rows = arrayRotate(rows);	// move through row
			$("#row").text(rows[0]);
			// console.log(rows[0])
		})

		// when arrow_down clicked
		$('#arrow_down').click(function(){
			rows = arrayRotate(rows, true);	// move through row
			$("#row").text(rows[0]);
			// console.log(rows[0])
		})

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
