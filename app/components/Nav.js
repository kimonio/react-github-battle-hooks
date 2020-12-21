import React, { Component } from 'react'
import { ThemeConsumer } from '../contexts/themeContext'
// Routing
import { NavLink } from 'react-router-dom'

const activeStyle = {
	color: 'rgb(187,46,31)',
}

export default function Nav({ toggleTheme }) {
	return (
		<ThemeConsumer>
			{(theme) => (
				<nav className='row space-between'>
					<ul className='row nav'>
						<li>
							<NavLink
								exact
								activeStyle={activeStyle}
								className='nav-link'
								to='/'>
								Popular
							</NavLink>
						</li>
						<li>
							<NavLink
								activeStyle={activeStyle}
								className='nav-link'
								to='/battle'>
								Battle
							</NavLink>
						</li>
					</ul>

					<button
						style={{ fontSize: 30 }}
						className='btn-clear'
						onClick={toggleTheme}>
						{theme === 'light' ? '🔦' : '💡'}
					</button>
				</nav>
			)}
		</ThemeConsumer>
	)
}
