const EXPANDED_BUTTON_TEXT = 'Open Menu';
const COLLAPSED_BUTTON_TEXT = 'Close Menu';

const menuButton = document.getElementById('menu-button');
const menuButtonText = menuButton.querySelector('.sr-only');
const top = '.burger .burger__line--top';
const middle = '.burger .burger__line--middle';
const bottom = '.burger .burger__line--bottom';

const tl = gsap
	.timeline({ paused: true })
	.to(top, { top: '50%', yPercent: -50 })
	.to(bottom, { top: '50%', yPercent: -50 }, '<')
	.to(middle, { scale: 0 })
	.to(top, { rotate: 45 }, '<')
	.to(bottom, { rotate: -45 }, '<');

export default {
	toggleMenu() {
		const menu = document.getElementById('menu');
		menu.classList.toggle('_active');
	},
	expandMenuButton() {
		menuButtonText.innerHTML = EXPANDED_BUTTON_TEXT;
		tl.reverse();
	},
	collapseMenuButton() {
		menuButtonText.innerHTML = COLLAPSED_BUTTON_TEXT;
		tl.play();
	},
	toggleMenuButton() {
		const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
		menuButton.setAttribute('aria-expanded', !isExpanded);
		!isExpanded ? this.collapseMenuButton() : this.expandMenuButton();
	},
	handleButtonClick() {
		this.toggleMenu();
		this.toggleMenuButton();
	},
	init() {
		menuButton.addEventListener('click', this.handleButtonClick.bind(this));
	},
};
