import type { ms } from '../types.ts'

/**
 * Asynchronous sleep during the specified delay.
 * @example
 * ```ts
 * await sleep(500)
 * //wait 500ms
 * ```
 * @param {number} delay - The amount of time to wait in milliseconds.
 */
export function sleep(delay: ms): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, delay))
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