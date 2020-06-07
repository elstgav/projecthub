import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'


export default class Icon extends React.PureComponent {
  static paths = {
    x:     'M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z',
    check: 'M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z',
    menu:  'M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z',
    plus: 'M12 9H7v5H5V9H0V7h5V2h2v5h5z',
    assignee: 'M12 14.002a.998.998 0 01-.998.998H1.001A1 1 0 010 13.999V13c0-2.633 4-4 4-4s.229-.409 0-1c-.841-.62-.944-1.59-1-4 .173-2.413 1.867-3 3-3s2.827.586 3 3c-.056 2.41-.159 3.38-1 4-.229.59 0 1 0 1s4 1.367 4 4v1.002z',
    label: 'M7.73 1.73C7.26 1.26 6.62 1 5.96 1H3.5C2.13 1 1 2.13 1 3.5v2.47c0 .66.27 1.3.73 1.77l6.06 6.06c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 000-1.41L7.73 1.73zM2.38 7.09c-.31-.3-.47-.7-.47-1.13V3.5c0-.88.72-1.59 1.59-1.59h2.47c.42 0 .83.16 1.13.47l6.14 6.13-4.73 4.73-6.13-6.15zM3.01 3h2v2H3V3h.01z',
  }

  static propTypes = {
    ariaLabel: PropTypes.string,
    className: PropTypes.string,
    icon:      PropTypes.string.isRequired,
    height:    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width:     PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    ariaLabel: '',
    className: '',
    height:    null,
    width:     16,
  }

  render = () => (
    <svg
      aria-hidden={!this.props.ariaLabel}
      aria-label={this.props.ariaLabel}
      className={classNames(`octicon octicon-${this.props.icon}`, this.props.className)}
      height={this.props.height || this.props.width}
      width={this.props.width}
      role="img"
      version="1.1"
      viewBox="0 0 12 16"
    >
      <path fillRule="evenodd" d={Icon.paths[this.props.icon]} />
    </svg>
  )
}
