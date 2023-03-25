export type Callback<TArgs extends unknown[], TReturn = unknown> = (
	...args: TArgs
) => TReturn
export type ms = number
