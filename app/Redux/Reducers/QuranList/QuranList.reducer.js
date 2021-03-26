import {
  REQ_QURAN_LIST,
  REQ_QURAN_LIST_SUCCESS,
  REQ_QURAN_LIST_FAILED
} from '../../ActionTypes';

const initialState = {
  data: [],
  error: false,
  errorMessage: '',
  loading: false
};

const quranListReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQ_QURAN_LIST:
      return {
        ...state,
        error: false,
        errorMessage: '',
        loading: true
      };
    case REQ_QURAN_LIST_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: false,
        loading: false
      };
    case REQ_QURAN_LIST_FAILED:
      return {
        ...state,
        error: true,
        errorMessage: action.error,
        loading: false
      };
    default:
      return state;
  }
};

export { quranListReducer };
