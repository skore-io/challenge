export { default as ContentList } from '../..\\components\\ContentList.vue'
export { default as ContentPlayer } from '../..\\components\\ContentPlayer.vue'
export { default as ProgressBar } from '../..\\components\\ProgressBar.vue'
export { default as PlayersImagePlayer } from '../..\\components\\players\\ImagePlayer.vue'
export { default as PlayersLinkPlayer } from '../..\\components\\players\\LinkPlayer.vue'
export { default as PlayersPdfPlayer } from '../..\\components\\players\\PdfPlayer.vue'
export { default as PlayersTextPlayer } from '../..\\components\\players\\TextPlayer.vue'
export { default as PlayersVideoPlayer } from '../..\\components\\players\\VideoPlayer.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(
        options,
        {
          on: this.$listeners,
          attrs,
          props,
          scopedSlots: this.$scopedSlots,
        },
        this.$slots.default,
      )
    },
  }
}
