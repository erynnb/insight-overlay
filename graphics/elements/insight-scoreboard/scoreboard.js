/* global SteppedEase */
(function() {
	'use strict';

	const scores = nodecg.Replicant('scores');
	const scoreboardVisible = nodecg.Replicant('scoreboardVisible');

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
				attackDefend: {
					type: String,
					observer: '_statusChange'
				},
				scoreboardMode: {
					type: Boolean,
					observer: '_enableAttackDefend'
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

		_blueTeamNameChanged(newVal, oldVal) {
			const blueName = this.shadowRoot.querySelector('#blue-name');
			TweenLite.to(blueName, 0.2, {
				text: newVal
			});
		}
		_redTeamNameChanged(newVal) {
			const redName = this.shadowRoot.querySelector('#red-name');
			TweenLite.to(redName, 0.2, {
				text: newVal
			});
		}
		_enableAttackDefend(newVal) {
			console.log(newVal);
			if (this.visible) {
				const status = Array.from(this.shadowRoot.querySelectorAll('.attack-defend'));
				const tabs = Array.from(this.shadowRoot.querySelectorAll('.tab'));

				if (newVal === false) {
					this.timeline.to(status, 0.1, {
						className: '-=visible'
					});
					this.timeline.fromTo(tabs, 0.2, {
						className: '+=visible'
					}, {
						className: '-=visible'
					}, 0.2);
				} else {
					this.timeline.to(status, 0.3, {
						className: '+=visible'
					}, 0.5);
					this.timeline.fromTo(tabs, 0.1, {
						className: '-=visible'
					}, {
						className: '+=visible'
					}, 0);
				}
			}
		}
		_statusChange(newVal) {
			const adBlue = this.shadowRoot.querySelector('.attack-defend-blue');
			const adRed = this.shadowRoot.querySelector('.attack-defend-red');
			if (this.attackDefend === 'red') {
				TweenLite.set(adBlue, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/shield.png)'
				});
				TweenLite.set(adRed, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/swords.png)'
				});
			} else {
				TweenLite.set(adRed, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/shield.png)'
				});
				TweenLite.set(adBlue, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/swords.png)'
				});
			}
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
			const adBlue = this.shadowRoot.querySelector('.attack-defend-blue');
			const adRed = this.shadowRoot.querySelector('.attack-defend-red');
			const status = Array.from(this.shadowRoot.querySelectorAll('.attack-defend'));
			const tabs = Array.from(this.shadowRoot.querySelectorAll('.tab'));

			this.initialized = true;
			if (this.attackDefend === 'red') {
				TweenLite.set(adBlue, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/shield.png)'
				});
				TweenLite.set(adRed, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/swords.png)'
				});
			} else {
				TweenLite.set(adRed, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/shield.png)'
				});
				TweenLite.set(adBlue, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/swords.png)'
				});
			}

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

				if (this.scoreboardMode === true) {
					this.timeline.fromTo(tabs, 0.4, {
						className: '-=visible'
					}, {
						className: '+=visible'
					}, 0.45);
					this.timeline.fromTo(status, 1, {
						className: '-=visible'
					}, {
						className: '+=visible'
					}, 2.0);
				}
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
				this.timeline.to(tabs, 0.2, {
					className: '-=visible'
				}, 0.9);
				this.timeline.to(status, 0.1, {
					className: '-=visible'
				}, 0);
			}
		}
	}

	customElements.define(InsightScoreboard.is, InsightScoreboard);
})();
