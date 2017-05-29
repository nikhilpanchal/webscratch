# Response Web Design: Basics

## Viewport
Pages optimized for a variety of devices must include a meta viewport tag in the head of the document to
instruct the browser on how to control the page's dimensions and scaling

```html
    <meta name="viewport" content="width=device-width, initial-scale=1">
```

 * Include `width=device-width` to match the screen's width in **device-independent** pixels
   * `device-width` is the width of the screen in CSS pixels at a scale of 100%
   * This allows the page to relow content to match different screen sizes 
 * Include `initial-scale=1` to establish a 1:1 relationship between CSS pixels and device-independent pixels
   * Essentially `initial-scale` controls the zoom level of the page when it initially loads
 

### Size Content to the Viewport
As far as possible try and have your website avoid users to scroll horizontally.

 * Do not use large fixed-width elements. Use relative (% based) widths instead.
 * Content should not rely on a particular viewport width to render well
   * Avoid using absolute CSS positioning, as this might cause elements to fall outside small screens
 * Use CSS media queries to apply different styling for different screen sizes
   * The items most commonly queried on are `min-width`, `max-width`, `min-height`, `max-height` 
 
### Defining Screen width breakpoints

Layout breakpoints should not be based on device brands or types -- Since this could lead to a maintenance
nightmare. Instead let the content dictate the layout and the width breakpoints

 * Create breakpoints based on content rather than device brands or sizes
   * Create major breakpoints as separate files using the media attribute on the `<link>` element
   * Within each file, use the `@media (query)` for different values for minor breakpoints
 * Design for the smallest device first, then work your way up to larger screen sizes
 * Keep lines of text to a max of 70 - 80 characters
   * Use `@media (query)` to set the width differently for different screen sizes
   

## Web Design Patterns

Most responsive web site layouts can be categorized into one of 5 patterns

 1. Mostly Fluid
 1. Column Drop
 1. Layout Shifter
 1. Tiny Tweaks
 1. Off Canvas
 
### Mostly Fluid

The layout arranges the items in a fluid grid that causes the elements to reflow as the device width changes.
On large screens, the layout remains the same, just the margin width adjusts. On smaller screens, the content
is made to reflow while the columns are stacked vertically. On the smallest screens the elements are stacked
vertically.

### Column Drop

This pattern starts with full-width columns appearing side-by-side for the widest screens. As the screen width
starts to narrow, the columns start getting stacked vertically one by one, eventually resulting in all columns
stacked vertically.

### Layout Shifter

This is the most flexible and the hardest to maintain since it probably involves the highest number of breakpoints
It is the most `responsive` pattern and rather than re-flowing the layout of the elements to drop below other 
columns, involves explicit movement of content. 
