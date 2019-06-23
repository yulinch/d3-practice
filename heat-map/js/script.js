$(function(){
	let dataurl = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';

	var w = 800,
		h = 600,
		margin = 70;

	var container = d3.select("#chart")
					  .append("svg")
					  .attrs({
					  	"width": w + margin * 2,
					  	"height": h + margin * 2
					  })

	// var color = d3.scaleOrdinal(d3.schemeCategory20);
	var color = d3.schemeCategory20;

	var tooltip = d3.select("#chart")
					.append("div")
					.attr("id", "tooltip")
					.style("opacity", 0);

	d3.json(dataurl, function(data){
		var chart = container.append("g");
		var dataset = data.monthlyVariance,
			baseTemp = data.baseTemperature;

		var barWidth = dataset.length/12;

		var colorScale = d3.scaleQuantile()
						   .domain(d3.extent(dataset, (d) => dataset.variance + baseTemp))
						   .range(color);

		var xScale = d3.scaleLinear()
					   .domain([d3.min(dataset, (d) => d.year), d3.max(dataset, (d) => d.year)])
					   .range([0, w]);

		var xAxis = d3.axisBottom()
					  .tickFormat(d3.format("d"))
					  .scale(xScale);

		// var yScale = d3.scaleLinear()
		// 			   .domain([d3.min(dataset, (d) => d.month), d3.max(dataset, (d) => d.month)])
		// 			   .range([h, 0]);

		var yScale = d3.scaleBand()
					   .domain([0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
					   .range([0, h]);
					   // .paddingInner(0.3)

		// var yScale = d3.scaleQuantize()
		// 			   .domain([d3.min(dataset, (d) => d.month), d3.max(dataset, (d) => d.month)])
		// 			   .range(["January","February","March","April","May","June","July", "August","September","October","November","December"])

		// 	console.log(yScale(2))

		var month = ["January","February","March","April","May","June","July", "August","September","October","November","December"];

		var yAxis = d3.axisLeft()
					  // .tickFormat(d3.format("d"))
					  .tickFormat((d, i) => month[i])
					  .scale(yScale);

		chart.append("g")
			 .attrs({
			 	"id": "x-axis",
			 	"transform": "translate(" + margin + ", " + h  + ")"
			 })
			 .call(xAxis);

		chart.append("g")
			 .attrs({
			 	"id": "y-axis",
			 	"transform": "translate(" + margin + ", 0)"
			 })
			 .call(yAxis);

		chart.append("g")
			 .selectAll("rect")
			 .data(dataset)
			 .enter()
			 .append("rect")
			 .attrs({
			 	"class": "cell",
			 	"x": (d) => xScale(d.year),
			 	"y": (d) => yScale(d.month),
			 	// "width": barWidth/12,
			 	"width": w/barWidth,
			 	"height": h / 12,
			 	// "height": (d) => yScale(parseInt(d.month)),
			 	"fill": colorScale(dataset.variance + baseTemp),
			 	"data-year": (d) => d.year,
			 	"data-month": (d) => d.month,
			 	"transform": "translate(" + margin + ",0)"
			 })



	})

})
