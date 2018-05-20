# React 

## {}
Interpolations in JSX. Inside the curly braces is where you are now in pure JS land and you can put any valid javascript in there that evaluates to an expression

```jsx harmony
<div className='content'>{(() => 'Hello World')()}</div> 
```

## Overriding Props in JSX
You can override interpolated props to a JSX element by moving the overriding props after the interpolatoin

```jsx harmony
const props = {
    className: "my-class"
};

<div {...props} className='my-new-class'></div> 
```
The eventual class will be `my-new-class`. To have the value taken from `props` you should move `className` before `{...props}`

## PropTypes
Used to specify the props and their types along with specifying whether they are required or not

```jsx harmony
const Message = (props) => {
    return <div>{props.firstName}</div>
}

Message.propTypes = {
    firstName: PropTypes.string.isRequired
}
```

## Refs
Setting a ref on a native node in JSX gives you a reference to that node.

```jsx harmony
class Comp extends React.Component {
    render() {
        return (
            <div ref={(node) => this.rootNode = node}>
                <div></div>
            </div>
        )
    }
}
```
Here the function assigned to ref gets passed a reference to the native div node. This will enable you to manipulate the DOM directly if you need to.

A use-case for this would be in a form, where the submit handler would want a handle to the form's input elements to get out the values. By setting a ref function on the inputs of the form, you could save a reference to those inputs to the component's class properties (as in this.nameinput) and then use them in your handlers.

## Forms
To control the inputs on a form you do so by specifying it's `value` property as the value of a variable. 

```jsx harmony
<input name="firstName" value={this.firstName} />
``` 
Doing so will make the input unresponsive to user input since it will only display the value that's in the variable this.firstName.

```jsx harmony
handleFirstName = function(e) {
    // Neat object de-construction.
    const {value} = e.target;
    
    this.setState({
        firstName: value
    });
};

const {firstName} = this.state;
<input name="firstName" onChange={this.handleFirstName} value={firstName} /> 
```

## key property
React uses the `key` property on lists of elements (like arrays) to properly associate the element with its data. React also uses `key` when re-rendering the array of elements to keep track of which elements need to be dropped, added or updated from the DOM.

## Server Request
The place to make server requests would be in the `componentDidMount` function to retrieve whatever data you need in your component. 
This request could be made using the `axios` library. Once the response arrives you would set it in the state which would fire a re-render and update the DOM.

## Writing React applications
Code Sandbox is a good online editor where you can write react applications. It has a React editor that makes things really convenient.