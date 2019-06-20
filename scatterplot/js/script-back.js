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

	d3.json(dataurl, function(data){
		let chart = container.append("g");

		let year = [];
		let time = [];

		for(let i = 0; i<data.length; i++){
			year.push(data.Year);
			time.push(data.Time);
		}

		let yearFormat = "%Y";
		let timeFormat = "%M:%S";

		let parsedYear = year.map( (d) => d3.timeParse(yearFormat)(d));
		let parsedTime = time.map( (d) => d3.timeParse(timeFormat)(d));

		let xScale = d3.scaleTime()
					   // .domain([d3.extent(parsedYear)])
					   .domain([d3.extent(data, (d) => d.Year)])
					   .range([0, w]);

		let yScale = d3.scaleTime() 
					   .domain([d3.extent(data, (d) => d.Time)])
					   // .domain([d3.extent(parsedTime)])
					   .range([h, 0]);

		let xAxis = d3.axisBottom()
					  .tickFormat(d3.timeFormat("%Y"))
					  .scale(xScale);

		let yAxis = d3.axisLeft()
					  .tickFormat(d3.timeFormat("%M:%S"))
					  .scale(yScale);

		chart.append("g")
			 .attrs({
			 	"id": "x-axis",
			 	"transform": "translate(" + margin + ", " + h + ")"
			 })
			 .call(xAxis);

		chart.append("g")
			 .attrs({
			 	"id": "y-axis",
			 	"transform": "translate(" + margin + ", 0)"
			 })
			 .call(yAxis);

		chart.append("g")
			 .selectAll("circle")
			 .data(data)
			 .enter()
			 .append("circle")
			 .attrs({
			 	"cx": (d, i) => xScale(year[i]),
			 	"cy": (d, i) => yScale(parseInt(time[i])),
			 	"r": 10,
			 	"fill": "#ddd"
			 })


	})

})
