
import styles from './button.module.css';
import PropTypes from 'prop-types';

export const Button = (props) => (
  <button className={styles.button} {...props}>
    {props.children}
  </button>
);

Button.propTypes = {
	children: PropTypes.string,
	props: PropTypes.oneOfType([
		PropTypes.number,
    PropTypes.string,
    PropTypes.object,
    PropTypes.array,
		PropTypes.func,
  ]),
};
