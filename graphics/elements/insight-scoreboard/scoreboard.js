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
				_visible: {
					type: Boolean,
					value: false
				}
			};
		}

		ready() {
			super.ready();
			this.timeline = new TimelineLite({autoRemoveChildren: true});
			scores.on('change', newVal => {
				if (!newVal) {
					return;
				}
				this.blueTeamName = newVal.blu.tag;
				this.redTeamName = newVal.red.tag;
				this.blueTeamScore = newVal.blu.score;
				this.redTeamScore = newVal.red.score;
			});
			NodeCG.waitForReplicants(scores).then(() => {
				console.log('scores are ready to use');
				scoreboardVisible.on('change', newVal => {
					if (newVal) {
						this.show();
					} else {
						this.hide();
					}
				});
			});
		}

		_blueTeamNameChanged(newVal, oldVal) {
			const blueName = this.shadowRoot.querySelector('#blue-name');
			this.timeline.to(blueName, 0.2, {
				text: newVal
			});
		}
		_redTeamNameChanged(newVal) {
			const redName = this.shadowRoot.querySelector('#red-name');
			this.timeline.to(redName, 0.2, {
				text: newVal
			});
		}
		_enableAttackDefend(newVal) {
			if (this.visible) {
				console.log('what', newVal)
				const adBlue = this.shadowRoot.querySelector('.attack-defend-blue');
				const adRed = this.shadowRoot.querySelector('.attack-defend-red');
				const tabs = Array.from(this.shadowRoot.querySelectorAll('.tab'));

				if (newVal === false) {
					this.timeline.to(adBlue, 0.1, {
						className: '-=visible'
					});
					this.timeline.to(adRed, 0.1, {
						className: '-=visible'
					});
					this.timeline.to(tabs, 0.2, {
						className: '-=visible'
					}, 0.2);
				} else {
					this.timeline.to(adBlue, 0.3, {
						className: '+=visible'
					}, 0.5);
					this.timeline.to(adRed, 0.3, {
						className: '+=visible'
					}, 0.5);
					this.timeline.to(tabs, 0.1, {
						className: '+=visible'
					}, 0);
				}
			}
		}
		_statusChange(newVal) {
			const adBlue = this.shadowRoot.querySelector('.attack-defend-blue');
			const adRed = this.shadowRoot.querySelector('.attack-defend-red');
			if (this.attackDefend === 'red') {
				this.timeline.set(adBlue, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/shield.png)'
				});
				this.timeline.set(adRed, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/swords.png)'
				});
			} else {
				this.timeline.set(adRed, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/shield.png)'
				});
				this.timeline.set(adBlue, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/swords.png)'
				});
			}
		}

		show() {
			if (this._visible) {
				return;
			}
			this._visible = true;

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
			const tabs = Array.from(this.shadowRoot.querySelectorAll('.tab'));

			if (this.attackDefend === 'red') {
				this.timeline.set(adBlue, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/shield.png)'
				});
				this.timeline.set(adRed, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/swords.png)'
				});
			} else {
				this.timeline.set(adRed, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/shield.png)'
				});
				this.timeline.set(adBlue, {
					backgroundImage: 'url(./elements/insight-scoreboard/img/swords.png)'
				});
			}
			nodecg.playSound('scoreboard-in');
			this.timeline.add('start');
			this.timeline.to(lines, 0.5, {
				className: '+=visible'
			}, 'start');
			this.timeline.to(bars, 0.5, {
				className: '+=visible'
			}, 'start+=0.5');
			this.timeline.to(glows, 0.5, {
				className: '-=visible'
			}, {
				className: '+=visible'
			}, 'start+=0.6');
			this.timeline.to(logos, 0.5, {
				opacity: 1
			}, 'start+=1');
			this.timeline.to(names, 1, {
				className: '+=visible'
			}, 'start+=1');
			//	ease: SteppedEase.easeIn
			if (this.blueTeamName === null) {
				this.blueTeamName = 'Team A';
			}
			console.log(this.blueTeamName)
			this.timeline.fromTo(blueName, 1, {
				text: '',
				immediateRender:false
			}, {
				text: this.blueTeamName,
				ease: SteppedEase.config(20)
			}, 'start+=1');

			if (this.redTeamName === null) {
				this.redTeamName = 'Team B';
			}
			this.timeline.fromTo(redName, 1, {
				text: '',
				immediateRender:false
			}, {
				text: this.redTeamName,
				ease: SteppedEase.config(20)
			}, 'start+=1');
			this.timeline.to(scores, 0.2, {
				className: '+=visible'
			}, 'start+=2');

			if (this.scoreboardMode === true) {
				this.timeline.to(tabs, 0.4, {
					className: '+=visible'
				}, 'start+=0.45');
				this.timeline.to(adBlue, 1, {
					className: '+=visible'
				}, 'start+=2');
				this.timeline.to(adRed, 1,  {
					className: '+=visible'
				}, 'start+=2');
			}
		}
		hide() {
			if (!this._visible) {
				return;
			}
			this._visible = false;
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

			const tabs = Array.from(this.shadowRoot.querySelectorAll('.tab'));
			this.timeline.add('start');

			nodecg.playSound('scoreboard-out');
			this.timeline.to(scores, 0.2, {className: '-=visible'
			}, 'start');
			this.timeline.to(names, 0.5, {
				className: '-=visible'
			}, 'start+=0.2');
			if (this.blueTeamName === null) {
				this.blueTeamName = '';
			}
			this.timeline.to(blueName, 0.5, {
				text: ''
			}, 'start+=0.2');
			if (this.redTeamName === null) {
				this.redTeamName = '';
			}
			this.timeline.to(redName, 0.5, {
				text: ''
			}, 'start+=0.2');
			this.timeline.to(logos, 0.2, {
				opacity: 0
			}, 'start+=0.7');
			this.timeline.to(bars, 0.2, {
				className: '-=visible'
			}, 'start+=0.8');
			this.timeline.to(glows, 0.2, {
				className: '-=visible'
			}, 'start+=1');
			this.timeline.to(lines, 0.5, {
				className: '-=visible'
			}, 'start+=1.1');
			this.timeline.to(tabs, 0.2, {
				className: '-=visible'
			}, 'start+=0.9');
			this.timeline.set(adBlue, {
				className: '-=visible',
			}, 'start');
			this.timeline.set(adRed, {
				className: '-=visible',
			}, 'start');
		}
	}

	customElements.define(InsightScoreboard.is, InsightScoreboard);
})();
