import type { Callback, ms } from '../types.ts'

/**
 * Execute the callback at least after the specified delay
 *
 * @example
 * ```ts
 * const { status } = await timeout(() => fetch('https://deno.land'), 500)
 * //wait 500ms and then status === 200
 * timeout(console.log, 1000, {}, 'delayed', 1000, 's')
 * //print the message "delayed 1000 s" after 1s
 * const ac = new AbortController()
 * timeout(exit, 1000, ac, 1)
 * ac.abort()
 * //abort timeout before executing "exit" with arg "1"
 * ```
 * @param callback - The function to be called after the delay.
 * @param {number} delay - The amount of time in milliseconds to wait before calling the callback.
 * @param {{signal: AbortSignal}=} { signal } - Optional abort controller signal to stop timeout.
 * @param {unknown[]} args - The arguments of the callback
 * @returns A promise that resolves to the value returned by the callback.
 */
export async function timeout<TArgs extends unknown[], TReturn = unknown>(
	callback: Callback<TArgs, TReturn>,
	delay: ms,
	{ signal }: { signal?: AbortSignal } = {},
	...args: TArgs
): Promise<TReturn> {
	await new Promise((resolve, reject) => {
		const timer = setTimeout(resolve, delay)

		signal?.addEventListener('abort', () => {
			clearTimeout(timer)
			reject(signal.reason)
		}, {
			once: true,
		})
	})
	return callback(...args)
}
