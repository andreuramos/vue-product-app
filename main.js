var app = new Vue({
	el: '#app',
	data: {
		product: {
			brand: 'Vue Mastery',
			name: 'Socks',
			description: 'Red socks',
			url: 'socks.com',
			image: './assets/vmSocks-green.jpg',
			inventory: 100,
			onSale: true,
			details: [
				"80% cotton",
				"20% polyester",
				"Gender-neutral"
			],
			variants: [
				{
					variantId: 2234,
					variantColor: "green",
					variantImage: './assets/vmSocks-green.jpg'
				},
				{
					variantId: 2235,
					variantColor: "blue",
					variantImage: './assets/vmSocks-blue.jpg'
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
		updateProduct(variant) {
			this.product.image = variant.variantImage
		},
		removeFromCart() {
			if (this.cart > 0)
				this.cart -= 1
		}
	},
	computed: {
		title() {
			return this.product.brand + ' ' + this.product.name
		}
	}
})