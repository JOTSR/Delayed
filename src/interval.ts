import type { Callback, ms } from '../types.ts'
import { sleep } from '../mod.ts'

/**
 * Return an asynchronous generator that yield indefinitely the callback at least after the specified delay
 * 
 * @example
 * ```ts
 * for await (const result of interval(fetch, 60_000, {}, 'https://api.example.com')) {
 *     console.log(result)
 * }
 * //log some api result every minutes
 * 
 * const idRef = [1] //Use array to keep reference of the variable
 * function fetchUser([id]: number) {
 *     return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
 * }
 * for await (const response of interval(fetchUser, 500, {}, idRef)) {
 *     if (!response.ok) break
 *     const user = await response.json()
 *     console.log(user, idRef[0]++)
 * }
 * //print one of all 10 users every 500ms until get 404
 * const ac = new AbortController()
 * let index = 0
 * for await (const user of interval(getUser, 500, ac, index++)) {
 *     user.delete()
 * }
 * //ac called elsewhere, eg: callback
 * ac.abort()
 * //abort interval before deleting all users
 * ```
 * @param callback - The function to be called after the delay.
 * @param {number} delay - The amount of time to wait before calling the callback.
 * @param {{signal: AbortSignal}=} { signal } - Optional abort controller signal to stop interval.
 * @param {unknown[]} args - The arguments for the callback
 * @returns A promise that resolves to the value returned by the callback.
 */
export async function* interval<TArgs extends unknown[], TYield = unknown>(callback: Callback<TArgs, TYield>, delay: ms, { signal }: { signal?: AbortSignal } = {}, ...args: TArgs): AsyncGenerator<TYield, void, void> {
    while (!signal?.aborted ?? true) {
        await sleep(delay)
        yield callback(...args)
    }
}