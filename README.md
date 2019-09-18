# Front-end Boilerplate

A front-end boilerplate utilising: Parcel, Tailwind and Vue

## Usage
```
yarn run build:broken (Runs `parcel build` with minify and results in a broken build)
yarn run build        (Runs `parcel build` without minify and results in a working build *when using the magical comment - see below*)
yarn run clean        (Removes the `.cache` and `dist` folders)
yarn run serve:parcel (Runs `parcel serve` which always results in a working build)
yarn run serve        (Runs `serve` and serves the `dist` folder)
```

## Goal
- Running `yarn run build` will provide a `dist` folder with minified bundles (JavaScript & CSS), and running [serve](https://www.npmjs.com/package/serve) in the `dist` folder will result in a working project (Nav links actually navigating to the different views, with the transition)

You should be able to do this by cloning the repo and running the following commands

```
yarn install
yarn run build
yarn run serve
```

## Known issues
- Running `yarn run build:broken` currently yields a broken build. Parcel has an issue at the moment that I'm trying to deal with. I have tried the following to fix it:
    - Disabling minification via the parcel flag `--no-minify` (See `yarn run build`)
    - Setting `NODE_ENV=development` as a prefix on the `build` command (Essentially the same as running `yarn run serve:parcel` and then killing the server)
    - Setting `mangle: false` in an `.terserrc` file
    - Setting `compress: false` in an `.terserrc` file
    - Removing all self-closing tags and replacing them with opening and closing tags (Apparently the parser has issues with self-closing custom tags, like those you'd see when using custom Vue components)
- PurgeCSS doesn't automatically include `a` if you're referencing an `<router-link>` component. So make sure that when using CSSPurge, you explicitly reference these elements or add them to a whitelist.

## Need help with
- Running `yarn run build` and leaving the empty comment on line `1` of `./src/js/pages/homepage.ts` results in a working build (albeit unminified). Yet if you delete the empty comment and then run `yarn run clean` followed by `yarn run build` the build is now broken as it ommits the `about.ts` file from the output
