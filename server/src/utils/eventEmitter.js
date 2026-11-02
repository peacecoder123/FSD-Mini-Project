import EventEmitter from 'events';

class ShopEaseEmitter extends EventEmitter {}

export const shopEvents = new ShopEaseEmitter();

// Event: User Registration
shopEvents.on('user:registered', (user) => {
  console.log(`[EVENT: user:registered] Welcome email queued for ${user.name} (${user.email}) [Role: ${user.role}]`);
});

// Event: Order Placed
shopEvents.on('order:placed', (order) => {
  console.log(`[EVENT: order:placed] Order #${order.orderNumber} successfully recorded for User ${order.user}. Total: $${order.totalPrice}`);
});

// Event: Order Status Changed
shopEvents.on('order:status_changed', ({ orderId, orderNumber, oldStatus, newStatus }) => {
  console.log(`[EVENT: order:status_changed] Order #${orderNumber} (${orderId}) transitioned from ${oldStatus} -> ${newStatus}`);
});

export default shopEvents;

