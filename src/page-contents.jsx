var React = require('react');

var PageContents = React.createClass({
	render: function(){
		return(
			<div>
				<div className="row">
					<div className="col-xs-12 col-sm-6 col-sm-offset-6">
						{ this.props.children }
					</div>
				</div>
			</div>
		);
	}
});

module.exports = PageContents;