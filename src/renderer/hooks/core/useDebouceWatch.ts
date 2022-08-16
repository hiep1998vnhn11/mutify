import { WatchSource, WatchOptions, WatchStopHandle, WatchCallback } from 'vue'
export interface DebouncedWatchOptions<Immediate> extends WatchOptions<Immediate> {
  debounce?: number
}

export function debouncedWatch<
  T extends Readonly<WatchSource<unknown>[]>,
  Immediate extends Readonly<boolean> = false
>(
  sources: T,
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: DebouncedWatchOptions<Immediate>
): WatchStopHandle
export function debouncedWatch<T, Immediate extends Readonly<boolean> = false>(
  source: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: DebouncedWatchOptions<Immediate>
): WatchStopHandle
export function debouncedWatch<T extends object, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: DebouncedWatchOptions<Immediate>
): WatchStopHandle

export default function debouncedWatch<Immediate extends Readonly<boolean> = false>(
  source: any,
  cb: any,
  options: DebouncedWatchOptions<Immediate> = {}
): WatchStopHandle {
  const { debounce = 0, ...watchOptions } = options

  return watchWithFilter(source, cb, {
    ...watchOptions,
    eventFilter: debounceFilter(debounce),
  })
}
