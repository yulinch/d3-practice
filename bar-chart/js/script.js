$(function(){
	let dataurl = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

	var w = 800,
		h = 600,
		margin = 70,
		barWidth = w/275;

	let container = d3.select("#chart")
					  .append("svg")
					  .attr("width", w + margin*2)
					  .attr("height", h + margin*2);

	d3.json(dataurl, function(data){
		let dataset = data.data

		let chart = container.append("g");
		let formatTime = d3.timeFormat("%Y %B");

		let tooltip = d3.select("#chart").append("div")
						   .attr("id", "tooltip")
						   .style("opacity", 0);

		let xScale = d3.scaleTime()
					   .domain([d3.min(dataset, (d) => new Date(d[0])), d3.max(dataset, (d) => new Date(d[0]))])
					   .range([0, w]);


		let xAxis = d3.axisBottom()
					  .scale(xScale);

		let yScale = d3.scaleLinear()
					   .domain([0, d3.max(dataset, (d) => d[1])])
					   .range([h, 0]);

		let yAxis = d3.axisLeft()
					  .scale(yScale);

		chart.append("g")
			 .attrs({
			 	"id": "x-axis",
			 	"transform": "translate(" + margin + "," + h + ")"
			 })
			 .call(xAxis);

		chart.append("g")
			 .attrs({
			 	"id": "y-axis",
			 	"transform": "translate(" + margin + ",0)"
			 })
			 .call(yAxis);

		chart.append("g")
			 .selectAll("rect")
			 .data(dataset)
			 .enter()
			 .append("rect")
			 .attrs({
			 	"x": (d) => xScale(new Date(d[0])),
			 	// "y": (d) => yScale(d[1]),
			 	"y": h,
			 	"width": barWidth,
			 	// "height": (d) => h - yScale(d[1]),
			 	"height": 0,
			 	"class": "bar",
			 	"transform": "translate(" + margin + ", 0)",
			 	// "data-date": (d) => formatTime(new Date(d[0])),
			 	"data-date": (d) => d[0],
			 	"data-gdp": (d) => d[1]
			 })
			 .transition()
			 .duration(800)
			 .ease(d3.easeQuad)
			 .delay(function(d,i){
			 	return i * 4;
			 })
			 .attr("height", (d) => h - yScale(d[1]))
			 .attr("y", (d) => yScale(d[1]))

		chart.selectAll("rect")
			 .on("mouseover", function(d, i){
			 	tooltip.transition()
			 		   .duration(300)
			 		   .style("opacity", 0.9);
			 	tooltip.html(formatTime(new Date(d[0])) + "<br>" + d[1])
			 		   .styles({
			 		   		"left": (i* barWidth) + "px",
			 		   		// "top": h - 100 + "px",
			 		   		"top": (d3.event.pageY - 100) + "px",
			 		   		"transform": "translateX(40px)",
			 		   		"opacity": 1
			 		   })
			 		   .attrs({
			 		   		// "data-date": formatTime(new Date(d[0])),
			 		   		"data-date": d[0],
			 		   		"data-gdp": d[1]
			 		   })
			 })
			 .on("mouseout", function(d){
			 	tooltip.transition()
			 		   .duration(300)
			 		   // .easeQuad()
			 		   .style("opacity", 0);
			 })

		chart.style("transform", "translate(0px, " + margin + "px)")



	})

})
