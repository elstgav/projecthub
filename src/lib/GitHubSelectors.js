const GitHubSelectors = {
  addCardsButton:          '.project-header-link[aria-label="Toggle add cards to project"]',
  avatar:                  '.avatar img',
  card:                    '.issue-card',
  column:                  '.project-column',
  label:                   '.issue-card-label',
  menuButton:              '.project-header-link[aria-label="Toggle project menu"]',
  newColumnButton:         '.js-new-project-column-container .js-new-column-button',
  projectColumnsContainer: '.project-columns-container',
  projectHeaderControls:   '.project-header-controls',
  projectHeaderLink:       '.project-header-link',
  projectLoadingIndicator: 'include-fragment',

  names: {
    currentUser: 'octolytics-actor-login',
  },
}

export default GitHubSelectors
