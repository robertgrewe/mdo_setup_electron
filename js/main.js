// default settings
var currentTab = 0; // Current tab is set to be the first tab (0)

// default view
// $("#btn_terminal").hide()
// $("#btn_heeds").hide()

// form to var assignment
var optimizer = 'HEEDs'
var row = $('#row').text()

// collect form data
function collectFormData(){

  // create example yml data
  let config = {
    dirname: 'myTurbineProcessChain',
    optimizer: optimizer,
    Optifoil:  {
      set_config_resolution: 'single_row',
      rows: [row],
    },
    analysis_row: row,
    setups: {
      OP1: {
      },
    },
  };

  // add discipline paths
  // TODO: Convert to loop
  // TODO: Check if paths are valid/exist

  if ( $("#toggle_cfd").is(":checked") ) {
    config.setups.OP1.CFD = {}
    config.setups.OP1.CFD.path_to_GAT3003_SID_EXPORT = $('#pathname_cfd').val()
  }

  if ( $("#toggle_cad").is(":checked") ) {
    config.setups.OP1.CAD = {}
    config.setups.OP1.CAD.path_to_CAD_EXPORT = $('#pathname_cad').val()
  }

  if ( $("#toggle_cht").is(":checked") ) {
    config.setups.OP1.CHT = {}
    config.setups.OP1.CHT.path_to_CHT_EXPORT = $('#pathname_cht').val()
  }

  if ( $("#toggle_mil").is(":checked") ) {
    config.setups.OP1.MIL = {}
    config.setups.OP1.MIL.path_to_MIL_EXPORT = $('#pathname_mil').val()
  }

  if ( $("#toggle_aem").is(":checked") ) {
    config.setups.OP1.AEM = {}
    config.setups.OP1.AEM.path_to_GAT3003_SID_CASE = $('#pathname_aem').val()
  }


  console.log(config)

  // write.js
  const fs = require('fs');
  const yaml = require('js-yaml');

  let yamlStr = yaml.safeDump(config);

  // definitions
  var filename_config = 'config.yml'
  var pathname_wkdir = $('#input-work-dir').val()
  var filepath_config = path.join(pathname_wkdir, filename_config)

  console.log('Writing config file ...')
  console.log(yamlStr)
  fs.writeFileSync(filepath_config, yamlStr, 'utf8');
  console.log('Configuration file written to: ' + filepath_config)

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

// 'show' back Button
function showBackButton(){
  // console.log("Show back button ...")
  $('a[href$="previous"]').text("Back")
}

// 'hide' back Button
function hideBackButton(){
  // console.log("Hide back button ...")
  $('a[href$="previous"]').text("")
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
								<input type="text" id="'+ name + '" class="form-control" placeholder="' + placeholder + '">\
								<div class="input-group-append">\
									<button class="btn btn-outline-secondary" id=browse_' + name + ' type="button">Browse</button>\
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
        startIndex: 0,
        labels: {
            next: "Next",
            previous: "Back",
            finish: 'Finish'
        },
        onStepChanging: function (event, currentIndex, newIndex) {

            // console.log("Current index: " + currentIndex)
            // console.log("New index: " + newIndex)
            currentTab = (newIndex + 1)
            console.log("Current step number: " + currentTab)

						$(".step_circles").removeClass("active")
						$(".step_circles").slice(0,newIndex+1).addClass("active")

            // back button
            if (newIndex == 0){hideBackButton()}else {showBackButton()}

            // on last step do ...
            // TODO: Bad implemenation!!!
            if (currentTab == $(type='section').length) {

              // setup start screen
              $("#h3_last").addClass("inactive")
              $("#h3_last").text("Setting up process chain ...")
              $(".icon-box").hide()
              $("#progress").show()
              $("#btn_terminal").addClass("disabled")
              $("#btn_heeds").addClass("disabled")

              // write config file
              collectFormData()

              // run init_optimization_turbine
              initOptimization()

              // // pretend that something is running
              // setTimeout(function(){
              //   console.log("Timer done")
              //   // shown final screen
              //   $("#h3_last").removeClass("inactive")
              //   $("#h3_last").text("Setup finished!")
              //   $("#progress").hide()
              //   $(".icon-box").show()
              //   $("#btn_terminal").removeClass("disabled")
              //   $("#btn_heeds").removeClass("disabled")
              //
              // },5000);

            }

            return true;
        },
        onInit: function (event, currentIndex) {
            hideBackButton()
        },
        onFinishing: function (event, currentIndex) {
          alert("onFinishing")
          return true;
        },
        onFinished: function (event, currentIndex) {
          alert("onFinish")
        },
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

      if (optimizer == 'HEEDs'){
        $("#btn_heeds").show()
      }
        else {
        $("#btn_heeds").hide()
        }

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
		var discipline_cfd = new discipline('toggle_cfd', 'div_discipline_cfd', 'CFD - Aerodynamics', 'pathname_cfd', 'Choose GAT3003 directory')
		var discipline_cfd = new discipline('toggle_cad', 'div_discipline_cad', 'CAD - Geometry', 'pathname_cad','Choose S-Blade directory')
		var discipline_cfd = new discipline('toggle_cht', 'div_discipline_cht', 'CHT - Heat Transfer', 'pathname_cht','Choose CHT directory')
		var discipline_cfd = new discipline('toggle_mil', 'div_discipline_mil', 'MIL - Mechanical Integrity & Lifing', 'pathname_mil','Choose MIL directory')
		var discipline_cfd = new discipline('toggle_aem', 'div_discipline_aem', 'AEM - Aeromechanics', 'pathname_aem', 'Choose GAT3003 directory')

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
