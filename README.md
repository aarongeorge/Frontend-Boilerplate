# Front-end Boilerplate

A front-end boilerplate utilising: Parcel, Tailwind and Vue

## Usage
```
yarn install (Installs the initial dependencies)
yarn run serve (Bundles and Serves the project)
yarn run build (Bundles the project)
yarn run clean (Removes .cache/ and dist/)
```

## Known issues
- Running `yarn run build` currently yields a broken build. Parcel has an issue at the moment dealing with Vue. I have tried the following to fix it:
    - Disabling minification via the parcel flag `--no-minify`
    - Setting `NODE_ENV=development` as a prefix on the `build` command
    - Setting `mangle: false` in an `uglify.config.js` file
    - Removing all self-closing tags and replacing them with opening and closing tags
- PurgeCSS doesn't automatically include `a` if you're referencing an `<router-link>` component. So make sure that when using CSSPurge, you explicitly reference these elements or add them to a whitelist.