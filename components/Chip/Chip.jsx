import React from 'react';
import PropTypes from 'prop-types';

const Chip = ({ value }) => {
	return (
		<span
			style={{
				whiteSpace: 'break-spaces',
				color: 'darkgrey',
				fontSize: 15,
			}}
		>
			{value}
		</span>
	);
};

Chip.propTypes = {
	value: PropTypes.string.isRequired,
};

export default Chip;
