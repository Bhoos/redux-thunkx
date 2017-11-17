import createThunkx from '../src';

describe('thunkx middleware', () => {
  const doDispatch = jest.fn();
  const doGetState = jest.fn();

  const thunkx = createThunkx();

  const nextHandler = thunkx({ dispatch: doDispatch, getState: doGetState });
  test('must return  a function to handle next', () => {
    expect(typeof nextHandler).toBe('function');
    expect(nextHandler.length).toBe(1);
  });

  test('must return a function to handle acton', () => {
    const actionHandler = nextHandler();

    expect(typeof actionHandler).toBe('function');
    expect(actionHandler.length).toBe(1);
  });

  test('must run the given action function with dispatch and getState', () => {
    const actionHandler = nextHandler();
    actionHandler((dispatch, getState) => {
      expect(dispatch).toBe(doDispatch);
      expect(getState).toBe(doGetState);
    });
  });

  test('must pass action to next if not a function', () => {
    const actionObj = {};
    const actionHandler = nextHandler((action) => {
      expect(action).toBe(actionObj);
    });

    actionHandler(actionObj);
  });

  test('must return the value of next if not a function', () => {
    const expected = 'thunkx';
    const actionHandler = nextHandler(() => expected);
    const outcome = actionHandler();
    expect(outcome).toBe(expected);
  });

  test('must return the value as expected if a function', () => {
    const expected = 'rocks';
    const actionHandler = nextHandler();
    const outcome = actionHandler(() => expected);
    expect(outcome).toBe(expected);
  });

  test('must be a synchronous call if a function', () => {
    let v = 0;
    const actionHandler = nextHandler();
    actionHandler(() => { v += 1; });
    expect(v).toBe(1);
  });

  describe('with extra argument', () => {
    test('must pass the third argument', () => {
      const extraArgs = { lol: true };
      createThunkx(extraArgs)({
        dispatch: doDispatch,
        getState: doGetState,
      })()((dispatch, getState, arg) => {
        expect(dispatch).toBe(doDispatch);
        expect(getState).toBe(doGetState);
        expect(arg).toBe(extraArgs);
      });
    });

    test('must pass dispatch and getState to functional argument', () => {
      const extraArgs = { lol: true };
      createThunkx((dispatch, getState) => {
        expect(dispatch).toBe(doDispatch);
        expect(getState).toBe(doGetState);
        return extraArgs;
      })({
        dispatch: doDispatch,
        getState: doGetState,
      })()((dispatch, getState, arg) => {
        expect(dispatch).toBe(doDispatch);
        expect(getState).toBe(doGetState);
        expect(arg).toBe(extraArgs);
      });
    });
  });
});
