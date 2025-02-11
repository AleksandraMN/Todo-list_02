
import styles from './button.module.css';
import PropTypes from 'prop-types';

export const Button = (props) => (
  <button className={styles.button} {...props}>
    {props.children}
  </button>
);

Button.propTypes = {
	children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
