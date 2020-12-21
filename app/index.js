import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

// Components
import Nav from './components/Nav'
import Loading from './components/loading'

// Code-splitting
const Battle = React.lazy(() => import('./components/battle'))
const Results = React.lazy(() => import('./components/results'))
const Popular = React.lazy(() => import('./components/popular'))

// Contexts
import { ThemeProvider } from './contexts/themeContext'

// Routing
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default function App() {
	const [theme, setTheme] = useState('light')
	const toggleTheme = () =>
		setTheme((theme) => (theme === 'light' ? 'dark' : 'light'))

	return (
		<Router>
			<ThemeProvider value={theme}>
				<div className={theme}>
					<div className='container'>
						<Nav toggleTheme={toggleTheme} />

						<React.Suspense fallback={<Loading />}>
							<Switch>
								<Route exact path='/' component={Popular} />
								<Route exact path='/battle' component={Battle} />
								<Route path='/battle/results' component={Results} />
								<Route render={() => <h1>404</h1>} />
							</Switch>
						</React.Suspense>
					</div>
				</div>
			</ThemeProvider>
		</Router>
	)
}

ReactDOM.render(<App />, document.getElementById('app'))
