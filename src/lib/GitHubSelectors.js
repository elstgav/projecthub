const GitHubSelectors = {
  addCardsButton:          '.project-header-link.js-show-project-triage',
  menuButton:              '.project-header-link.js-show-project-menu',

  column:                  '.project-column',
  card:                    '.issue-card',
  avatar:                  '.avatar-user',
  label:                   '.IssueLabel',

  newColumnButton:         '.js-new-project-column-container .js-new-column-button',
  projectColumnsContainer: '.project-columns-container',
  projectHeaderControls:   '.project-header-controls',
  projectHeaderLink:       '.project-header-link',
  projectLoadingIndicator: '.js-project-column-cards > include-fragment',

  names: {
    currentUser: 'octolytics-actor-login',
  },
}

export default GitHubSelectors
