var app = new Vue({
	el: '#app',
	data: {
		product: {
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
					variantColor: "green"
				},
				{
					variantId: 2235,
					variantColor: "blue"
				}
			],
			sizes: [
				"XS", "S", "M", "L", "XL"
			]
		}
	}
})