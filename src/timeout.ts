import type { Callback, ms } from '../types.ts'

/**
 * Execute the callback at least after the specified delay
 * 
 * @example
 * ```ts
 * const { status } = await timeout(() => fetch('https://deno.land'), 500)
 * //wait 500ms and then status === 200
 * timeout(console.log, 1000, 'delayed', 1000, 's')
 * //print the message "delayed 1000 s" after 1s 
 * ```
 * @param callback - The function to be called after the delay.
 * @param {number} delay - The amount of time in milliseconds to wait before calling the callback.
 * @param {unknown[]} args - The arguments of the callback
 * @returns A promise that resolves to the value returned by the callback.
 */
export async function timeout<TArgs extends unknown[], TReturn = unknown>(callback: Callback<TArgs, TReturn>, delay: ms, ...args: TArgs): Promise<TReturn> {
    await new Promise(resolve => setTimeout(resolve, delay))
    return callback(...args)
}