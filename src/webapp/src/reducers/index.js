import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  product: state => state || '',
  form: formReducer,
});

export default rootReducer;
