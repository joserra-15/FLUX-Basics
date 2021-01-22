const Component = state => {
  const template = `
  <p>${state}</p>
  <button id="increment">+</button>
  <button id="decrement">-</button>
  `;
  return template;
};

const renderView = (fragment, element = '#root') => {
  $(element).html(fragment);
  addEventListeners(store.getState());
};

const addEventListeners = state => {
  if (state.status === 'home') {
    $('#increment').on('click', actions.increment);
    $('#decrement').on('click', actions.decrement);
  }
};

const actions = {
  increment: function () {
    //consultar la api
    dispacher.emit('increment', {});
  },
  decrement: function () {
    //consultar la api
    dispacher.emit('decrement', {});
  },
  init: function () {
    //consultar la api
    dispacher.emit('init', {});
  },
};

const dispacher = {
  emit: function (action, data) {
    Object.values(store.onAction).forEach(element => {
      element({ name: action, payload: data });
    });
  },
};

const store = {
  state: { value: 0, status: 'home' },
  onAction: {
    incrementer: function (action) {
      if (action.name === 'increment') {
        store.state.value++;
        renderView(Component(store.state.value));
      }
    },
    decrementer: function (action) {
      if (action.name === 'decrement') {
        store.state.value--;
        renderView(Component(store.state.value));
      }
    },
    init: function (action) {
      if (action.name === 'init') renderView(Component(store.state.value));
    },
  },
  getState: function () {
    return Object.assign({}, this.state);
  },
};

actions.init();
