$(function(){
	// let dataurl = 'http://opendata.epa.gov.tw/webapi/Data/OTH01877/?$skip=0&$top=1000&format=json';

	// $.ajax({
	// 	url: 'https://opendata.epa.gov.tw/api/v1/OTH01877/?&format=json&skip=0&top=100&token=0al+7Vq2oEC57pTaiR2IMg',
	// 	// url: 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',
	// 	type: 'GET',
	// 	error: function(){
	// 		console.log("error");
	// 	},
	// 	success: function(res){
	// 		// console.log(res);
	// 		console.log("success");
	// 	}
	// })

	var data = [
		{"Year":"107年","TheNameOfTheProblem":"醫療廢棄物品回收","Total":"1"},
		{"Year":"107年","TheNameOfTheProblem":"傳真機回收","Total":"5"},
		{"Year":"107年","TheNameOfTheProblem":"保險櫃(鐵櫃)回收","Total":"21"},
		{"Year":"107年","TheNameOfTheProblem":"裝潢產出廢棄物品","Total":"13"},
		{"Year":"107年","TheNameOfTheProblem":"公民營廢棄物清除處理機構","Total":"12"},
		{"Year":"107年","TheNameOfTheProblem":"影印機回收","Total":"29"},
		{"Year":"107年","TheNameOfTheProblem":"大量廢棄用紙回收","Total":"15"},
		{"Year":"107年","TheNameOfTheProblem":"木材類回收","Total":"73"},
		{"Year":"107年","TheNameOfTheProblem":"辦公隔板(桌椅)回收","Total":"131"},
		{"Year":"106年","TheNameOfTheProblem":"醫療廢棄物品回收","Total":"5"},
		{"Year":"106年","TheNameOfTheProblem":"傳真機回收","Total":"3"},
		{"Year":"106年","TheNameOfTheProblem":"保險櫃(鐵櫃)回收","Total":"14"},
		{"Year":"106年","TheNameOfTheProblem":"裝潢產出廢棄物品","Total":"16"},
		{"Year":"106年","TheNameOfTheProblem":"公民營廢棄物清除處理機構","Total":"34"},
		{"Year":"106年","TheNameOfTheProblem":"影印機回收","Total":"23"},
		{"Year":"106年","TheNameOfTheProblem":"大量廢棄用紙回收","Total":"32"},
		{"Year":"106年","TheNameOfTheProblem":"木材類回收","Total":"102"},
		{"Year":"106年","TheNameOfTheProblem":"辦公隔板(桌椅)回收","Total":"171"},
		{"Year":"105年","TheNameOfTheProblem":"醫療廢棄物品回收","Total":"9"},
		{"Year":"105年","TheNameOfTheProblem":"傳真機回收","Total":"7"},
		{"Year":"105年","TheNameOfTheProblem":"保險櫃(鐵櫃)回收","Total":"26"},
		{"Year":"105年","TheNameOfTheProblem":"裝潢產出廢棄物品","Total":"36"},
		{"Year":"105年","TheNameOfTheProblem":"公民營廢棄物清除處理機構","Total":"41"},
		{"Year":"105年","TheNameOfTheProblem":"影印機回收","Total":"46"},
		{"Year":"105年","TheNameOfTheProblem":"大量廢棄用紙回收","Total":"49"},
		{"Year":"105年","TheNameOfTheProblem":"木材類回收","Total":"128"},
		{"Year":"105年","TheNameOfTheProblem":"辦公隔板(桌椅)回收","Total":"200"}
	]
	var total = [];
	for(var i = 0; i<data.length; i++){
		total.push(data[i].Total);
	}
	console.log(total)

	var w = 800,
		h = 600,
		margin = 70,
		barPadding = 0.2;

	var container = d3.select("#chart")
					  .append("svg")
					  .attr("width", w + margin*2)
					  .attr("height", h + margin*2);

	var chart = container.append("g");
	var color = d3.schemeCategory20b;

	var problems = [];
	for(var i = 0; i< data.length; i++){
		if(problems.indexOf(data[i].TheNameOfTheProblem) == -1){
			problems.push(data[i].TheNameOfTheProblem);
		}
	}

	var years = [];
	for(var i = 0; i< data.length; i++){
		if(years.indexOf(data[i].Year) == -1){
			years.push(data[i].Year);
		}
	}

	var x0 = d3.scaleBand()
			   .domain(years)
			   .rangeRound([0, w]);
			   // .round(0.1);

	var xScale = d3.scaleBand()
				   .domain(problems)
				   .rangeRound([0, x0.bandwidth()]);
				   // .range([0,w])
				   // .round(0.1)
				   // .padding(0.2)

	var xAxis = d3.axisBottom()
				  .scale(x0);

	var yScale = d3.scaleLinear()
				   // .domain([d3.min(data, (d) => d["Total"]), d3.max(data, (d) => d["Total"])])
				   // .domain([0, d3.max(data, (total) => {return d3.max(total, (d) => d)})])
				   .domain([d3.min(total), d3.max(total)])
				   .range([h, 0]);

	var yAxis = d3.axisLeft()
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

	var group = chart.selectAll(".group")
					 .data(years)
					 .enter()
					 .append("g")
					 .attrs({
					 	"class": "group",
					 })

	group.selectAll("rect")
		 .data(total)
		 .enter()
		 .append("rect")
		 .attrs({
		 	"class": "bar",
		 	"x": (d) => xScale(d.Year),
		 	"y": (d, i) => yScale(2),
		 	"width": xScale.bandwidth(),
		 	"height": (d, i) => h - yScale(2),
		 	"fill": "#ddd"
		 })

	// chart.append("g")
	// 	 .selectAll("rect")
	// 	 .data(data)
	// 	 .enter()
	// 	 .append("rect")
	// 	 .attrs({
	// 	 	"class": "bar",
	// 	 	"x": (d,i) => xScale(d.TheNameOfTheProblem),
	// 	 	"y": (d) => yScale(d.Total),
	// 	 	"width": xScale.bandwidth,
	// 	 	"height": (d) => h - yScale(d.Total),
	// 	 	"fill": "#ddd",
	// 	 })

})
