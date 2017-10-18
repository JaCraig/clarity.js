var clickOutside = {
    onEvent: function(event) {
        event.target === this.el || this.el.contains(event.target) || clickOutside.cb && clickOutside.cb(event);
    },
    bind: function(el) {
        clickOutside.onEventBound = clickOutside.onEvent.bind({ el })
        document.addEventListener('click', clickOutside.onEventBound)
    },
    update: function(el, binding) {
        if (typeof binding.value !== 'function') {
            throw new Error('Argument must be a function')
        }
        clickOutside.cb = binding.value
    },
    unbind: function () {
        document.removeEventListener('click', clickOutside.onEventBound)
    }
};

Vue.directive('click-outside', clickOutside);