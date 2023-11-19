// reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice'
 // Adjust the path based on your folder structure

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if needed
});

export default rootReducer;
