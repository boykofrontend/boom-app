import { arrayOf, shape } from 'prop-types';

import DownloadButton from './DownloadButton';

const ProductsTable = (props) => (
  <div className="table-container">
    <DownloadButton className="table-button" data={props.products} />
    <table className="table">
      <thead className="table-head">
        <tr>
          <td>
            ID
          </td>
          <td>
            Name
          </td>
          <td>
            Price
          </td>
          <td>
            Is package
          </td>
        </tr>
      </thead>
      <tbody className="table-body">
        {props.products.map((product) => (
          <tr key={product.id}>
            <td>
              {product.id}
            </td>
            <td>
              {product.name}
            </td>
            <td>
              {product.price}
            </td>
            <td>
              {product.packageStatus}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

ProductsTable.propTypes = {
  products: arrayOf(shape()).isRequired,
};

export default ProductsTable;
