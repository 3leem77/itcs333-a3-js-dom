document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var form = document.getElementById('todo-form');
  var input = document.getElementById('todo-input');
  var errorMsg = document.getElementById('error-msg');
  var list = document.getElementById('todo-list');
  var counter = document.getElementById('counter');
  var filters = {
    all: document.getElementById('filter-all'),
    active: document.getElementById('filter-active'),
    done: document.getElementById('filter-done')
  };
  var currentFilter = 'all';

  function updateCounter() {
    var left = list.querySelectorAll('li:not(.completed)').length;
    counter.textContent = left + ' item(s) left';
  }

  function applyFilter() {
    var items = list.querySelectorAll('li');
    items.forEach(function (li) {
      var done = li.classList.contains('completed');
      var show = currentFilter === 'all' ||
                 (currentFilter === 'active' && !done) ||
                 (currentFilter === 'done' && done);
      li.style.display = show ? '' : 'none';
    });
  }

  function refresh() {
    applyFilter();
    updateCounter();
  }

  function addItem(text) {
    var li = document.createElement('li');
    var span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = text;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'delete-btn';
    btn.textContent = 'Delete';
    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (text === '') {
      errorMsg.classList.remove('hidden');
      return;
    }
    errorMsg.classList.add('hidden');
    addItem(text);
    input.value = '';
    refresh();
  });

  list.addEventListener('click', function (e) {
    var li = e.target.closest('li');
    if (!li || !list.contains(li)) return;
    if (e.target.closest('.delete-btn')) {
      li.remove();
    } else {
      li.classList.toggle('completed');
    }
    refresh();
  });

  Object.keys(filters).forEach(function (name) {
    filters[name].addEventListener('click', function () {
      currentFilter = name;
      refresh();
    });
  });

  refresh();
});