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
- Running `yarn run build` currently yields a broken build. Parcel has an issue at the moment that I'm trying to deal with. I have tried the following to fix it:
    - Disabling minification via the parcel flag `--no-minify`
    - Setting `NODE_ENV=development` as a prefix on the `build` command
    - Setting `mangle: false` in an `.terserrc` file
    - Setting `compress: false` in an `.terserrc` file
    - Removing all self-closing tags and replacing them with opening and closing tags
- Running `yarn run build` with `--no-minify` and a comment in `./src/js/pages/homepage.ts` on line `13` results in a working build (albeit not minified)
- PurgeCSS doesn't automatically include `a` if you're referencing an `<router-link>` component. So make sure that when using CSSPurge, you explicitly reference these elements or add them to a whitelist.

## Goal
- Running `yarn run build` will provide a `dist` folder with minified bundles (JavaScript & CSS) and running [serve](https://www.npmjs.com/package/serve) in that folder will result in a working project (Nav links actually navigating to the different views, with the transition)

You should be able to do this by cloning the repo and running the following commands

```
yarn install
yarn run build
cd ./dist
serve
```