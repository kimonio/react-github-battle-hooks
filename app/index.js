import React from 'react'
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

// Component
// State
// Lifecycle
// UI
class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			theme: 'light',
			toggleTheme: () => {
				console.log('toggleTheme')
				this.setState(({ theme }) => ({
					theme: theme === 'light' ? 'dark' : 'light',
				}))
			},
		}
	}

	render() {
		return (
			<Router>
				<ThemeProvider value={this.state}>
					<div className={this.state.theme}>
						<div className='container'>
							<Nav />

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
}

ReactDOM.render(<App />, document.getElementById('app'))
