const basket = document.querySelector('[data-target="basket"]');

export default {
	updateUi() {
		const products = document.querySelectorAll('[data-target="product"]');
		const circle = basket.querySelector('.basket__circle');
		circle.innerHTML = products.length;
	},
	init() {
		basket.addEventListener('remove', this.updateUi);
	},
};
