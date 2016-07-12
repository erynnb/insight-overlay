(function() {
	'use strict';

	var teamNamesReplicant = nodecg.Replicant('teamNames');
	var addTeams = document.getElementById('addteams');
	var teamScoresReplicant = nodecg.Replicant('teamScores', {
		defaultValue: [0, 0]
	});
	var addScores = document.getElementById('addscores');
	var swapTeams = document.getElementById('swapteams');
	var fadeIn = document.getElementById('fadein');
	var fadeOut = document.getElementById('fadeout');
  var addlogos = document.getElementById('addlogos');

	var switchImage = document.getElementById('switch-images');

	var dashboardLogoReplicant = nodecg.Replicant('teamLogos');

	var uploads;
	var teamlogosReplicant = nodecg.Replicant('assets:teamlogos');

 var alert;


	addTeams.addEventListener('click', function() {
		teamNamesReplicant.value = [
			document.getElementById('blue-team').value,
			document.getElementById('red-team').value
		];
		nodecg.sendMessage('teamNames');
		console.log(teamNamesReplicant);
	});

	addScores.addEventListener('click', function() {
		teamScoresReplicant.value = [
			document.getElementById('blue-score').value,
			document.getElementById('red-score').value
		];
		nodecg.sendMessage('teamScores');
		console.log(teamScoresReplicant);

	});

	swapTeams.addEventListener('click', function() {
		var tempRedName = document.getElementById('red-team').value;
		var tempBlueName = document.getElementById('blue-team').value;
		var tempBlueScore = document.getElementById('blue-score').value;
		var tempRedScore = document.getElementById('red-score').value;
		var tempBlueLogo = document.getElementById('blue-logo').value;
		var tempRedLogo = document.getElementById('red-logo').value;

		document.getElementById('blue-team').value = tempRedName;
		document.getElementById('red-team').value = tempBlueName;
		document.getElementById('blue-score').value = tempRedScore;
		document.getElementById('red-score').value = tempBlueScore;
		document.getElementById('blue-logo').value = tempRedLogo;
		document.getElementById('red-logo').value = tempBlueLogo;

		teamScoresReplicant.value = [
			document.getElementById('blue-score').value,
			document.getElementById('red-score').value
		];
		teamNamesReplicant.value = [
			document.getElementById('blue-team').value,
			document.getElementById('red-team').value
		];
		dashboardLogoReplicant.value = [
			document.getElementById('blue-logo').value,
			document.getElementById('red-logo').value
		];
		nodecg.sendMessage('teamLogos');

		nodecg.sendMessage('teamScores');
		nodecg.sendMessage('teamNames');

	});

	fadeIn.addEventListener('click', function() {
		teamScoresReplicant.value = [
			document.getElementById('blue-score').value,
			document.getElementById('red-score').value
		];
		teamNamesReplicant.value = [
			document.getElementById('blue-team').value,
			document.getElementById('red-team').value
		];
		nodecg.sendMessage('fadeIn');

	});
	fadeOut.addEventListener('click', function() {
		nodecg.sendMessage('fadeOut');

	});
/**
*  Below is a temp logo thing. Need to implement this better.
*/

addlogos.addEventListener('click', function() {
	dashboardLogoReplicant.value = [
		document.getElementById('blue-logo').value,
		document.getElementById('red-logo').value
	];
	nodecg.sendMessage('teamLogos');

});

switchImage.addEventListener('click', function() {

	nodecg.sendMessage('switchImages');
	switchAlert = nodecg.Replicant('switchType');
	if (switchAlert.value == "_alt") {
		document.getElementById('alert').innerHTML = "Orignal Version";
	} else {
		document.getElementById('alert').innerHTML = "Alt Version";
	}
});



	teamlogosReplicant.on('change', function(newVal, oldVal) {
		uploads = newVal;
	});

	function updateLogos() {
		var $list = document.querySelector('logos-list');
		for (var i = 0; i < uploads.length; i++) {
			$list.addLogo({
				url: uploads[i].url,
				name: uploads[i].name
			})
		}
	}

})();
