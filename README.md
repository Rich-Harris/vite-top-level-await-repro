# vite-top-level-await-repro

Illustration of issues around use of top-level await in Vite apps

## Top-level await doesn't work in SSR

Try `node run.js`. The expectation is that it will load `src/index.js` (which depends on `src/data.js`, which includes a top-level await) and run its exported `list_fruits` function.

Instead, we get an error:

```
3:45:57 PM [vite] Error when evaluating SSR module src/index.js:
SyntaxError: Cannot use keyword 'await' outside an async function (2:0)
    at Object.pp$5.raise (/path/to/vite-top-level-await-repro/node_modules/vite/dist/node/chunks/dep-36bf480c.js:47485:13)
```

This means that apps that use Vite for server-side rendering cannot make use of top-level await.

## esbuild options are apparently ignored

This one is probably just PEBKAC, but: I would expect `npx vite build` to build the app successfully, despite the top-level await failing ESBuild's default `safari13.1` target check, because the Vite config specifies `esbuild: false`. For whatever reason, it's not having any effect.

I encountered this while trying to figure out if there's any magic that Vite performs (or could perform) to transpile top-level awaits for environments where it's not natively supported (of which Safari 14 and below is the only one I particularly care about).
