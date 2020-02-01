
var currentTab = 0; // Current tab is set to be the first tab (0)

createDisciplineContainer('toggle_cfd', 'div_discipline_cfd', 'CFD - Aerodynamics')
createDisciplineContainer('toggle_cad', 'div_discipline_cad', 'CAD - Geometry')
createDisciplineContainer('toggle_cht', 'div_discipline_cht', 'CHT - Heat Transfer')

// initialize wizard
$( "#div_discipline_cfd" ).hide()
$( "#div_discipline_cad" ).hide()
$( "#div_discipline_cht" ).hide()

// toggle discplines
function addToggle(toggle_id, discipline_id){
	$( '#' + toggle_id ).click(function() {
		$( '#' + discipline_id ).slideToggle( "fast", function() {
			// Animation complete.
		});
	});
}

function createDisciplineContainer(toggle_id, discipline_id, discipline_label){
				$("#container_disciplines").append(
				'\
				<!-- discipline start -->\
				<div class="container">\
					<!-- discipline start -->\
					<div class="container" id="container_cfd">\
						<div class="row" style="padding-bottom: 30px">\
							<!-- -->\
							<!-- label -->\
							<div class="col-sm button discipline-label">' + discipline_label + '</div>\
							<!-- -->\
							<!-- iOS type slider -->\
							<div class="checkbox checkbox-slider--b-flat checkbox-slider">\
								<label class="slider-label">\
									<input type="checkbox" id="' + toggle_id + '"><span></span>\
								</label>\
							</div>\
							<!-- -->\
							<!-- textbox with browse button-->\
							<div class="input-group mb-3 div-discipline-holder" id=' + discipline_id + '>\
								<input type="text" class="form-control" placeholder="Choose GAT3003 directory">\
								<div class="input-group-append">\
									<button class="btn btn-outline-secondary" type="button">Browse</button>\
								</div>\
							</div>\
						</div>\
					</div>\
				</div>\
				')
}

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

		// add toggle event to disciplines
		addToggle('toggle_cfd', 'div_discipline_cfd')
		addToggle('toggle_cad', 'div_discipline_cad')
		addToggle('toggle_cht', 'div_discipline_cht')

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
