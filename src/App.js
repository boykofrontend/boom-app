import { useEffect } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';

import './styles/global.scss';
import { isEmpty } from 'lodash';
import { getProducts } from './store/features/ProductsSlice';
import ProductsTable from './components/ProductsTable';

const App = (props) => {
  useEffect(() => {
    props.getProducts();
  }, []);

  return (
    <div className="container">
      {!isEmpty(props.productsData.products) && (
        <ProductsTable products={props.productsData.products} />
      )}
    </div>
  );
};

App.propTypes = {
  productsData: shape(),
  getProducts: func.isRequired,
};

App.defaultProps = {
  productsData: {},
};

const actionCreators = {
  getProducts,
};

const mapStateToProps = (state) => ({
  productsData: state.products,
});

export default connect(mapStateToProps, actionCreators)(App);
