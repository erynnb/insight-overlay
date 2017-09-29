/* global SteppedEase */
(function () {
	'use strict';

	const scoreboardVisible = nodecg.Replicant('scoreboardVisible');
	const scores = nodecg.Replicant('scores');

	class InsightScoreboard extends Polymer.Element {
		static get is() {
			return 'insight-scoreboard';
		}
		static get properties() {
			return {
				importPath: String, // https://github.com/Polymer/polymer-linter/issues/71
				blueTeamName: {
					type: String,
					observer: '_blueTeamNameChanged'
				},
				redTeamName: {
					type: String,
					observer: '_redTeamNameChanged'
				},
				blueTeamScore: {
					type: Number,
					default: 0
				},
				redTeamScore: {
					type: Number,
					default: 0
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
						return new TimelineLite({autoRemoveChildren: true});
					}
				}
			};
		}

		ready() {
			super.ready();
			this.initialized = false;

			scores.on('change', newVal => {
				if (!newVal) {
					return;
				}
				this.blueTeamName = newVal.blu.tag;
				this.redTeamName = newVal.red.tag;
				this.blueTeamScore = newVal.blu.score;
				this.redTeamScore = newVal.red.score;
			});

			scoreboardVisible.on('change', newVal => {
				this.visible = newVal;
			});
		}

		_blueTeamNameChanged(newVal) {
			TweenLite.to(this.$['blue-name'], 0.2, {text: newVal});
		}
		_redTeamNameChanged(newVal) {
			TweenLite.to(this.$['red-name'], 0.2, {text: newVal});
		}

		_visibleChanged(newVal, oldVal) {
			if ((oldVal === null) && this.initialized) {
				return;
			}
			const lines = Array.from(this.shadowRoot.querySelectorAll('.line'));
			const bars = Array.from(this.shadowRoot.querySelectorAll('.bar'));
			const glows = Array.from(this.shadowRoot.querySelectorAll('.glow'));
			const logos = Array.from(this.shadowRoot.querySelectorAll('.logo'));
			const names = Array.from(this.shadowRoot.querySelectorAll('.name'));
			const scores = Array.from(this.shadowRoot.querySelectorAll('.score'));
			const blueName = this.shadowRoot.querySelector('#blue-name');
			const redName = this.shadowRoot.querySelector('#red-name');

			this.initialized = true;

			if (!oldVal && newVal) {
				nodecg.playSound('scoreboard-in');
				this.timeline.fromTo(lines, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0);
				this.timeline.fromTo(bars, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.5);
				this.timeline.fromTo(glows, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 0.6);
				this.timeline.fromTo(logos, 0.5, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1);
				this.timeline.fromTo(names, 1, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 1);
				//	ease: SteppedEase.easeIn
				if (this.blueTeamName === null) {
					this.blueTeamName = 'Team A';
				}
				this.timeline.fromTo(blueName, 1, {
					text: ''
				}, {
					text: this.blueTeamName,
					ease: SteppedEase.config(20)
				}, 1);

				if (this.redTeamName === null) {
					this.redTeamName = 'Team B';
				}
				this.timeline.fromTo(redName, 1, {
					text: ''
				}, {
					text: this.redTeamName,
					ease: SteppedEase.config(20)
				}, 1);
				this.timeline.fromTo(scores, 0.2, {
					className: '-=visible'
				}, {
					className: '+=visible'
				}, 2);
			} else if (oldVal && !newVal) {
				nodecg.playSound('scoreboard-out');
				this.timeline.fromTo(scores, 0.2, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0);
				this.timeline.fromTo(names, 0.5, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.2);
				if (this.blueTeamName === null) {
					this.blueTeamName = '';
				}
				this.timeline.fromTo(blueName, 0.5, {
					text: this.blueTeamName
				}, {
					text: ''
				}, 0.2);
				if (this.redTeamName === null) {
					this.redTeamName = '';
				}
				this.timeline.fromTo(redName, 0.5, {
					text: this.redTeamName
				}, {
					text: ''
				}, 0.2);
				this.timeline.fromTo(logos, 0.2, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.7);
				this.timeline.fromTo(bars, 0.2, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 0.8);
				this.timeline.fromTo(glows, 0.2, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 1);
				this.timeline.fromTo(lines, 0.5, {
					className: '+=visible'
				}, {
					className: '-=visible'
				}, 1.1);
			}
		}
	}

	customElements.define(InsightScoreboard.is, InsightScoreboard);
})();
