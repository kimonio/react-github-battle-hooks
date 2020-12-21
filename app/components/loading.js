import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

const styles = {
	content: {
		fontSize: '35px',
		position: 'absolute',
		left: '0',
		right: '0',
		marginTop: '20px',
		textAlign: 'center',
	},
}

function Loading({ text = 'Loading', speed = 300 }) {
	const [content, setContent] = useState(text)
	const intervalRef = useRef(null)

	useEffect(() => {
		intervalRef.current = window.setInterval(() => {
			setContent(content === `${text}...` ? text : (content) => `${content}.`)
		}, speed)
		return () => {
			if (intervalRef.current) window.clearInterval(intervalRef.current)
			intervalRef.current = null
		}
	}, [text, speed])

	return <p style={styles.content}>{content}</p>
}

Loading.propTypes = {
	text: PropTypes.string,
	speed: PropTypes.number,
}

export default Loading
