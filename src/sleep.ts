import type { ms } from '../types.ts'

/**
 * Asynchronous sleep during the specified delay.
 * @example
 * ```ts
 * await sleep(500)
 * //wait 500ms
 * const ac = new AbortController()
 * await sleep(1_000_000, ac)
 * //ac called elsewhere, eg: callback
 * ac.abort()
 * //abort sleep before long sleep
 * ```
 * @param {number} delay - The amount of time to wait in milliseconds.
 * @param {{signal: AbortSignal}=} { signal } - Optional abort controller signal to stop sleeping.
 */
export function sleep(delay: ms, { signal }: { signal?: AbortSignal } = {}): Promise<void> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(resolve, delay)

        signal?.addEventListener('abort', () => {
            clearTimeout(timer)
            reject(signal.reason)
        }, {
            once: true
        })
    })
}

/**
 * Synchronous sleep during the specified delay.
 * @example
 * ```ts
 * sleepSync(200)
 * //wait 200ms
 * ```
 * @param {number} delay - The amount of time to sleep in milliseconds.
 */
export function sleepSync(delay: ms): void {
    const end = Date.now() + delay
    while (Date.now() < end);
}