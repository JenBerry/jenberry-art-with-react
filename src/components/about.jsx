const React = require('react');
const {mediaRoot} = require('../globals.js');

const HomePageContents = React.createClass({

	render(){
		return(
			<div>
				<h2>About Me</h2>
				<p>
					<img src={mediaRoot+"/img/me.jpg"} title="Jen Berry, Artist" alt="Photo of me" />
					Photo courtesy of Leela Sky Photography
				</p>
				<p>Who am I? A difficult question. I left my home town in rural Cumbria and went to Cambridge University to study Physics, but came out with a degree in Zoology (That's right, I am "Jennifer Berry BA Hons Cantab", a title that gives me some pride). I then got a job in User Experience design &amp; programming for a year and a half, and was very pleased with my abilities in this area, but I quit in order to travel around the world for a year.</p>
				<p>I used to be a big fan of Heavy Metal, especially Power Metal, and liked gothic clothing. Now I'm much more interested in electronic music such as Psytrance and Dubstep, have half of my head shaved with one single dreadlock, and have taken to wearing bright clothing and no shoes. I also have a soft spot for folk music. I love going to festivals, ones that are in beautiful natural settings, with interesting workshops, and full of awesome friendly people who believe in caring and sharing.</p>
				<p>I love to learn, to make things, and also to think logically and critically.</p>
				<p> As for my art, I started drawing at school, and did an AS level in art, but stopped it when I felt like they wanted me to write more than paint. I continued to draw and paint in my spare time, as well as doing graphic design projects for some societies at university. I particularly liked to draw dragons, and fantasy scenes, but got very good at drawing animals. Now I'm interested in going into psychedelic and abstract art, particularly if it involves UV paints. Does this tell you who I am? Perhaps it gives you an idea, or maybe it just leaves you more confused.</p>
			</div>
		);
	}
});

module.exports = HomePageContents;