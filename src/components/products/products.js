/* eslint-disable no-use-before-define */
const utils = require('../../assets/js/utils/utils').default;

const products = document.querySelectorAll('[data-target="product"]');
const basket = document.querySelector('[data-target="basket"]');

export default {
	handleProduct(product) {
		const priceElement = product.querySelector('[data-target="price"]');
		const amountElement = product.querySelector('[data-target="amount"]');
		const increaseElement = product.querySelector('[data-target="control-increase"]');
		const decreaseElement = product.querySelector('[data-target="control-decrease"]');
		const removeButton = product.querySelector('[data-target="remove"]');
		const result = document.querySelector('[data-target="result"]');

		const ITEM_PRICE = utils.convertToNumber(priceElement.innerHTML);

		function changePrice(operator) {
			const amountTotal = utils.convertToNumber(amountElement.innerHTML);
			const itemTotal = utils.convertToNumber(priceElement.innerHTML);

			let updatedAmount;
			let updatedPrice;

			if (operator === '+') {
				updatedAmount = amountTotal + 1;
				updatedPrice = itemTotal + ITEM_PRICE;
				dispatchPriceChange(ITEM_PRICE, operator);
			} else if (operator !== '+' && itemTotal > 0) {
				updatedAmount = amountTotal - 1;
				updatedPrice = itemTotal - ITEM_PRICE;
				dispatchPriceChange(ITEM_PRICE, operator);
			} else {
				updatedAmount = 0;
				updatedPrice = 0;
			}

			if (updatedAmount === 0) {
				decreaseElement.toggleAttribute('disabled');
			} else {
				decreaseElement.removeAttribute('disabled');
			}

			priceElement.innerHTML = utils.formatNumber(updatedPrice);
			amountElement.innerHTML = utils.formatNumber(updatedAmount);
		}

		function dispatchPriceChange(amount, operator) {
			result.dispatchEvent(
				new CustomEvent('price-change', {
					detail: { amount, operator },
				})
			);
		}
		function dispatchRemove() {
			basket.dispatchEvent(new CustomEvent('remove'));
		}
		function removeProduct() {
			const amount = utils.convertToNumber(priceElement.innerHTML);
			dispatchPriceChange(amount, '-');
			removeButton.removeEventListener('click', removeProduct);
			increaseElement.removeEventListener('click', increasePrice);
			decreaseElement.removeEventListener('click', decreasePrice);
			product.closest('li').remove();
			dispatchRemove();
			const productsList = document.querySelectorAll('[data-target="product"]');

			if (productsList.length === 0) {
				const ul = document.querySelector('[data-target="products-list"]');
				ul.innerHTML = '<li>Nothing here yet!</li>';
			}
		}

		function increasePrice() {
			return changePrice('+');
		}
		function decreasePrice() {
			return changePrice('-');
		}

		removeButton.addEventListener('click', removeProduct);
		increaseElement.addEventListener('click', increasePrice);
		decreaseElement.addEventListener('click', decreasePrice);
	},
	init() {
		for (let i = 0; i < products.length; i++) {
			const product = products[i];
			this.handleProduct(product);
		}
	},
};
