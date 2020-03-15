Vue.component('productDetails',{
	props: {
		details: {
			type: Array,
			required: true
		}
	},
	template: `
		<ul>
			<li v-for="detail in details">{{ detail }}</li>
		</ul>
	`
})
Vue.component('product', {
	props: {
		premium: {
			type: Boolean,
			required: true
		}
	},
	template: `
		<div class="product">
			<div class="product-image">
				<img :src="image" />
			</div>

			<div class="product-info">
				<h1>{{ title }}</h1>
				<p>{{ description }}</p>
				<p v-if="inventory > 10">In stock</p>
				<p v-else-if="inventory <= 10 && inventory > 0">Almost out of stock</p>
				<p v-else
					:class="{ outOfStock:inventory <= 0 }">Out of stock</p>
				<p>Shipping: {{ shipping }} </p>
				<a :href="url">More info</a>
				<span v-show="onSale">On Sale ! </span>
				<productDetails :details="details"></productDetails>

				<div v-for="(variant, index) in variants"
					:key="variant.variantId"
					class="color-box"
					:style="{ backgroundColor: variant.variantColor }"
					@mouseover="updateProduct(index)">
				</div>

				<h2>Sizes</h2>
				<ul>
					<li v-for="size in sizes">
						{{ size }}
					</li>
				</ul>

			</div>
			<button 
				v-on:click="addToCart"
				:disabled="!inStock"
				:class="{ disabledButton: !inStock }"
				>Add to Cart</button>
			<div class="cart">
				<p>Cart ({{ cart }})</p>
			</div>
			<button v-on:click="removeFromCart">Remove</button>
		</div>
	`,
	data() {
		return {
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
			],
			cart: 0
		}
	},
	methods: {
		addToCart() {
			this.cart +=1
		},
		updateProduct(index) {
			this.selectedVariant = index
		},
		removeFromCart() {
			if (this.cart > 0)
				this.cart -= 1
		}
	},
	computed: {
		title() {
			return this.brand + ' ' + this.name
		},
		image () {
			return this.variants[this.selectedVariant].variantImage
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity
		},
		onSale() {
			return this.variants[this.selectedVariant].variantOnSale
		},
		shipping() {
			if (this.premium) {
				return "Free"
			}
			return 2.99
		}
	}
})
var app = new Vue({
	el: '#app',
	data: {
		premium: false
	}
})