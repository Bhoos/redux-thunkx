# redux-thunkx
A redux thunk middleware with extendable arguments

It works exactly like redux-thunk with an additional
feature of extenable arguments

# Example
```javascript
import createThunkx from 'redux-thunkx';

const thunk = createThunkx(extraArgs);

// or

const thunk = createThunkx((dispatch, getState) => ({
  arg1: createArg1(dispatch, getState),
}));
```

# Why ?
You could use the extendable arguments to pass around the dispatch
and getState functions for use later within the arguments. Checkout
redux-thunkx-timer on how it could be used to define easy to use
redux based timeouts
