$(function(){
	let dataurl = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

	var w = 800,
		h = 600,
		margin = 70;

	var container = d3.select("#chart")
					  .append("svg")
					  .attrs({
					  	"width": w + margin * 2,
					  	"height": h + margin * 2
					  })

	var parsedTime;

	d3.json(dataurl, function(data){
		var chart = container.append("g");

		data.forEach(function(d) {
		    var parsedTime = d.Time.split(':');
		    d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
		});

		var timeFormat = d3.timeFormat("%M:%S");

		var xScale = d3.scaleLinear()
					   .domain([d3.min(data, (d) => d.Year - 1), d3.max(data, (d) => d.Year + 1)])
					   .range([0, w]);

		var yScale = d3.scaleTime()
					   .domain(d3.extent(data, function(d) {return d.Time}))
					   .range([h, 0]);

		var xAxis = d3.axisBottom()
					  .tickFormat(d3.format("d"))
					  .scale(xScale);

		var yAxis = d3.axisLeft()
					  .tickFormat(d3.timeFormat("%M:%S"))
					  .scale(yScale);

		chart.append("g")
			 .attrs({
			 	"id": "x-axis",
			 	"class": "x axis",
			 	"transform": "translate(" + margin + "," + h +")"
			 })
			 .call(xAxis);

		chart.append("g")
			 .attrs({
			 	"id": "y-axis",
			 	"class": "y axis",
			 	"transform": "translate(" + margin + ",0)"
			 })
			 .call(yAxis);

		chart.append("g")
			 .selectAll("circle")
			 .data(data)
			 .enter()
			 .append("circle")
			 .attrs({
			 	"class": "dot",
			 	"cx": (d) => xScale(d.Year),
			 	"cy": (d) => yScale(d.Time),
			 	"r": 5,
			 	"fill": "orange",
			 	"transform": "translate(" + margin + ",0)"
			 })

		chart.styles({
			"transform": "translate(0, " + margin + "px)"
		})

	})

})
