import React from 'react';
import PropTypes from 'prop-types';
import Chip from '../Chip/Chip';

const BlogCard = ({ name, url, topics, languages }) => {
	const styles = {
		root: {
			backgroundImage: 'linear-gradient(#f7ffe580, #f7ffe5)',
			borderRadius: 10,
			border: `1px solid #f7ffe5`,
			padding: 6,
			paddingBottom: 26,
		},
		languagesCont: {
			display: 'flex',
			justifyContent: 'flex-end',
		},
		cardContent: { marginBottom: 10 },
		blogName: {
			width: 300,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			margin: 0,
			fontWeight: 500,
			fontSize: 16,
		},
		blogURL: {
			width: 300,
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			margin: 0,
			fontSize: 16,
		},
		topicsContainer: {
			display: 'flex',
			flexWrap: 'wrap',
		},
	};
	return (
		<div style={styles.root}>
			<div style={styles.languagesCont}>
				{languages.map((lang) => (
					<Chip key={lang} value={lang} />
				))}
			</div>
			<div style={styles.cardContent}>
				<p style={styles.blogName} title={name}>
					{' '}
					{name} /
				</p>
				<a href={url} target={'_new'}>
					<p style={styles.blogURL} title={url}>
						{url}
					</p>
				</a>
			</div>
			<div style={styles.topicsContainer}>
				{topics.map((topic, idx) => {
					let isLast = topics.length - 1 === idx;
					let label = `${topic}${isLast ? '' : ', '}`;
					return <Chip key={topic} value={label} />;
				})}
			</div>
		</div>
	);
};

BlogCard.propTypes = {
	name: PropTypes.string.isRequired,
	url: PropTypes.string.isRequired,
	topics: PropTypes.arrayOf(PropTypes.string),
	languages: PropTypes.arrayOf(PropTypes.string),
};

export default BlogCard;
