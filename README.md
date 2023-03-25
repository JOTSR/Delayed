# Delayed

[![Tags](https://img.shields.io/github/v/release/JOTSR/Delayed)](https://github.com/JOTSR/Delayed/releases)
[![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/delayed/mod.ts)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Delayed is a simple module that provide an asynchronous approach to interval,
delay and timeout.

## Usage

All modules are exposed in `mod.ts`

See documentation
[here](https://doc.deno.land/https://deno.land/x/delayed/mod.ts).

## Examples

```ts
import * as Delayed from 'https://deno.land/x/delayed/mod.ts'

await Delay.sleep(500) //sleep 500ms
Delay.sleepSync(500) //synchronous sleep of 500ms
```

Asynchronous interval and timeout

```ts
import { interval, timeout } from 'https://deno.land/x/delayed/mod.ts'

/**
 * Timeout
 */
const { status } = await timeout(() => fetch('https://deno.land'), 500) //wait 500ms and then status === 200

/**
 * Interval
 */
const idRef = [1]

function fetchUser([id]: number) {
	return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
}

for await (const response of interval(fetchUser, 500, {}, idRef)) {
	if (!response.ok) break
	const user = await response.json()
	console.log(user, idRef[0]++)
}

//print one of all 10 users every 500ms until get 404
```

Support abort signals

```ts
const ac = new AbortController()
await sleep(1_000_000, ac)
//ac called elsewhere, eg: callback
ac.abort()
//abort sleep before long sleep
```
