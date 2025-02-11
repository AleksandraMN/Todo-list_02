
export const onChange = ({ target }, setState) => {
	if (target && typeof setState === 'function') {
    setState(target.value);
  }
};

