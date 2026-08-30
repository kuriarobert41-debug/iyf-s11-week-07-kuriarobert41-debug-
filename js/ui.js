// ui.js - DOM manipulation and event wiring
import { addTodo, toggleTodo, deleteTodo, setFilter, subscribe, getState, addToCart, getProducts, getCartTotal, getCartCount, updateQuantity, removeFromCart, clearCart } from './state.js';
import { formatPrice } from './utils.js';

const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');

const productsContainer = document.getElementById('products');
const cartList = document.getElementById('cart-list');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');

export function wireEvents() {
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo(todoInput.value);
    todoInput.value = '';
  });

  document.querySelectorAll('input[name="filter"]').forEach(r => {
    r.addEventListener('change', (e) => setFilter(e.target.value));
  });

  clearCartBtn.addEventListener('click', () => clearCart());
}

export function render(state) {
  renderTodos(state.todos, state.filter);
  renderProducts(state.products);
  renderCart(state);
}

function renderTodos(todos, filter) {
  todoList.innerHTML = '';
  const filtered = todos.filter(t => filter === 'all' ? true : filter === 'active' ? !t.completed : t.completed);
  if (filtered.length === 0) {
    todoList.innerHTML = '<li>No todos</li>';
    return;
  }
  filtered.forEach(t => {
    const li = document.createElement('li');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = t.completed;
    cb.addEventListener('change', () => toggleTodo(t.id));

    const span = document.createElement('span');
    span.textContent = t.text;
    if (t.completed) span.style.textDecoration = 'line-through';

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.addEventListener('click', () => deleteTodo(t.id));

    li.append(cb, span, del);
    todoList.appendChild(li);
  });
}

function renderProducts(products) {
  productsContainer.innerHTML = '';
  products.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `<strong>${p.name}</strong> - $${(p.price/100).toFixed(2)}`;
    const btn = document.createElement('button');
    btn.textContent = 'Add to Cart';
    btn.addEventListener('click', () => addToCart(p.id));
    div.appendChild(btn);
    productsContainer.appendChild(div);
  });
}

function renderCart(state) {
  cartList.innerHTML = '';
  if (state.cart.length === 0) {
    cartList.innerHTML = '<li>Cart is empty</li>';
  } else {
    state.cart.forEach(item => {
      const prod = state.products.find(p => p.id === item.productId);
      const li = document.createElement('li');
      li.innerHTML = `${prod.name} - $${(prod.price/100).toFixed(2)} x `;
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 0;
      input.value = item.quantity;
      input.addEventListener('change', (e) => updateQuantity(item.productId, Number(e.target.value)));
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => removeFromCart(item.productId));
      li.append(input, removeBtn);
      cartList.appendChild(li);
    });
  }
  cartCount.textContent = `Items: ${getCartCount()}`;
  cartTotal.textContent = `Total: $${(getCartTotal()/100).toFixed(2)}`;
}

// subscribe to state changes
subscribe((s) => render(s));
