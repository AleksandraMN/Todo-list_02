
import styles from './input.module.css';
import PropTypes from 'prop-types';

export const Input = (props) => (
  <input className={styles.input} {...props} />
);

Input.propTypes = {
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};
