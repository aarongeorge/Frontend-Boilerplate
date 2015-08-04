# Front-End Boilerplate
A Mobile-First, Front-End boilerplate using Browserify, Gulp, SASS and Vanilla JS.

## Things to know

### Breakpoints
Breakpoints are defined in `/src/scss/utils/_variables.scss` in the map `$BREAKPOINTS`.

	@key   {string} - Name of breakpoint
	@value {string} - Type of breakpoint (min, max)
	@value {int}    - Width that breakpoint starts
	@value {int}    - Number of columns for grid
	@value {int}    - Gutter width for each column

The `default` breakpoint is used by default. To use any other breakpoint defined in the map (e.g. tablet), you simply use:
	@include breakpoint(tablet) {
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
Everything in `$TYPE-SCALES` is automatically created by using the `generateTypeScaleStyles()` function that is used in `/src/scss/base/_typography.scss`. So anything defined in the $TYPE-SCALES map is always created without you having to do anything more. If you defined more than one breakpoint (Which is the case by default), then the changes across breakpoint are already taken care of when you change breakpoints in your browser.

**Now how about that math you said I didn’t have to do?**  
Using the default `$TYPE-SCALES` and `$BREAKPOINTS` maps.

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