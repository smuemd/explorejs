import {combineReducers} from 'redux';
import fuelSavings from './fuelSavingsReducer';
import testing from './testingReducer';
import notifications from './notificationReducer';
import orm from '../orm/reducer';
import {routerReducer as routing} from 'react-router-redux';

const rootReducer = combineReducers({
  fuelSavings,
  notifications,
  routing,
  orm,
  testing
});

export default rootReducer;
