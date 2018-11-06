export function bem(componentName) {
  return (elementOrMods, mods) => {
    if (!elementOrMods) {
      return componentName
    }

    let element

    if (typeof elementOrMods === 'string') {
      element = elementOrMods
    } else {
      mods = elementOrMods
    }

    if (process.env.NODE_ENV !== 'production') {
      if (element && typeof element !== 'string') {
        throw new Error('You must provide `element` as string')
      }

      if (mods && typeof mods !== 'object') {
        throw new Error('You must provide `mods` as plain object')
      }
    }

    let base = componentName
    if (element) {
      base += '__' + element
    }

    return base + (
      mods
        ? Object.keys(mods).reduce((result, name) => {
          var value = mods[name]

          if (value) {
            result += ' ' + (
              typeof value === 'boolean'
                ? (base + '--' + name)
                : (base + '--' + name + '_' + value)
            )
          }

          return result
        }, '')
        : ''
    )
  }
}
