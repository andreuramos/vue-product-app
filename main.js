var app = new Vue({
	el: '#app',
	data: {
		product: {
			brand: 'Vue Mastery',
			name: 'Socks',
			description: 'Red socks',
			url: 'socks.com',
			selectedVariant: 0,
			inventory: 100,
			details: [
				"80% cotton",
				"20% polyester",
				"Gender-neutral"
			],
			variants: [
				{
					variantId: 2234,
					variantColor: "green",
					variantImage: './assets/vmSocks-green.jpg',
					variantQuantity: 9,
					variantOnSale: false
				},
				{
					variantId: 2235,
					variantColor: "blue",
					variantImage: './assets/vmSocks-blue.jpg',
					variantQuantity: 0,
					variantOnSale: true
				}
			],
			sizes: [
				"XS", "S", "M", "L", "XL"
			]
		},
		cart: 0
	},
	methods: {
		addToCart() {
			this.cart +=1
		},
		updateProduct(index) {
			this.product.selectedVariant = index
		},
		removeFromCart() {
			if (this.cart > 0)
				this.cart -= 1
		}
	},
	computed: {
		title() {
			return this.product.brand + ' ' + this.product.name
		},
		image () {
			return this.product.variants[this.product.selectedVariant].variantImage
		},
		inStock() {
			return this.product.variants[this.product.selectedVariant].variantQuantity
		},
		onSale() {
			return this.product.variants[this.product.selectedVariant].variantOnSale
		}
	}
})