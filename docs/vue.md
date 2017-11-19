# Vue

Every Vue app is bootstrapped using a root Vue instance. The constructor takes in an options object where you can set the data, methods, template, element to mount on, lifecycle callbacks and so on.

All Vue components are extended Vue instances.

All properties on the data object are proxied. Only the proxied properties are reactive (changes to them will force a re-rendering of the view). Adding any new properties to the data object after the Vue instance/component has been created will have no effect on the view.

All Vue instances need to go through a series of steps when they are created
1. Setup data observation
2. Compile the Template
3. Mount the instance to the DOM
4. Modify the DOM when the data changes

There are no controllers. All the custom logic must be added in the handlers to the lifecycle functions that get fired at various points as indicated in the figure below

![Vue lifecycle](https://vuejs.org/images/lifecycle.png)￼￼

Computed properties are cached based on their dependencies, i.e. a computed property will re-evaluate only if its dependency has changed. Otherwise it will always return the same cached value from a previous evaluation.

In components, the parent child relationship can be summarized as data down events up. The parent passes data down to the child using props on the child components. And the child component sends messages to the parent via events.  

![Vue composing components](https://vuejs.org/images/props-events.png)

Child props are one way bound to the parent properties. i.e. Data flows from parent to child, so that when the parent property changes the child prop gets the new value, not the other way around. This prevents your child from mutating the parent’s state.

Every Vue instance implements an [events interface](https://vuejs.org/v2/api/#Instance-Methods-Events), which means it can:
* Listen to an event using $on(eventName)
* Trigger an event using $emit(eventName)

The dual binding v-model directive is just syntactic sugar.

```html
<input v-model="something">
```

is similar to

```html
<input v-bind:value="something" v-on:input="something = $event.target.value">
```

So for a component to work with v-model, it must:
* accept a value prop
* emit an input event with the new value

Components that are not related can communicate using $emit(name, value) and $on(name, listener) (similar to the angular style)

The API for a Vue component comes in three parts
* Props: allows the external environment to pass data into the component
* Events: allows the component to drive side-effects in the external environment
* Slots: Allows the external environment to compose the  component with extra content


Attaching handlers to elements is done like so
```html
<input type=“checkbox” v-on:click=“handlerFn”>
```

handlerFn will be a function on the component that will be invoked with an argument that is the JS event. You can also set it up like so

```html
<input type=“checkbox” v-on:click=“handlerFn(obj)”>
```
here handlerFn will be called with the argument being the obj object that is in-scope on the UI at the time the checkbox was clicked.
