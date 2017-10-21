# CSS Transitions

This is a module in CSS that lets you make gradual transitions between the values of specific CSS
properties. The behaviour is controlled by specifying the timing, the duration and the other attributes.

It is worth noting that CSS Transitions are `different` from animations. Animations are a separate module in CSS and 
offer more finer grained control as you can control different stops of the animation.

### Syntax and Formats
Transitions decide which properties should change, when the transition should start (delay), how long the transition 
will last (duration) and how the transition will run (timing function). The general syntax is as below

```css
div {
    transition: <property> <duration> <timing-function> <delay>;
}
```

Here is an example

```css
.box {
    border-style: solid;
    border-width: 1px;
    display: block;
    width: 100px;
    height: 100px;
    background-color: #0000FF;
    -webkit-transition: width 2s, height 2s, background-color 2s, -webkit-transform 2s;
    transition: width 2s, height 2s, background-color 2s, transform 2s;
}

.box:hover {
    background-color: #FFCCCC;
    width: 200px;
    height: 200px;
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
}
```

This rule specifies that the width, height, background-color and transform are eligible for transitions and that their
transitions should complete in 2 seconds. The styles on the hover show the ending values for each of the transition
eligible properties.


### Events

There are the following events that one can attach listeners to

 * `transitionrun`: Fired at the beginning of the transition (before the delay)
 * `transitionstart`: Fired at the start of the transition (after the initial delay)
 * `transitionend`: Fired at the end/completion of the transition
 

### Transform

Transform is a CSS Property that is eligible for transitions. It lets you modify the coordinate space of the object. i.e. 
you can use transform to modify a CSS element's X position, Y position, rotate it, zoom it etc.


##### References
[MDN CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions)

[Using CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)

