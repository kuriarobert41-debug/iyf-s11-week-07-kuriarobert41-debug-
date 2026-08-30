// state.js - centralized state with persistence and simple observer
import { load, save } from './storage.js';
import { generateId } from './utils.js';

const STORAGE_KEY = 'appState';

const defaultState = {
  todos: [],
  filter: 'all',
  products: [
    { id: 1, name: 'Laptop', price: 99900 },
    { id: 2, name: 'Phone', price: 69900 },
    { id: 3, name: 'Headphones', price: 19900 }
  ],
  cart: [] // { productId, quantity }
};

let state = Object.assign({}, defaultState, load(STORAGE_KEY, {}));
const listeners = new Set();

function notify() {
  listeners.forEach(l => l(state));
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getState() {
  return state;
}

function persist() {
  save(STORAGE_KEY, state);
}

// Todo operations
export function addTodo(text) {
  if (!text || !text.trim()) return;
  const todo = { id: generateId(), text: text.trim(), completed: false, createdAt: new Date().toISOString() };
  state = { ...state, todos: [...state.todos, todo] };
  persist();
  notify();
}

export function toggleTodo(id) {
  state = { ...state, todos: state.todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)) };
  persist();
  notify();
}

export function deleteTodo(id) {
  state = { ...state, todos: state.todos.filter(t => t.id !== id) };
  persist();
  notify();
}

export function setFilter(filter) {
  state = { ...state, filter };
  persist();
  notify();
}

// Cart operations
export function addToCart(productId) {
  const existing = state.cart.find(i => i.productId === productId);
  if (existing) {
    state = { ...state, cart: state.cart.map(i => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i)) };
  } else {
    state = { ...state, cart: [...state.cart, { productId, quantity: 1 }] };
  }
  persist();
  notify();
}

export function updateQuantity(productId, quantity) {
  if (quantity <= 0) {
    state = { ...state, cart: state.cart.filter(i => i.productId !== productId) };
  } else {
    state = { ...state, cart: state.cart.map(i => (i.productId === productId ? { ...i, quantity } : i)) };
  }
  persist();
  notify();
}

export function removeFromCart(productId) {
  state = { ...state, cart: state.cart.filter(i => i.productId !== productId) };
  persist();
  notify();
}

export function clearCart() {
  state = { ...state, cart: [] };
  persist();
  notify();
}

export function getCartTotal() {
  return state.cart.reduce((total, item) => {
    const product = state.products.find(p => p.id === item.productId);
    return total + (product.price * item.quantity);
  }, 0);
}

export function getCartCount() {
  return state.cart.reduce((c, i) => c + i.quantity, 0);
}

export function getProducts() {
  return state.products;
}

export function initState() {
  // reload state from storage in case of external changes
  state = Object.assign({}, defaultState, load(STORAGE_KEY, {}));
  notify();
}
