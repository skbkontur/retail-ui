var React = require('react');
var Router = require('react-router');

require('./ShowcaseApp.less');
var cx = require('ui/cx')('rt-sc-ShowcaseApp');

var ShowcaseApp = React.createClass({
  render() {
    return (
      <div className={cx('')}>
        <div className={cx('head')}>
          <div className={cx('head-in')}>
            <div className={cx('title')}>UI LIB</div>
            <div className={cx('links')}>
              <Router.Link to="gettingStarted" className={cx('link')}>
                Getting Started
              </Router.Link>
              <Router.Link to="components" className={cx('link')}>
                Components
              </Router.Link>
              <Router.Link to="demo" className={cx('link')}>Demo</Router.Link>
            </div>
            <div style={{clear: 'both'}} />
          </div>
        </div>
        <div className={cx('content')}>
          <Router.RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = ShowcaseApp;
