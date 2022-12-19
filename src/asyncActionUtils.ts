export default function createAsyncDispatcher(
  type: any,
  promiseFn: CallableFunction
) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  async function actionHandler(dispatch: React.Dispatch<any>, ...rest: any) {
    dispatch({ type });

    try {
      const data = await promiseFn(...rest);
      dispatch({
        type: SUCCESS,
        data,
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        error: e,
      });
    }
  }

  return actionHandler;
}

export const initialAsyncState = {
  loading: false,
  data: null,
  error: null,
};

const loadingState = {
  loading: true,
  data: null,
  error: null,
};

const success = (data: any) => ({
  loading: false,
  data,
  error: null,
});

const error = (error: any) => ({
  loading: false,
  data: null,
  error: error,
});

export function createAsyncHandler(type: any, key: any) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  function handler(state: any, action: any) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState,
        };
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data),
        };
      case ERROR:
        return {
          ...state,
          [key]: error(action.error),
        };
      default:
        return state;
    }
  }

  return handler;
}
