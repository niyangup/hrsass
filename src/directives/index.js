export const imageError = {
  inserted(dom, binding) {
    dom.src = dom.src || binding.value
    dom.onerror = function() {
      dom.src = binding.value
    }
  },
  componentUpdated(dom, binding) {
    dom.src = dom.src || binding.value
  }
}
