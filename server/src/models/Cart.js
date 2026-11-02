import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    subtotal: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Method to calculate totals
cartSchema.methods.calculateTotals = function () {
  this.subtotal = parseFloat(
    this.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );
  // Free shipping over ₹499, else ₹99
  this.shipping = this.subtotal > 499 || this.items.length === 0 ? 0 : 99;
  this.total = parseFloat((this.subtotal - this.discount + this.shipping).toFixed(2));
  return this;
};

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;

