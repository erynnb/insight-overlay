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

		document.getElementById('blue-team').value = tempRedName;
		document.getElementById('red-team').value = tempBlueName;
		document.getElementById('blue-score').value = tempRedScore;
		document.getElementById('red-score').value = tempBlueScore;
		teamScoresReplicant.value = [
			document.getElementById('blue-score').value,
			document.getElementById('red-score').value
		];
		teamNamesReplicant.value = [
			document.getElementById('blue-team').value,
			document.getElementById('red-team').value
		];
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

})();
