# Frontend Boilerplate
A Mobile-First, Front-End boilerplate using Browserify, Gulp, SASS and Vanilla JS.

## Things to know

### Gulp
Most people will be running Gulp 3, but this project needs Gulp 4.
The package.json will install Gulp 4 locally, but you will need the Gulp 4 CLI to be installed globally for this to work.

To do so you will need to go into terminal and run the following commands:

    npm uninstall gulp -g
    npm install gulpjs/gulp-cli#4.0 -g

All this does is remove the Gulp 3 CLI that you have installed globally and installs the Gulp 4 CLI in its place.

Now to run the project just cd into the root of the directory and run:

    gulp

That’s all there is :)

### Breakpoints
Breakpoints are defined in `/src/scss/utils/_variables.scss` in the map `$BREAKPOINTS`.

    @key   {string} - Name of breakpoint
    @value {string} - Type of breakpoint (min, max)
    @value {int}    - Width that breakpoint starts
    @value {int}    - Number of columns for grid
    @value {int}    - Gutter width for each column

The `default` breakpoint is used by default. To use any other breakpoint defined in the map (e.g. tablet), you simply use:

    @include breakpoint (tablet) {
        // Styles for tablet breakpoint
    }

### Typography
Typography is defined in `/src/scss/utils/_variables.scss` in the map `$TYPE-SCALES`.

    @key   {string}       - Name of breakpoint
    @key   {string}       - Name of element
    @key   {string}       - Property
    @value {string | int} - Value of property

The `$TYPE-SCALES` map is tied to the `$BREAKPOINTS` map. For an entry to exist in `$TYPE-SCALES`, it must first exist in `$BREAKPOINTS`.

**So what exactly does declaring typography in this way help with?**

It allows you to easily deal with type-scales that change across breakpoints, conversion from px to em’s, effortless nesting of font-sizes without having to worry about math.

**Show me?**

Everything in `$TYPE-SCALES` is automatically created by using the `generateTypeScaleStyles()` function that is used in `/src/scss/base/_typography.scss`. So anything defined in the `$TYPE-SCALES` map is always created without you having to do anything more. If you defined more than one breakpoint (Which is the case by default), then the changes across breakpoint are already taken care of when you change breakpoints in your browser.

**Now how about that math you said I didn’t have to do?**

Using the default `$TYPE-SCALES` and `$BREAKPOINTS` maps we can have the following code:

    .testingTypography {
        @include setTypeScale(h1);

        .nestedContent {
            @include setTypeScale(h2, h1);
        }
    }

    @include breakpoint (tablet) {
        @include setTypeScale(h2);

        .nestedContent {
            @include setTypeScale(h3, h1);
        }
    }

`setTypeScale` takes an entry defined in `$TYPE-SCALES` as the first parameter and an optional context as the second parameter.

Let’s break down what’s happening above. In `.testingTypography` we have set the typescale to `h1`. Now `h1` is defined in `$TYPE-SCALES` under the `default` breakpoint. So we have applied all of those styles defined in `$TYPE-SCALES->default->h1` to `.testingTypography`.

Nested within that is `.nestedContent` and you can see that we have set it to `h2` and passed a context of `h1`. This sets the styles of `h2` to `.nestedContent` handling all `em` conversion.

The reason I have done it like this is to enable you to have one file that contains all of the type-scales that when edited will globally update, instead of crawling through all of your files updating things.

**Note that this will only help you update the styles applied to the name of type-scale and not the name if the type-scale.**

What I mean is that you can update the values in `$TYPE-SCALES` as much as you like, however if you changed `p` to say `.tiny-text` then you will need to go through all of your files where you used `setTypeScale(p)` and change it to `setTypeScale('.tiny-text')`.