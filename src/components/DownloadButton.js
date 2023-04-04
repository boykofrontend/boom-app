import { saveAs } from 'file-saver';
import { arrayOf, shape, string } from 'prop-types';

const DownloadButton = ({ className, data }) => {
  const handleButtonClick = () => {
    const fileName = new Date().toLocaleDateString();

    const updatedData = data.map(({ price, name, id }) => ({ id, name, price }));
    saveAs(
      new Blob([JSON.stringify(updatedData)], {
        type: 'application/json',
      }),
      fileName,
    );
  };

  return (
    <div className="button-container">
      <button className={`${className}`} onClick={handleButtonClick}>Download</button>
    </div>
  );
};

DownloadButton.propTypes = {
  className: string,
  data: arrayOf(shape()).isRequired,
};

DownloadButton.defaultProps = {
  className: '',
};

export default DownloadButton;
