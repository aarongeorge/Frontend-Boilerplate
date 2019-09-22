# Front-end Boilerplate

A front-end boilerplate utilising: Parcel, Tailwind and Vue

## Usage
```
yarn run build (Runs `parcel build` without minify)
yarn run clean (Removes the `.cache` and `dist` folders)
yarn run serve (Runs `parcel serve`)
```

## Known issues
- Parcel 1 has [this issue](https://github.com/parcel-bundler/parcel/issues/3368) when files are identical
- PurgeCSS doesn't automatically include `a` if you're referencing an `<router-link>` component. So make sure that when using CSSPurge, you explicitly reference these elements or add them to a whitelist.
