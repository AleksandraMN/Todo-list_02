import styles from './select.module.css';
import Select from 'react-select';
import { todosOptions } from '../../utils';
import {onChangeSelect} from '../..//handlers';
import PropTypes from 'prop-types';

export const SelectModule = ({setSelect}) => (
  <div className={styles.select}>
		<label className={styles.label}>Завершение дела:</label>
		<Select
			options={todosOptions}
			defaultValue={todosOptions[0]}
			onChange={(selectedOption) => onChangeSelect(selectedOption, setSelect)}
		/>
	</div>
);

SelectModule.propTypes = {
	setSelect: PropTypes.func,
};

