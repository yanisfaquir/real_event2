import React from 'react';
import PropTypes from 'prop-types';
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

const Dialog = ({ isOpen, onClose, title, text, type, buttonText }) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500 text-2xl" />;
      case 'error':
        return <FaTimesCircle className="text-red-500 text-2xl" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500 text-2xl" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            {getIcon()}
            <h2 className="text-xl font-bold ml-2">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            &#x2715; {/* X icon */}
          </button>
        </div>
        <div className="mb-4">
          {Array.isArray(text) ? (
            text.map((resp, index) => <p key={index}>{resp.msg}</p>)
          ) : (
            <p>{text}</p>
          )}
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error', 'warning']).isRequired,
  buttonText: PropTypes.string,
};

Dialog.defaultProps = {
  buttonText: 'Fechar',
};

export default Dialog;
