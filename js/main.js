// default settings
var currentTab = 0; // Current tab is set to be the first tab (0)
var optimizer = 'HEEDs'
var row = $('#row').text()

// collect form data
function collectFormData(){

  // create example yml data
  let data = {
    dirname: 'myTurbineProcessChain',
    optimizer: optimizer,
    Optifoil:  {
      set_config_resolution: 'single_row',
      rows: [row],
    },
    analysis_row: row,
    setups: {
      OP1: {
        CFD: {
          path_to_GAT3003_SID_EXPORT: './INPUT/CFD/GAT3003_SID',
        },
        CAD: {
          path_to_CAD_FILE: './INPUT/CFD/GAT3003_SID',
        },
        CHT: {
          path_to_CHT_EXPORT: './INPUT/CFD/GAT3003_SID',
        },
        MIL: {
          path_to_MIL_EXPORT: './INPUT/CFD/GAT3003_SID',
        },
        AEM: {
          path_to_GAT3003_SID_CASE: './INPUT/CFD/GAT3003_SID',
        },
      },
    },
  };

  // write.js
  const fs = require('fs');
  const yaml = require('js-yaml');

  let yamlStr = yaml.safeDump(data);

  // definitions
  var filename_config = 'config.yml'
  var pathname_wkdir = $('#input-work-dir').val()
  var filepath_config = path.join(pathname_wkdir, filename_config)

  console.log('Writting config file ...')
  console.log(yamlStr)
  fs.writeFileSync(filepath_config, yamlStr, 'utf8');
  console.log('Configuration file written to: ' + filepath_config)

}

function test(){
  console.log("Test")
}

// define discipline constructor
function discipline(toggle_id, discipline_id, label, name, placeholder) {
  this.toggle_id = toggle_id;
  this.discipline_id = discipline_id;
  this.label = label;
  this.name = name
	this.placeholder = placeholder;

	// create container
	createDisciplineContainer(this.toggle_id, this.discipline_id, this.label, this.name, this.placeholder)

	// hide first
	$( '#' + this.discipline_id + '' ).hide()

	// add toggle to show/hide
	addToggle(this.toggle_id, this.discipline_id)
}

// toggle discplines
function addToggle(toggle_id, discipline_id){
	$( '#' + toggle_id ).click(function() {
		$( '#' + discipline_id ).slideToggle( "fast", function() {
			// Animation complete.
		});
	});
}

function createDisciplineContainer(toggle_id, discipline_id, discipline_label, name, placeholder){

				// console.log(placeholder)
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
							<div class="input-group mb-3" id=' + discipline_id + '>\
								<input type="text" name="'+ name + '" class="form-control" placeholder="' + placeholder + '">\
								<div class="input-group-append">\
									<button class="btn btn-outline-secondary" id="browse-dir-test" type="button">Browse</button>\
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
				enableFinishButton: false,
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

		$("div.actions").insertBefore("div.content");

		// logo responsiveness
		$( ".img-logo" ).click(function() {
			$(".img-logo").removeClass("selected");
			$(this).addClass("selected");

      // store selected optimizer
      optimizer = $(this).attr("name")
      console.log(`\'${optimizer}\' chosen as optimizer.`)
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
      row = rows[0]
			$("#row").text(row);
			console.log(`Row changed to: ${row}`)
		})

		// when arrow_down clicked
		$('#arrow_down').click(function(){
			rows = arrayRotate(rows, true);	// move through row
      row = rows[0]
			$("#row").text(rows[0]);
      console.log(`Row changed to: ${row}`)
		})

		// initialize and add discipline containers
		var discipline_cfd = new discipline('toggle_cfd', 'div_discipline_cfd', 'CFD - Aerodynamics', 'dir_cfd', 'Choose GAT3003 directory')
		var discipline_cfd = new discipline('toggle_cad', 'div_discipline_cad', 'CAD - Geometry', 'dir_cad','Choose S-Blade directory')
		var discipline_cfd = new discipline('toggle_cht', 'div_discipline_cht', 'CHT - Heat Transfer', 'dir_cht','Choose CHT directory')
		var discipline_cfd = new discipline('toggle_mil', 'div_discipline_mil', 'MIL - Mechanical Integrity & Lifing', 'dir_mil','Choose MIL directory')
		var discipline_cfd = new discipline('toggle_aem', 'div_discipline_aem', 'AEM - Aeromechanics', 'dir_aem', 'Choose GAT3003 directory')

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
