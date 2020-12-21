import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import {
	FaUser,
	FaStar,
	FaCodeBranch,
	FaExclamationTriangle,
} from 'react-icons/fa'
import Card from './card'
import Loading from './loading'

function LanguagesNav({ selected, onUpdateLanguage }) {
	const languages = [
		'All',
		'Javascript',
		'Go',
		'Typescript',
		'Python',
		'Ruby',
		'Java',
		'CSS',
		'Swift',
	]
	return (
		<ul className='flex-center'>
			{languages.map((language, i) => (
				<li key={i}>
					<button
						onClick={() => onUpdateLanguage(language)}
						style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
						className='btn-clear nav-link'>
						{language}
					</button>
				</li>
			))}
		</ul>
	)
}

LanguagesNav.propTypes = {
	selected: PropTypes.string.isRequired,
	onUpdateLanguage: PropTypes.func.isRequired,
}

function ReposGrid({ repos }) {
	return (
		<ul className='grid space-around'>
			{repos.map((repo, index) => {
				const {
					name,
					owner,
					html_url,
					stargazers_count,
					forks,
					open_issues,
				} = repo
				const { login, avatar_url } = owner

				return (
					<li key={html_url}>
						<Card
							header={`#${index + 1}`}
							avatar={avatar_url}
							href={html_url}
							name={login}>
							<ul className='card-list'>
								<li>
									<FaUser color='rgb(255, 191, 116)' size={22} />
									<a href={`https://github.com/${login}`}>{login}</a>
								</li>
								<li>
									<FaStar color='rgb(255, 215, 0)' size={22} />
									{stargazers_count.toLocaleString()} stars
								</li>
								<li>
									<FaCodeBranch color='rgb(129, 195, 245)' size={22} />
									{forks.toLocaleString()} forks
								</li>
								<li>
									<FaExclamationTriangle color='rgb(241, 138, 147)' size={22} />
									{open_issues.toLocaleString()} open
								</li>
							</ul>
						</Card>
					</li>
				)
			})}
		</ul>
	)
}

ReposGrid.propTypes = {
	repos: PropTypes.array.isRequired,
}

export default class Popular extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedLanguage: 'All',
			repos: {},
			error: null,
		}

		this.updateLanguage = this.updateLanguage.bind(this)
	}

	updateLanguage(selectedLanguage) {
		this.setState({
			selectedLanguage,
			error: null,
		})

		// Check if the language has not previously retrieved
		if (!this.state.repos[selectedLanguage]) {
			fetchPopularRepos(selectedLanguage)
				.then((data) =>
					this.setState(({ repos }) => ({
						repos: {
							...repos,
							[selectedLanguage]: data,
						},
						error: null,
					}))
				)
				.catch((error) => {
					console.warn(`Error fetching repos: ${error}`)
					this.setState({
						error: 'There was an error fetching he repositories.',
					})
				})
		}
	}

	isLoading() {
		const { selectedLanguage, repos, error } = this.state
		return !repos[selectedLanguage] && error === null
	}

	componentDidMount() {
		this.updateLanguage(this.state.selectedLanguage)
	}

	render() {
		const { selectedLanguage, repos, error } = this.state
		return (
			<React.Fragment>
				<LanguagesNav
					selected={selectedLanguage}
					onUpdateLanguage={this.updateLanguage}
				/>
				{this.isLoading() && <Loading text='Fetching Repos' />}
				{error && <p className='center-text error'>{error}</p>}
				{repos[selectedLanguage] && (
					<ReposGrid repos={repos[selectedLanguage]} />
				)}
			</React.Fragment>
		)
	}
}