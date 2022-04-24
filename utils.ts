function classes(...args: unknown[]) {
  return args.filter((item) => Boolean(item) && typeof item === 'string').join(' ')
}

function composeEventHandlers<E>(
  originalEventHandler?: (event: E) => void,
  ourEventHandler?: (event: E) => void,
  { checkForDefaultPrevented = true } = {},
) {
  return function handleEvent(event: E) {
    originalEventHandler?.(event)

    if (checkForDefaultPrevented === false || !(event as unknown as Event).defaultPrevented) {
      return ourEventHandler?.(event)
    }
  }
}

export { classes, composeEventHandlers }
