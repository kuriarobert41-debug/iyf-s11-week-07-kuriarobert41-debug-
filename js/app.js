// app.js - entry point
import './storage.js';
import { initState } from './state.js';
import { wireEvents } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  initState();
  wireEvents();
});
