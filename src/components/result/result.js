const utils = require('../../assets/js/utils/utils').default;

const result = document.querySelector('[data-target="result"]');
const subtotalElement = result.querySelector('[data-target="subtotal"]');
const taxElement = result.querySelector('[data-target="tax"]');
const shippingElement = result.querySelector('[data-target="shipping"]');
const totalElement = result.querySelector('[data-target="total"]');

const TAX = utils.convertToNumber(taxElement.innerHTML);
const SHIPPING = utils.convertToNumber(shippingElement.innerHTML);

export default {
	updateUi({ detail: { amount, operator } }) {
		const subtotal = utils.convertToNumber(subtotalElement.innerHTML);
		if (operator === '+') {
			subtotalElement.innerHTML = utils.formatNumber(subtotal + amount);
			totalElement.innerHTML = utils.formatNumber(TAX + SHIPPING + subtotal + amount);
		} else {
			subtotalElement.innerHTML = utils.formatNumber(subtotal - amount);
			if (subtotal - amount === 0) {
				totalElement.innerHTML = 0;
			} else {
				totalElement.innerHTML = utils.formatNumber(TAX + SHIPPING + subtotal - amount);
			}
		}
	},
	init() {
		result.addEventListener('price-change', this.updateUi);
	},
};
