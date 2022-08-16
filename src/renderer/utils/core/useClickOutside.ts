import { MaybeElementRef, unrefElement } from './unrefElement'
import { useEventListener } from './useEventListener'
import { ConfigurableWindow, defaultWindow } from '../_configure'

export type OnClickOutsideEvents = Pick<
  WindowEventMap,
  'click' | 'mousedown' | 'mouseup' | 'touchstart' | 'touchend' | 'pointerdown' | 'pointerup'
>
export interface OnClickOutsideOptions<E extends keyof OnClickOutsideEvents>
  extends ConfigurableWindow {
  event?: E
}

export function onClickOutside<E extends keyof OnClickOutsideEvents = 'pointerdown'>(
  target: MaybeElementRef,
  handler: (evt: OnClickOutsideEvents[E]) => void,
  options: OnClickOutsideOptions<E> = {}
) {
  const { window = defaultWindow, event = 'pointerdown' } = options

  if (!window) return

  const listener = (event: OnClickOutsideEvents[E]) => {
    const el = unrefElement(target)
    if (!el) return

    if (el === event.target || event.composedPath().includes(el)) return

    handler(event)
  }

  return useEventListener(window, event, listener, { passive: true })
}
