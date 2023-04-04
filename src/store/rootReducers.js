import { combineReducers } from '@reduxjs/toolkit';

import ProductsSlice from './features/ProductsSlice';

const rootReducer = combineReducers({
  products: ProductsSlice,
});

export default rootReducer;
