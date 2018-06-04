
(function () {
	'use strict';
	const rosterActive = nodecg.Replicant('rosterActive');
	const scores = nodecg.Replicant('scores', 'insight-overlay');

	const blueRoster = nodecg.Replicant('blueRoster');
	const redRoster = nodecg.Replicant('redRoster');

	const rosterVisible = nodecg.Replicant('rosterVisible');

	const MAX_PLAYER_NAME_WIDTH = 330;

	class InsightRoster extends Polymer.Element {
		static get is() {
			return 'insight-roster';
		}
		static get properties() {
			return {
				rosterActive: {
					type: String,
					observer: '_rosterChange'
				},
				visible: {
					type: Boolean,
					value: false,
					observer: '_visibleChanged'
				},
				timeline: {
					type: TimelineLite,
					readOnly: true,
					value() {
						return new TimelineLite({
							autoRemoveChildren: true
						});
					}
				}
			};
		}

		ready() {
			super.ready();

			this.initialized = false;
			this.player1role = 'flex';
			this.player2role = 'flex';
			this.player3role = 'flex';
			this.player4role = 'flex';
			this.player5role = 'flex';
			this.player6role = 'flex';
			this.player1class = 'unknown';
			this.player2class = 'unknown';
			this.player3class = 'unknown';
			this.player4class = 'unknown';
			this.player5class = 'unknown';
			this.player6class = 'unknown';
			this.rosterActive = 'blue';

			rosterActive.on('change', newVal => {
				this.rosterActive = newVal;
			});
			scores.on('change', newVal => {
				if (!newVal) {
					return;
				}
				this.blueTeamName = newVal.blu.tag;
				this.redTeamName = newVal.red.tag;
				if (newVal.blu.tag === '') {
					this.blueTeamName = 'Team 1';
				}
				if (newVal.red.tag === '') {
					this.redTeamName = 'Team 2';
				}
			});
			blueRoster.on('change', newVal => {
				this.blueRoster = newVal;
				if (this.rosterActive === 'blue') {
					this.setAndFitText(this.shadowRoot.querySelector('.team-name p'), this.blueTeamName, MAX_PLAYER_NAME_WIDTH);
					this.setAndFitText(this.shadowRoot.querySelector('.player1 .player-name'), this.blueRoster.player1.name, MAX_PLAYER_NAME_WIDTH);
					this.setAndFitText(this.shadowRoot.querySelector('.player2 .player-name'), this.blueRoster.player2.name, MAX_PLAYER_NAME_WIDTH);
					this.setAndFitText(this.shadowRoot.querySelector('.player3 .player-name'), this.blueRoster.player3.name, MAX_PLAYER_NAME_WIDTH);
					this.setAndFitText(this.shadowRoot.querySelector('.player4 .player-name'), this.blueRoster.player4.name, MAX_PLAYER_NAME_WIDTH);
					this.setAndFitText(this.shadowRoot.querySelector('.player5 .player-name'), this.blueRoster.player5.name, MAX_PLAYER_NAME_WIDTH);
					this.setAndFitText(this.shadowRoot.querySelector('.player6 .player-name'), this.blueRoster.player6.name, MAX_PLAYER_NAME_WIDTH);
					this.player1class = this.blueRoster.player1.class;
					this.player2class = this.blueRoster.player2.class;
					this.player3class = this.blueRoster.player3.class;
					this.player4class = this.blueRoster.player4.class;
					this.player5class = this.blueRoster.player5.class;
					this.player6class = this.blueRoster.player6.class;
					this.player1role = this.blueRoster.player1.role;
					this.player2role = this.blueRoster.player2.role;
					this.player3role = this.blueRoster.player3.role;
					this.player4role = this.blueRoster.player4.role;
					this.player5role = this.blueRoster.player5.role;
					this.player6role = this.blueRoster.player6.role;
				}
			});
			redRoster.on('change', newVal => {
				this.redRoster = newVal;
				if (this.rosterActive === 'red') {
					this.setAndFitText(this.shadowRoot.querySelector('.team-name p'), this.redTeamName, MAX_PLAYER_NAME_WIDTH);
					this.setAndFitText(this.shadowRoot.querySelector('.player1 .player-name'), this.redRoster.player1.name, MAX_PLAYER_NAME_WIDTH);
					this.setAndFitText(this.shadowRoot.querySelector('.player2 .player-name'), this.redRoster.player2.name, MAX_PLAYER_NAME_WIDTH);
					this.setAndFitText(this.shadowRoot.querySelector('.player3 .player-name'), this.redRoster.player3.name, MAX_PLAYER_NAME_WIDTH);
					this.setAndFitText(this.shadowRoot.querySelector('.player4 .player-name'), this.redRoster.player4.name, MAX_PLAYER_NAME_WIDTH);
					this.setAndFitText(this.shadowRoot.querySelector('.player5 .player-name'), this.redRoster.player5.name, MAX_PLAYER_NAME_WIDTH);
					this.setAndFitText(this.shadowRoot.querySelector('.player6 .player-name'), this.redRoster.player6.name, MAX_PLAYER_NAME_WIDTH);
					this.player1class = this.redRoster.player1.class;
					this.player2class = this.redRoster.player2.class;
					this.player3class = this.redRoster.player3.class;
					this.player4class = this.redRoster.player4.class;
					this.player5class = this.redRoster.player5.class;
					this.player6class = this.redRoster.player6.class;
					this.player1role = this.redRoster.player1.role;
					this.player2role = this.redRoster.player2.role;
					this.player3role = this.redRoster.player3.role;
					this.player4role = this.redRoster.player4.role;
					this.player5role = this.redRoster.player5.role;
					this.player6role = this.redRoster.player6.role;
				}
			});

			rosterVisible.on('change', newVal => {
				this.visible = newVal;
			});
		}

		_visibleChanged(newVal, oldVal) {
			if ((oldVal === null) && this.initialized) {
				return;
			}
			const portraitBoxPlayer6 = Array.from(this.shadowRoot.querySelectorAll('.player6 .class-portrait-box'));
			const portraitRosterPlayer6 = Array.from(this.shadowRoot.querySelectorAll('.player6 .class-portrait-roster'));
			const portraitBoxPlayer5 = Array.from(this.shadowRoot.querySelectorAll('.player5 .class-portrait-box'));
			const portraitRosterPlayer5 = Array.from(this.shadowRoot.querySelectorAll('.player5 .class-portrait-roster'));
			const portraitBoxPlayer4 = Array.from(this.shadowRoot.querySelectorAll('.player4 .class-portrait-box'));
			const portraitRosterPlayer4 = Array.from(this.shadowRoot.querySelectorAll('.player4 .class-portrait-roster'));
			const portraitBoxPlayer3 = Array.from(this.shadowRoot.querySelectorAll('.player3 .class-portrait-box'));
			const portraitRosterPlayer3 = Array.from(this.shadowRoot.querySelectorAll('.player3 .class-portrait-roster'));
			const portraitBoxPlayer2 = Array.from(this.shadowRoot.querySelectorAll('.player2 .class-portrait-box'));
			const portraitRosterPlayer2 = Array.from(this.shadowRoot.querySelectorAll('.player2 .class-portrait-roster'));
			const portraitBoxPlayer1 = Array.from(this.shadowRoot.querySelectorAll('.player1 .class-portrait-box'));
			const portraitRosterPlayer1 = Array.from(this.shadowRoot.querySelectorAll('.player1 .class-portrait-roster'));

			const namePlayer6 = Array.from(this.shadowRoot.querySelectorAll('.player6 .player-name'));
			const rolePlayer6 = Array.from(this.shadowRoot.querySelectorAll('.player6 .player-role .role-image'));
			const portraitPlayer6 = Array.from(this.shadowRoot.querySelectorAll('.player6 .class-portrait-image'));

			const namePlayer5 = Array.from(this.shadowRoot.querySelectorAll('.player5 .player-name'));
			const rolePlayer5 = Array.from(this.shadowRoot.querySelectorAll('.player5 .player-role .role-image'));
			const portraitPlayer5 = Array.from(this.shadowRoot.querySelectorAll('.player5 .class-portrait-image'));

			const namePlayer4 = Array.from(this.shadowRoot.querySelectorAll('.player4 .player-name'));
			const rolePlayer4 = Array.from(this.shadowRoot.querySelectorAll('.player4 .player-role .role-image'));
			const portraitPlayer4 = Array.from(this.shadowRoot.querySelectorAll('.player4 .class-portrait-image'));

			const namePlayer3 = Array.from(this.shadowRoot.querySelectorAll('.player3 .player-name'));
			const rolePlayer3 = Array.from(this.shadowRoot.querySelectorAll('.player3 .player-role .role-image'));
			const portraitPlayer3 = Array.from(this.shadowRoot.querySelectorAll('.player3 .class-portrait-image'));

			const namePlayer2 = Array.from(this.shadowRoot.querySelectorAll('.player2 .player-name'));
			const rolePlayer2 = Array.from(this.shadowRoot.querySelectorAll('.player2 .player-role .role-image'));
			const portraitPlayer2 = Array.from(this.shadowRoot.querySelectorAll('.player2 .class-portrait-image'));

			const namePlayer1 = Array.from(this.shadowRoot.querySelectorAll('.player1 .player-name'));
			const rolePlayer1 = Array.from(this.shadowRoot.querySelectorAll('.player1 .player-role .role-image'));
			const portraitPlayer1 = Array.from(this.shadowRoot.querySelectorAll('.player1 .class-portrait-image'));

			const teamNameBar = Array.from(this.shadowRoot.querySelectorAll('.team-name'));
			const teamNameImage = Array.from(this.shadowRoot.querySelectorAll('.team-name-image'));
			const teamName = Array.from(this.shadowRoot.querySelectorAll('.team-name p'));

			this.initialized = true;

			if (!oldVal && newVal) {
				this.timeline.fromTo(portraitBoxPlayer6, 0.2, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0);
				this.timeline.fromTo(portraitRosterPlayer6, 0.1, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.2);

				this.timeline.fromTo(namePlayer6, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.3);
				this.timeline.fromTo(rolePlayer6, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.3);
				this.timeline.fromTo(portraitPlayer6, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.3);

				this.timeline.fromTo(portraitBoxPlayer5, 0.2, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.2);
				this.timeline.fromTo(portraitRosterPlayer5, 0.1, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.4);

				this.timeline.fromTo(namePlayer5, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.5);
				this.timeline.fromTo(rolePlayer5, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.5);
				this.timeline.fromTo(portraitPlayer5, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.5);

				this.timeline.fromTo(portraitBoxPlayer4, 0.2, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.4);
				this.timeline.fromTo(portraitRosterPlayer4, 0.1, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.6);

				this.timeline.fromTo(namePlayer4, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.7);
				this.timeline.fromTo(rolePlayer4, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.7);
				this.timeline.fromTo(portraitPlayer4, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.7);

				this.timeline.fromTo(portraitBoxPlayer3, 0.2, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.6);
				this.timeline.fromTo(portraitRosterPlayer3, 0.1, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.8);

				this.timeline.fromTo(namePlayer3, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.9);
				this.timeline.fromTo(rolePlayer3, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.9);
				this.timeline.fromTo(portraitPlayer3, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.9);
				this.timeline.fromTo(portraitBoxPlayer2, 0.2, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.8);
				this.timeline.fromTo(portraitRosterPlayer2, 0.1, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1.0);

				this.timeline.fromTo(namePlayer2, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1.1);
				this.timeline.fromTo(rolePlayer2, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1.1);
				this.timeline.fromTo(portraitPlayer2, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1.1);
				this.timeline.fromTo(portraitBoxPlayer1, 0.2, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1.0);
				this.timeline.fromTo(portraitRosterPlayer1, 0.1, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1.2);

				this.timeline.fromTo(namePlayer1, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1.3);
				this.timeline.fromTo(rolePlayer1, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1.3);
				this.timeline.fromTo(portraitPlayer1, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1.3);
				this.timeline.fromTo(teamNameBar, 0.2, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1.2);
				this.timeline.fromTo(teamNameImage, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1.2);
				this.timeline.fromTo(teamName, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1.2);
			} else if (oldVal && !newVal) {
				this.timeline.fromTo(namePlayer1, 0, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(rolePlayer1, 0, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(portraitPlayer1, 0, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);

				this.timeline.fromTo(portraitBoxPlayer1, 0.2, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(portraitRosterPlayer1, 0.2, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				//
				this.timeline.fromTo(namePlayer2, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(rolePlayer2, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(portraitPlayer2, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);

				this.timeline.fromTo(portraitBoxPlayer2, 0.3, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(portraitRosterPlayer2, 0.3, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);

				//
				this.timeline.fromTo(namePlayer3, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(rolePlayer3, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(portraitPlayer3, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);

				this.timeline.fromTo(portraitBoxPlayer3, 0.4, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(portraitRosterPlayer3, 0.4, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				//
				this.timeline.fromTo(namePlayer4, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(rolePlayer4, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(portraitPlayer4, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);

				this.timeline.fromTo(portraitBoxPlayer4, 0.5, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(portraitRosterPlayer4, 0.5, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				//
				this.timeline.fromTo(namePlayer5, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(rolePlayer5, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(portraitPlayer5, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);

				this.timeline.fromTo(portraitBoxPlayer5, 0.6, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(portraitRosterPlayer5, 0.6, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				//
				this.timeline.fromTo(namePlayer6, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(rolePlayer6, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(portraitPlayer6, 0.1, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);

				this.timeline.fromTo(portraitBoxPlayer6, 0.7, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(portraitRosterPlayer6, 0.7, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(teamNameBar, 0.2, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(teamNameImage, 0.5, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
				this.timeline.fromTo(teamName, 0.5, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.1);
			}
		}
		_rosterChange(newVal) {
			this.rosterActive = newVal;
		}

		setAndFitText(node, newString, maxWidth) {
			node.innerText = newString;
			const clientWidth = node.scrollWidth;
			if (clientWidth > maxWidth) {
				TweenLite.set(node, {scaleX: maxWidth / clientWidth});
			} else {
				TweenLite.set(node, {scaleX: 1});
			}
		}
	}

	customElements.define(InsightRoster.is, InsightRoster);
})();
