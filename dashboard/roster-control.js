(function () {
	'use strict';

	const blueRoster = nodecg.Replicant('blueRoster')
	const redRoster = nodecg.Replicant('redRoster')
	const rosterActive = nodecg.Replicant('rosterActive', {
		defaultValue: 'blue',
		persistent: true
	});
	const rosterVisible = nodecg.Replicant('rosterVisible');

	class RosterControl extends Polymer.MutableData(Polymer.Element) {

		static get is() {
			return 'roster-control';
		}

		ready() {
			super.ready();
			this.initialized = false;
			this.roles = [{role: 'DPS'}, {role: 'Tank'}, {role: 'Support'}, {role: 'Flex'}];

			rosterActive.on('change', newVal => {
				rosterActive.value = newVal;
				if (newVal === 'red') {
					this.$.rosterToggle.setAttribute('checked', 'true');
				} else {
					rosterActive.value = 'blue';
					this.$.rosterToggle.removeAttribute('checked', 'false');
				}
			});
			rosterVisible.on('change', newVal => {
				if (newVal) {
					this.$.show.setAttribute('hidden', 'true');
					this.$.hide.removeAttribute('disabled');
					this.$.rosterToggle.setAttribute('disabled', 'true');
				} else {
					this.$.show.removeAttribute('hidden');
					this.$.hide.setAttribute('disabled', 'true');
					this.$.rosterToggle.removeAttribute('disabled', 'true');
				}
			});
			// remember values in case dashboard is refreshed

			blueRoster.on('change', newVal => {
				if (newVal) {
					this.$.bluePlayer1Name.value = newVal.player1.name;
					this.bluePlayer1Class = newVal.player1.class;
					this.bluePlayer1Role = newVal.player1.role;

					this.$.bluePlayer2Name.value = newVal.player2.name;
					this.bluePlayer2Class = newVal.player2.class;
					this.bluePlayer2Role = newVal.player2.role;

					this.$.bluePlayer3Name.value = newVal.player3.name;
					this.bluePlayer3Class = newVal.player3.class;
					this.bluePlayer3Role = newVal.player3.role;

					this.$.bluePlayer4Name.value = newVal.player4.name;
					this.bluePlayer4Class = newVal.player4.class;
					this.bluePlayer4Role = newVal.player4.role;

					this.$.bluePlayer5Name.value = newVal.player5.name;
					this.bluePlayer5Class = newVal.player5.class;
					this.bluePlayer5Role = newVal.player5.role;

					this.$.bluePlayer6Name.value = newVal.player6.name;
					this.bluePlayer6Class = newVal.player6.class;
					this.bluePlayer6Role = newVal.player6.role;
				}
			});

			redRoster.on('change', newVal => {
				if (newVal) {
					this.$.redPlayer1Name.value = newVal.player1.name;
					this.redPlayer1Class = newVal.player1.class;
					this.redPlayer1Role = newVal.player1.role;

					this.$.redPlayer2Name.value = newVal.player2.name;
					this.redPlayer2Class = newVal.player2.class;
					this.redPlayer2Role = newVal.player2.role;

					this.$.redPlayer3Name.value = newVal.player3.name;
					this.redPlayer3Class = newVal.player3.class;
					this.redPlayer3Role = newVal.player3.role;

					this.$.redPlayer4Name.value = newVal.player4.name;
					this.redPlayer4Class = newVal.player4.class;
					this.redPlayer4Role = newVal.player4.role;

					this.$.redPlayer5Name.value = newVal.player5.name;
					this.redPlayer5Class = newVal.player5.class;
					this.redPlayer5Role = newVal.player5.role;

					this.$.redPlayer6Name.value = newVal.player6.name;
					this.redPlayer6Class = newVal.player6.class;
					this.redPlayer6Role = newVal.player6.role;
				}
			});
		}
		hideRoster() {
			rosterVisible.value = false;
		}
		showRoster() {
			this.update();
			rosterVisible.value = true;
		}

		update() {
			blueRoster.value = {
				player1: {
					name: this.$.bluePlayer1Name.value === '' ? 'Player 1' : this.$.bluePlayer1Name.value,
					class: this.bluePlayer1Class === undefined ? 'Unknown' : this.bluePlayer1Class,
					role: this.bluePlayer1Role === undefined ? 'Flex' : this.bluePlayer1Role
				},
				player2: {
					name: this.$.bluePlayer2Name.value === '' ? 'Player 2' : this.$.bluePlayer2Name.value,
					class: this.bluePlayer2Class === undefined ? 'Unknown' : this.bluePlayer2Class,
					role: this.bluePlayer2Role === undefined ? 'Flex' : this.bluePlayer2Role
				},
				player3: {
					name: this.$.bluePlayer3Name.value === '' ? 'Player 3' : this.$.bluePlayer3Name.value,
					class: this.bluePlayer3Class === undefined ? 'Unknown' : this.bluePlayer3Class,
					role: this.bluePlayer3Role === undefined ? 'Flex' : this.bluePlayer3Role
				},
				player4: {
					name: this.$.bluePlayer4Name.value === '' ? 'Player 4' : this.$.bluePlayer4Name.value,
					class: this.bluePlayer4Class === undefined ? 'Unknown' : this.bluePlayer4Class,
					role: this.bluePlayer4Role === undefined ? 'Flex' : this.bluePlayer4Role
				},
				player5: {
					name: this.$.bluePlayer5Name.value === '' ? 'Player 5' : this.$.bluePlayer5Name.value,
					class: this.bluePlayer5Class === undefined ? 'Unknown' : this.bluePlayer5Class,
					role: this.bluePlayer5Role === undefined ? 'Flex' : this.bluePlayer5Role
				},
				player6: {
					name: this.$.bluePlayer6Name.value === '' ? 'Player 6' : this.$.bluePlayer6Name.value,
					class: this.bluePlayer6Class === undefined ? 'Unknown' : this.bluePlayer6Class,
					role: this.bluePlayer6Role === undefined ? 'Flex' : this.bluePlayer6Role
				}
			};
			redRoster.value = {
				player1: {
					name: this.$.redPlayer1Name.value === '' ? 'Player 1' : this.$.redPlayer1Name.value,
					class: this.redPlayer1Class === undefined ? 'Unknown' : this.redPlayer1Class,
					role: this.redPlayer1Role === undefined ? 'Flex' : this.redPlayer1Role
				},
				player2: {
					name: this.$.redPlayer2Name.value === '' ? 'Player 2' : this.$.redPlayer2Name.value,
					class: this.redPlayer2Class === undefined ? 'Unknown' : this.redPlayer2Class,
					role: this.redPlayer2Role === undefined ? 'Flex' : this.redPlayer2Role
				},
				player3: {
					name: this.$.redPlayer3Name.value === '' ? 'Player 3' : this.$.redPlayer3Name.value,
					class: this.redPlayer3Class === undefined ? 'Unknown' : this.redPlayer3Class,
					role: this.redPlayer3Role === undefined ? 'Flex' : this.redPlayer3Role
				},
				player4: {
					name: this.$.redPlayer4Name.value === '' ? 'Player 4' : this.$.redPlayer4Name.value,
					class: this.redPlayer4Class === undefined ? 'Unknown' : this.redPlayer4Class,
					role: this.redPlayer4Role === undefined ? 'Flex' : this.redPlayer4Role
				},
				player5: {
					name: this.$.redPlayer5Name.value === '' ? 'Player 5' : this.$.redPlayer5Name.value,
					class: this.redPlayer5Class === undefined ? 'Unknown' : this.redPlayer5Class,
					role: this.redPlayer5Role === undefined ? 'Flex' : this.redPlayer5Role
				},
				player6: {
					name: this.$.redPlayer6Name.value === '' ? 'Player 6' : this.$.redPlayer6Name.value,
					class: this.redPlayer6Class === undefined ? 'Unknown' : this.redPlayer6Class,
					role: this.redPlayer6Role === undefined ? 'Flex' : this.redPlayer6Role
				}
			};
		}
		_rosterChange() {
			if (this._roster === true) {
				rosterActive.value = 'red';
			} else {
				rosterActive.value = 'blue';
			}
		}

	}
	customElements.define(RosterControl.is, RosterControl);
})();
