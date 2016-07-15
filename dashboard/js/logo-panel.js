(function() {
	'use strict';



	var dashboardLogoReplicant = nodecg.Replicant('teamLogos');

	var teamLogos;

	var teamlogosReplicant = nodecg.Replicant('assets:teamlogos');



	teamlogosReplicant.on('change', function(newVal, oldVal) {
		teamLogos = newVal;
		console.log(teamLogos);
		document.querySelector('logo-panel').setList(teamLogos);
	});

	function updateLogos() {
		var $list = document.querySelector('logos-list');
		for (var i = 0; i < teamLogos.length; i++) {
			$list.addLogo({
				url: teamLogos[i].url,
				name: teamLogos[i].name
			})
		}
	}

})();
