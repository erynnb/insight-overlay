/* global TimelineLite */
/* global nodecg */
/* global Polymer */
/* global customElements */

(function () {
	'use strict';
	const rosterActive = nodecg.Replicant('rosterActive');
	const scores = nodecg.Replicant('scores', 'insight-overlay');

	const blueRoster = nodecg.Replicant('blueRoster');
	const redRoster = nodecg.Replicant('redRoster');

	const rosterVisible = nodecg.Replicant('rosterVisible');

	const MAX_PLAYER_NAME_WIDTH = 428;

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
				initialized: {
					type: Boolean,
					value: false
				}
			};
		}

		ready() {
			super.ready();
			this.timeline = new TimelineLite({autoRemoveChildren: true});

			this.player1role = 'flex';
			this.player2role = 'flex';
			this.player3role = 'flex';
			this.player4role = 'flex';
			this.player5role = 'flex';
			this.player6role = 'flex';

			rosterActive.on('change', newVal => {
				this.rosterActive = newVal;
			});
			scores.on('change', newVal => {
				if (!newVal) {
					return;
				}
				if (newVal.blu.tag === '') {
					this.blueTeamName = 'Roster Breakdown';
				}
				this.blueTeamName = newVal.blu.tag;
				this.redTeamName = newVal.red.tag;
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
			NodeCG.waitForReplicants(rosterActive, scores, blueRoster, redRoster).then(() => {
				console.log('rosters are ready to use');
				rosterVisible.on('change', newVal => {
					this.visible = newVal;
				});
			});
		}

		_visibleChanged(newVal) {
			if (newVal) {
				this.show();
			} else {
				this.hide();
			}
		}

		show() {
			if (this.initialized) {
				return;
			}
			this.initialized = true;

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

			this.timeline.add('start');
			this.timeline.to(portraitBoxPlayer6, 0.2, {
				className: '+=visible'
			}, 'start');
			this.timeline.to(portraitRosterPlayer6, 0.1, {
				className: '+=visible'
			}, 'start+=0.1');

			this.timeline.to(namePlayer6, 0.4, {
				className: '+=visible'
			}, 'start+=0.3');
			this.timeline.to(rolePlayer6, 0.4, {
				className: '+=visible'
			}, 'start+=0.3');
			this.timeline.to(portraitPlayer6, 0.4, {
				className: '+=visible'
			}, 'start+=0.3');

			this.timeline.to(portraitBoxPlayer5, 0.2, {
				className: '+=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitRosterPlayer5, 0.1, {
				className: '+=visible'
			}, 'start+=0.2');

			this.timeline.to(namePlayer5, 0.4, {
				className: '+=visible'
			}, 'start+=0.4');
			this.timeline.to(rolePlayer5, 0.4, {
				className: '+=visible'
			}, 'start+=0.4');
			this.timeline.to(portraitPlayer5, 0.4, {
				className: '+=visible'
			}, 'start+=0.4');

			this.timeline.to(portraitBoxPlayer4, 0.2, {
				className: '+=visible'
			}, 'start+=0.2');
			this.timeline.to(portraitRosterPlayer4, 0.1, {
				className: '+=visible'
			}, 'start+=0.3');

			this.timeline.to(namePlayer4, 0.4, {
				className: '+=visible'
			}, 'start+=0.5');
			this.timeline.to(rolePlayer4, 0.4, {
				className: '+=visible'
			}, 'start+=0.5');
			this.timeline.to(portraitPlayer4, 0.4, {
				className: '+=visible'
			}, 'start+=0.5');

			this.timeline.to(portraitBoxPlayer3, 0.2, {
				className: '+=visible'
			}, 'start+=0.3');
			this.timeline.to(portraitRosterPlayer3, 0.1, {
				className: '+=visible'
			}, 'start+=0.4');

			this.timeline.to(namePlayer3, 0.4, {
				className: '+=visible'
			}, 'start+=0.6');
			this.timeline.to(rolePlayer3, 0.4, {
				className: '+=visible'
			}, 'start+=0.6');
			this.timeline.to(portraitPlayer3, 0.4, {
				className: '+=visible'
			}, 'start+=0.6');
			this.timeline.to(portraitBoxPlayer2, 0.2, {
				className: '+=visible'
			}, 'start+=0.4');
			this.timeline.to(portraitRosterPlayer2, 0.1, {
				className: '+=visible'
			}, 'start+=0.5');

			this.timeline.to(namePlayer2, 0.4, {
				className: '+=visible'
			}, 'start+=0.7');
			this.timeline.to(rolePlayer2, 0.4, {
				className: '+=visible'
			}, 'start+=0.7');
			this.timeline.to(portraitPlayer2, 0.4, {
				className: '+=visible'
			}, 'start+=0.7');
			this.timeline.to(portraitBoxPlayer1, 0.2, {
				className: '+=visible'
			}, 'start+=0.5');
			this.timeline.to(portraitRosterPlayer1, 0.1, {
				className: '+=visible'
			}, 'start+=0.6');

			this.timeline.to(namePlayer1, 0.4, {
				className: '+=visible'
			}, 'start+=0.8');
			this.timeline.to(rolePlayer1, 0.4, {
				className: '+=visible'
			}, 'start+=0.8');
			this.timeline.to(portraitPlayer1, 0.4, {
				className: '+=visible'
			}, 'start+=0.8');
			this.timeline.to(teamNameBar, 0.2, {
				className: '+=visible'
			}, 'start+=0.65');
			this.timeline.to(teamNameImage, 0.4, {
				className: '+=visible'
			}, 'start+=0.7');
			this.timeline.to(teamName, 0.4, {
				className: '+=visible'
			}, 'start+=0.7');
		}

		hide() {
			if (!this.initialized) {
				return;
			}

			this.initialized = false;

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
			this.timeline.add('start');

			this.timeline.to(namePlayer1, 0, {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(rolePlayer1, 0,  {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitPlayer1, 0,  {
				className: '-=visible'
			}, 'start+=0.1');

			this.timeline.to(portraitBoxPlayer1, 0.2,  {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitRosterPlayer1, 0.2,  {
				className: '-=visible'
			}, 'start+=0.1');

			this.timeline.to(namePlayer2, 0.1,  {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(rolePlayer2, 0.1, {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitPlayer2, 0.1,  {
				className: '-=visible'
			}, 'start+=0.1');

			this.timeline.to(portraitBoxPlayer2, 0.3,{
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitRosterPlayer2, 0.3, {
				className: '-=visible'
			}, 'start+=0.1');

			//
			this.timeline.to(namePlayer3, 0.1,{
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(rolePlayer3, 0.1,  {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitPlayer3, 0.1,  {
				className: '-=visible'
			}, 'start+=0.1');

			this.timeline.to(portraitBoxPlayer3, 0.4,  {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitRosterPlayer3, 0.4,  {
				className: '-=visible'
			}, 'start+=0.1');
			//
			this.timeline.to(namePlayer4, 0.1,  {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(rolePlayer4, 0.1,  {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitPlayer4, 0.1,  {
				className: '-=visible'
			}, 'start+=0.1');

			this.timeline.to(portraitBoxPlayer4, 0.5,  {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitRosterPlayer4, 0.5, {
				className: '-=visible'
			}, 'start+=0.1');
			//
			this.timeline.to(namePlayer5, 0.1, {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(rolePlayer5, 0.1,  {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitPlayer5, 0.1,  {
				className: '-=visible'
			}, 'start+=0.1');

			this.timeline.to(portraitBoxPlayer5, 0.6,  {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitRosterPlayer5, 0.6, {
				className: '-=visible'
			}, 'start+=0.1');
			//
			this.timeline.to(namePlayer6, 0.1, {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(rolePlayer6, 0.1, {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitPlayer6, 0.1,  {
				className: '-=visible'
			}, 'start+=0.1');

			this.timeline.to(portraitBoxPlayer6, 0.7,  {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(portraitRosterPlayer6, 0.7, {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(teamNameBar, 0.2, {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(teamNameImage, 0.5,  {
				className: '-=visible'
			}, 'start+=0.1');
			this.timeline.to(teamName, 0.5,  {
				className: '-=visible'
			}, 'start+=0.1');
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
