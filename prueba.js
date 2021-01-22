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
  $('#increment').on('click', actions.increment);
  $('#decrement').on('click', actions.decrement);
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
};

const dispacher = {
  emit: function (action, data) {
    Object.values(store.onAction).forEach(element => {
      element({ name: action, payload: data });
    });
  },
};

const store = {
  state: { value: 0 },
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
  },
  getState: function () {
    return Object.assign({}, this.state);
  },
  initial: function () {
    renderView(Component(this.state.value));
  },
};

store.initial();
