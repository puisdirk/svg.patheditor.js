import { Path, extend } from '@svgdotjs/svg.js'
import { PathSelectHandler } from './PathSelectHandler'
import { PathManipulator } from './PathManipulator'

const getSelectFn = (handleClass) => {
  return function (enabled = true, options = {}) {
    if (typeof enabled === 'object') {
      options = enabled
      enabled = true
    }

    let selectHandler = this.remember('_' + handleClass.name)

    // TODO: not sure if we need to allow passing an own implementation of the handlers for our plugin
    if (!selectHandler) {
      if (enabled.prototype instanceof PathSelectHandler || enabled.prototype instanceof PathManipulator) {
        selectHandler = new enabled(this)
        enabled = true
      } else {
        selectHandler = new handleClass(this)
      }

      this.remember('_' + handleClass.name, selectHandler)
    }

    selectHandler.active(enabled, options)

    return this
  }
}

extend(Path, {
  showControls: getSelectFn(PathSelectHandler), // Corresponds to pointSelect in svg.select.js but I don't want to steal that name
  manipulate: getSelectFn(PathManipulator),
})

export { PathSelectHandler, PathManipulator }
