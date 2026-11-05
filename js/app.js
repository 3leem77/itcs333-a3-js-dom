(function () {
  'use strict';

  var form = document.getElementById('todo-form');
  var input = document.getElementById('todo-input');
  var errorMsg = document.getElementById('error-msg');
  var list = document.getElementById('todo-list');
  var counter = document.getElementById('counter');
  var filterBox = document.querySelector('.filters');
  var currentFilter = 'all';

  var FILTER_IDS = {
    'filter-all': 'all',
    'filter-active': 'active',
    'filter-done': 'done'
  };

  function refresh() {
    var left = 0;
    var kids = list.children;
    for (var i = 0; i < kids.length; i++) {
      var li = kids[i];
      var done = li.classList.contains('completed');
      if (!done) {
        left++;
      }
      var show = currentFilter === 'all' ||
                 (currentFilter === 'active' && !done) ||
                 (currentFilter === 'done' && done);
      li.style.display = show ? '' : 'none';
    }
    counter.textContent = left + ' item(s) left';
  }

  function addItem(text) {
    var li = document.createElement('li');

    var span = document.createElement('span');
    span.className = 'item-text';
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
    if (!li || li.parentNode !== list) {
      return;
    }
    if (e.target.closest('.delete-btn')) {
      list.removeChild(li);
    } else {
      li.classList.toggle('completed');
    }
    refresh();
  });

  filterBox.addEventListener('click', function (e) {
    var name = FILTER_IDS[e.target.id];
    if (name) {
      currentFilter = name;
      refresh();
    }
  });

  refresh();
})();
