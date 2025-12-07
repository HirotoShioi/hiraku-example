# hiraku Example Demos

hiraku modal examples built with React + TypeScript + Vite. Four short demos show how hiraku keeps modal flows in a single async function, returns typed values, and can be opened from anywhere (even non-React layers).

## Examples
- 01 Basic info modal — `createDialog` + `open` + `close` only
- 02 Confirm flow — delete action completed inside one async function
- 03 Edit with typed return — `.returns<User>()` updates UI with saved data
- 04 API error dialog — modal triggered from API client to handle failures

## Run locally
1. pnpm install
2. pnpm dev (opens http://localhost:5173)
