export const imageError = {
  inserted(dom, binding) {
    dom.onerror = function() {
      dom.src = binding.value
    }
  }
}
