export function formatCurrency(amount) {
  return `\u20b9${Number(amount).toFixed(0)}`;
}

export function calcSubtotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calcTax(subtotal, taxRate) {
  return +(subtotal * taxRate).toFixed(2);
}

export function calcTotal(subtotal, tax) {
  return +(subtotal + tax).toFixed(2);
}
