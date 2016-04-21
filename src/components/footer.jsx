const React = require('react');

const Footer = React.createClass({
	render(){
		return(
			<footer className="page-footer">
				<p>Website developed by me (Jen Berry) using <a href="https://getbootstrap.com/" target="_blank">Bootstrap</a>, <a href="https://facebook.github.io/react/" target="_blank">React.js</a>, <a href="https://github.com/reactjs/redux" target="_blank">Redux.js</a>, <a href="https://webpack.github.io/" target="_blank">Webpack.js</a>, and <a href="http://expressjs.com/" targer="_blank">Express.js</a>. It is hosted on <a href="https://www.heroku.com/" target="_blank">Heroku</a>. Check out the code on <a href="https://github.com/JenBerry/jenberry-art-with-react" target="_blank">my github account</a></p>
			</footer>
		);
	}
});

module.exports = Footer;