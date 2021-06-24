import React from 'react';
import PropTypes from 'prop-types';

const Header = ({
	topics,
	onSearchChange,
	searchQuery,
	onSelectedTopicsChange,
	selectedTopics,
}) => {
	const styles = {
		root: {
			height: '100%',
			backgroundColor: '#001f3f',
			width: '100vw',
			padding: 20,
		},
		titleContainer: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		title: {
			fontFamily: 'monospace',
			whiteSpace: 'nowrap',
			color: 'white',
		},
		filters: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		input: {
			height: 25,
			color: '#001f3f',
			width: 261,
			marginBottom: 17,
			outline: 'none',
			backgroundColor: '#fafafa',
			border: 0,
			boxShadow: '0 0 4px rgba(0,0,0,0.3)',
			transition: '.3s box-shadow',
			padding: 6,
		},

		topicsWrapper: {
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'center',
		},
		topicChip: {
			cursor: 'pointer',
			height: 30,
			borderRadius: 15,
			backgroundColor:
				selectedTopics.indexOf(item) === -1 ? 'lightcoral' : '#f7ffe5',
			border: `1px solid ${
				selectedTopics.indexOf(item) === -1 ? 'lightcoral' : '#f7ffe5'
			}`,
			margin: 4,
			padding: 4,
			whiteSpace: 'no-wrap',
		},
	};
	return (
		<header style={styles.root}>
			<div style={styles.titleContainer}>
				<h1 style={styles.title}>Israel Tech Writers</h1>
			</div>
			<div style={styles.filters}>
				<input
					style={styles.input}
					value={searchQuery}
					onChange={(event) => {
						onSearchChange(event.target.value);
					}}
					placeholder={'Search'}
					type={'search'}
				/>
				<div style={styles.topicsWrapper}>
					{topics.map((item) => {
						return (
							<span
								onClick={() => {
									onSelectedTopicsChange(item);
								}}
								style={styles.topicChip}
								key={item}
							>
								{item}
							</span>
						);
					})}
				</div>
			</div>
		</header>
	);
};

Header.propTypes = {
	topics: PropTypes.array,
	onSearchChange: PropTypes.func,
	searchQuery: PropTypes.string,
	onSelectedTopicsChange: PropTypes.func,
	selectedTopics: PropTypes.array,
};

export default Header;
