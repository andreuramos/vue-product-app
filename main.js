Vue.component('product-review', {
	template: `
	<form class="review-form" @submit.prevent="onSubmit">

	<p v-if="errors.length">
		<b>Please correct the following error(s):</b>
		<ul>
			<li v-for="error in errors">{{ error }}</li>
		</ul>
	</p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
      	<label for="recommend">Would you recommend this product?</label>
      	<input type="radio" v-model="recommend" value="yes">
      	<label for="yes">Yes</label>
      	<input type="radio" v-model="recommend" value="no">
      	<label for="no">No</label>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>
	`,
	data() {
		return {
			name: null,
			review: null,
			rating: null,
			recommend: null,
			errors: []
		}
	},
	methods: {
		onSubmit() {
			this.errors = []
			if (this.name && this.review && this.rating && this.recommend) {
				let productReview = {
					name: this.name,
					review: this.review,
					rating: this.rating,
					recommend: this.recommend
				}
				this.$emit('review-submit', productReview)
				this.name = null
				this.review = null
				this.rating = null
				this.recommend = null
			} else {
				if(!this.name) this.errors.push("Name required")
				if(!this.review) this.errors.push("Review required")
				if(!this.rating) this.errors.push("Rating required")
				if(!this.recommend) this.errors.push("Recommend required")
			}
		}
	}
})
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

			<button v-on:click="removeFromCart">Remove</button>


			<div>
				<h2>Reviews</h2>
				<p v-if="!reviews.length">There are no reviews yet.</p>
				<ul>
					<li v-for="review in reviews">
						<p>{{ review.name }}</p>
						<p>Rating: {{ review.rating }}</p>
						<p>{{ review.review }}</p>
					</li>
				</ul>

			<product-review @review-submit="addReview"></product-review>

		</div>
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
					variantQuantity: 11,
					variantOnSale: true
				}
			],
			sizes: [
				"XS", "S", "M", "L", "XL"
			],
			reviews: []
		}
	},
	methods: {
		addToCart() {
			this.$emit('add-to-cart', {
				variantId: this.variants[this.selectedVariant].variantId,
				action: 'add'
			})
		},
		updateProduct(index) {
			this.selectedVariant = index
		},
		removeFromCart() {
			this.$emit('remove-from-cart', {
				variantId: this.variants[this.selectedVariant].variantId,
				action: 'remove'
			})
		},
		addReview(productReview) {
			this.reviews.push(productReview)
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
		premium: false,
		cart:  []
	},
	methods: {
		updateCart(event) {
			if (event.action == 'add') {
				this.cart.push(event.variantId)
			} else {
				if (this.cart.indexOf(event.variantId) >= 0) {
					this.cart.splice(this.cart.indexOf(event.variantId), 1)
				}
			}
		}
	}
})