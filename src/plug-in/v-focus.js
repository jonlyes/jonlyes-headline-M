export const automaticFocusing = {
  install (Vue) {
    Vue.directive('focus', {
      inserted (el) {
        // 自动聚焦
        if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
          // 直接对标签聚焦
          el.focus()
        } else {
          setTimeout(() => {
            // 对后代容器进行聚焦
            // el.querySelector('input')?.focus() || el.querySelector('textarea')?.focus()
            const theInput = el.querySelector('input')
            const theTextarea = el.querySelector('textarea')
            theInput?.focus()
            theTextarea?.focus()
          }, 0)
        }
      },
      updated (el) {
        // 自动聚焦
        if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
          // 直接对标签聚焦
          el.focus()
        } else {
          setTimeout(() => {
            // 对后代容器进行聚焦
            // el.querySelector('input')?.focus() || el.querySelector('textarea')?.focus()
            const theInput = el.querySelector('input')
            const theTextarea = el.querySelector('textarea')
            theInput?.focus()
            theTextarea?.focus()
          }, 0)
        }
      }
    })
  }
}
