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
	var color = d3.scaleOrdinal(d3.schemeCategory20);

	var tooltip = d3.select("#chart")
					.append("div")
					.attr("id", "tooltip")
					.style("opacity", 0);

	d3.json(dataurl, function(data){
		var chart = container.append("g");

		// data.forEach(function(d) {
		//     var parsedTime = d.Time.split(':');
		//     d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
		// });

		var time = [];
		for(var i = 0; i < data.length; i++){
			time.push(data[i].Time);
		}

		// var parsedTime = time.map(function(d){
		// 	return d3.timeParse("%M:%S")(d)
		// })

		var timeFormat = d3.timeFormat("%M:%S");

		var xScale = d3.scaleLinear()
					   .domain([d3.min(data, (d) => d.Year - 1), d3.max(data, (d) => d.Year + 1)])
					   .range([0, w]);

		// var yScale = d3.scaleTime()
		// 			   .domain(d3.extent(data, function(d) {return d.Time}))
		// 			   .range([h, 0]);

		var yScale = d3.scaleTime()
					   .domain(d3.extent(data, (d) => d.Seconds))
					   .range([h, 0]);

		var xAxis = d3.axisBottom()
					  .tickFormat(d3.format("d"))
					  .scale(xScale);

		var yAxis = d3.axisLeft()
					  .scale(yScale)
					  // .tickFormat(d3.timeFormat("%M:%S"))
					  .tickFormat(function(d, i) {
					  	return time[i]
					  })

		// var yAxis = d3.axisLeft()
		// 			  .tickFormat(d3.timeFormat("%M:%S"))
		// 			  .scale(yScale);

		chart.append("g")
			 .attrs({
			 	"id": "x-axis",
			 	"class": "x axis",
			 	"transform": "translate(" + margin + "," + h +")"
			 })
			 .call(xAxis);

		chart.append("g")
			 .append("text")
			 .text("(year)")
			 .attrs({
			 	"class": "x-text",
			 	"x": w + 60,
			 	"y": h + 40,
			 	"fill": "#999"
			 })

		chart.append("g")
			 .attrs({
			 	"id": "y-axis",
			 	"class": "y axis",
			 	"transform": "translate(" + margin + ",0)"
			 })
			 .call(yAxis);

		chart.append("g")
			 .append("text")
			 .text("(minutes)")
			 .attrs({
			 	"class": "y-text",
			 	"x": -50,
			 	"y": 10,
			 	"transform": "rotate(-90)",
			 	"fill": "#999"
			 })

		chart.append("g")
			 .selectAll("circle")
			 .data(data)
			 .enter()
			 .append("circle")
			 .attrs({
			 	"class": "dot",
			 	"cx": (d) => xScale(d.Year),
			 	// "cy": (d) => yScale(d.Time),
			 	"cy": (d, i) => yScale(parseInt(d.Seconds)),
			 	"r": 0,
			 	"fill": (d) => (d.Doping != '' ? color(0) : color(1)),
			 	"data-xvalue" : (d) => d.Year,
			 	// "data-yvalue" : (d) => timeFormat(d.Time),
			 	"data-yvalue" : (d, i) => time[i],
			 	"transform": "translate(" + margin + ",0)"
			 })
			 .transition()
			 .duration(300)
			 .delay(600)
			 .attr("r", 5)

		chart.selectAll("circle")
			 .on("mouseover", function(d, i){
			 	tooltip.transition()
			 		   .duration(300)
			 		   .ease(d3.easeQuad)
			 		   .style("opacity", 0.9)
			 	tooltip.attr("data-year", d.Year)
			 		   // .html( "Name: " + d.Name + "<br>Year: " + d.Year + ",   Time: " + timeFormat(d.Time) + (d.Doping ? "<br>-<br>" + d.Doping : ""))
			 		   .html( "Name: " + d.Name + "<br>Year: " + d.Year + ",   Time: " + time[i] + (d.Doping ? "<br>-<br>" + d.Doping : ""))
			 		   .styles({
			 		   	"left": (d3.event.pageX + 10) + "px",
			 		   	"top": (d3.event.pageY - 150) + "px",
			 		   })
			 })
			 .on("mouseout", function(d){
			 	tooltip.transition()
			 		   .duration(300)
			 		   .style("opacity", 0)
			 })

		var legend = container.selectAll(".legend")
						  .data(color.domain())
						  .enter()
						  .append("g")
						  .attrs({
						  	"id": "legend",
						  	"class": "legend",
						  	"transform": (d, i) => "translate(0, " + (h - i * 20) + ")"
						  })

		legend.append("rect")
			  .attrs({
			  	"x": w + margin - 10,
			  	"width": 12,
			  	"height": 12
			  })
			  .style("fill", (d,i) => color(i));

		legend.append("text")
			  .attrs({
			  	"x": w + margin - 15,
			  	"y": 9,
			  })
			  .text((d) => d ? "Riders with doping allegations" : "No doping allegations")

		chart.styles({
			"transform": "translate(0, " + margin + "px)"
		})

	})

})
