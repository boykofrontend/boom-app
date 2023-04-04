import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { isEmpty, uniqBy } from 'lodash';
import PRODUCTS_API_PATH from '../../utils/paths';
import getPriceInBuck from '../../utils/helpers';
import currencySymbols from '../../utils/constants';

const initialState = {
  products: [],
  isProductsLoading: false,
  isProductsLoaded: false,
  isProductsFailed: false,
  error: null,
};

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    try {
      const response = await axios.get(`${PRODUCTS_API_PATH}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const getUpdatedProducts = (products, hasParent = false) => {
        let acc = [];

        products.forEach(({
          id, name, price, included,
        }) => {
          if (response.data.some((p) => p.id === id && hasParent)) { // поговорить с Серым об этом, стоит ли оставить коммент
            acc = [...acc];
          } else {
            acc.push({
              id,
              name,
              price: getPriceInBuck(price, currencySymbols.USD),
              packageStatus: included ? 'Yes' : 'No',
              hasParent,
            });
          }

          if (!isEmpty(included)) {
            acc = [...acc, ...getUpdatedProducts(included, true)];
          }
        });
        // поговорить с Серым об этом, стоит ли оставить коммент
        return uniqBy(acc, 'id');
      };

      const updatedProducts = getUpdatedProducts(response.data);

      return updatedProducts;
    } catch (error) {
      return error;
    }
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isProductsLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductsLoading = false;
        state.isProductsLoaded = true;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isProductsLoading = false;
        state.isProductsLoaded = false;
        state.isProductsFailed = true;
        state.error = action.error;
      });
  },
});

export default productsSlice.reducer;
export const selectAllProducts = (state) => state.products;
