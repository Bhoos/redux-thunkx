export default function createThunkx(extraArgs) {
  return ({ getState, dispatch }) => {
    const args = typeof extraArgs === 'function' ? extraArgs(dispatch, getState) : extraArgs;

    return next => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState, args);
      }

      return next(action);
    };
  };
}
