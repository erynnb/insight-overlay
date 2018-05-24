(function() {
	'use strict';

	const bluTeamLogo = nodecg.Replicant('bluTeamLogo');
	const redTeamLogo = nodecg.Replicant('redTeamLogo');
	const scoreboardVisible = nodecg.Replicant('scoreboardVisible');
	const scores = nodecg.Replicant('scores');
	const scoreboardMode = nodecg.Replicant('scoreboardMode', {
		defaultValue: false,
		persistent: true
	});
	const attackDefend = nodecg.Replicant('attackDefend', {
		defaultValue: 'blue',
		persistent: true
	});

	class ScoreboardControl extends Polymer.MutableData(Polymer.Element) {
		static get is() {
			return 'scoreboard-control';
		}

		ready() {
			super.ready();

			scoreboardVisible.on('change', newVal => {
				if (newVal) {
					this.$.show.setAttribute('hidden', 'true');
					this.$.update.removeAttribute('hidden');
					this.$.hide.removeAttribute('disabled');
				} else {
					this.$.show.removeAttribute('hidden');
					this.$.update.setAttribute('hidden', 'true');
					this.$.hide.setAttribute('disabled', 'true');
				}
			});

			scores.on('change', newVal => {
				this.$.bluScore.value = newVal.blu.score;
				this.$.bluTag.value = newVal.blu.tag;
				this.$.redScore.value = newVal.red.score;
				this.$.redTag.value = newVal.red.tag;
			});

			bluTeamLogo.on('change', newVal => {
				this.bluTeamLogo = newVal;
			});
			redTeamLogo.on('change', newVal => {
				this.redTeamLogo = newVal;
			});
		}
		switchTeams() {
			const tempBluLogo = this.bluTeamLogo;
			bluTeamLogo.value = this.redTeamLogo;
			redTeamLogo.value = tempBluLogo;
			scores.value = {
				red: {
					score: parseInt(this.$.bluScore.value, 10),
					tag: scores.value.blu.tag
				},
				blu: {
					score: parseInt(this.$.redScore.value, 10),
					tag: scores.value.red.tag
				}
			};
		}
		hideOverlay() {
			scoreboardVisible.value = false;
		}
		showOverlay() {
			this.update();
			scoreboardVisible.value = true;
		}
		update() {
			bluTeamLogo.value = this.bluTeamLogo;
			redTeamLogo.value = this.redTeamLogo;
			scores.value = {
				red: {
					score: parseInt(this.$.redScore.value, 10),
					tag: this.$.redTag.value
				},
				blu: {
					score: parseInt(this.$.bluScore.value, 10),
					tag: this.$.bluTag.value
				}
			};
		}
		_enableAttackDefend() {
			scoreboardMode.value = this._adMode;
		}
		_whoAttacks() {
			if (this._attacks === true) {
				attackDefend.value = 'red';
			} else {
				attackDefend.value = 'blue';
			}
		}
	}

	customElements.define(ScoreboardControl.is, ScoreboardControl);
})();
