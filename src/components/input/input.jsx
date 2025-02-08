
import styles from './input.module.css';
import PropTypes from 'prop-types';

export const Input = (props) => (
  <input className={styles.input} {...props}>
    {props.children}
  </input>
);

Input.propTypes = {
  children: PropTypes.string,
	props: PropTypes.oneOfType([
			PropTypes.number,
			PropTypes.string,
			PropTypes.object,
			PropTypes.array,
			PropTypes.func,
		]),
};
