$(function(){
	var data = [
		{
	        "categorie": "Student", 
	        "values": [
	            {
	                "value": 0, 
	                "rate": "Not at all"
	            }, 
	            {
	                "value": 4, 
	                "rate": "Not very much"
	            }, 
	            {
	                "value": 12, 
	                "rate": "Medium"
	            }, 
	            {
	                "value": 6, 
	                "rate": "Very much"
	            }, 
	            {
	                "value": 0, 
	                "rate": "Tremendously"
	            }
	        ]
	    }, 
	    {
	        "categorie": "Liberal Profession", 
	        "values": [
	            {
	                "value": 1, 
	                "rate": "Not at all"
	            }, 
	            {
	                "value": 21, 
	                "rate": "Not very much"
	            }, 
	            {
	                "value": 13, 
	                "rate": "Medium"
	            }, 
	            {
	                "value": 18, 
	                "rate": "Very much"
	            }, 
	            {
	                "value": 6, 
	                "rate": "Tremendously"
	            }
	        ]
	    }, 
	    {
	        "categorie": "Salaried Staff", 
	        "values": [
	            {
	                "value": 3, 
	                "rate": "Not at all"
	            }, 
	            {
	                "value": 22, 
	                "rate": "Not very much"
	            }, 
	            {
	                "value": 6, 
	                "rate": "Medium"
	            }, 
	            {
	                "value": 15, 
	                "rate": "Very much"
	            }, 
	            {
	                "value": 3, 
	                "rate": "Tremendously"
	            }
	        ]
	    }, 
	    {
	        "categorie": "Employee", 
	        "values": [
	            {
	                "value": 12, 
	                "rate": "Not at all"
	            }, 
	            {
	                "value": 7, 
	                "rate": "Not very much"
	            }, 
	            {
	                "value": 18, 
	                "rate": "Medium"
	            }, 
	            {
	                "value": 13, 
	                "rate": "Very much"
	            }, 
	            {
	                "value": 6, 
	                "rate": "Tremendously"
	            }
	        ]
	    }, 
	    {
	        "categorie": "Craftsman", 
	        "values": [
	            {
	                "value": 6, 
	                "rate": "Not at all"
	            }, 
	            {
	                "value": 15, 
	                "rate": "Not very much"
	            }, 
	            {
	                "value": 9, 
	                "rate": "Medium"
	            }, 
	            {
	                "value": 12, 
	                "rate": "Very much"
	            }, 
	            {
	                "value": 3, 
	                "rate": "Tremendously"
	            }
	        ]
	    }, 
	    {
	        "categorie": "Inactive", 
	        "values": [
	            {
	                "value": 6, 
	                "rate": "Not at all"
	            }, 
	            {
	                "value": 6, 
	                "rate": "Not very much"
	            }, 
	            {
	                "value": 6, 
	                "rate": "Medium"
	            }, 
	            {
	                "value": 2, 
	                "rate": "Very much"
	            }, 
	            {
	                "value": 3, 
	                "rate": "Tremendously"
	            }
	        ]
	    }
	]

	var categorie = [];
	for(var i = 0; i < data.length; i++){
		categorie.push(data[i].categorie);
	}

	var rate = []
	for (var i = 0; i < data[0].values.length; i ++){
		rate.push(data[0].values[i].rate);
	}

	var values = [];
	for(var i = 0; i < data.length; i++){
		values.push(data[i].values);
	}
	console.log(values)

	var w = 800,
		h = 600,
		margin = 70,
		barPadding = 0.2;

	var container = d3.select("#chart")
					  .append("svg")
					  .attr("width", w + margin*2)
					  .attr("height", h + margin*2);

	var chart = container.append("g");
	var color = d3.scaleOrdinal(d3.schemeCategory20c)

	var tooltip = d3.select("#chart")
					.append("div")
					.attr("id", "tooltip");

	// 外層的群組
	var x0 = d3.scaleBand()
			   .domain(categorie)
			   // .domain(data, (d) => d.categorie)		// 這樣不行，必須是陣列形式
			   .rangeRound([0, w])
			   .padding(0.1);

	// 群組裡的每個bar
	var xScale = d3.scaleBand()
				   .domain(rate)
				   .rangeRound([0, x0.bandwidth()]);	//從外層得到每一組bar chart的寬度

	var xAxis = d3.axisBottom()
				  .scale(x0);							// x軸寬度是以外層的群組來計算

	var yScale = d3.scaleLinear()
				   .domain([0, d3.max(data, (d) => d3.max(d.values, (item) => item.value))])
				   .range([h, 0]);

	var yAxis = d3.axisLeft()
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

	var group = chart.append("g")
					 .attr("class", "group-container")
					 .selectAll(".group")
					 .data(data)
					 .enter()
					 .append("g")
					 .attrs({
					 	"class": "group",
					 	"transform": (d) => "translate(" + parseInt(margin + x0(d.categorie)) + ",0)"
					 })

	group.selectAll("rect")
		 .data((d) => d.values)
		 .enter()
		 .append("rect")
		 .attrs({
		 	"x": (d) => xScale(d.rate),
		 	"y": h,
		 	"width": xScale.bandwidth(),
		 	"height": (d) => h - yScale(0),
		 	"fill": (d) => color(d.rate),
		 	"class": "bar"
		 })
		 .transition()
 		 .duration(450)
 		 .delay((d, i) => i * 100)
 		 .attr("y", (d) => yScale(d.value))
 		 .attr("height", (d) => h - yScale(d.value));

 	group.selectAll("rect")
 		 .on("mouseover",function(d, i){
	 		tooltip.transition()
	 			   .duration(150)
	 			   // .style("opacity", 0)
	 		tooltip.html("values: " + d.value + "<br>rate: " + d.rate)
	 			   .styles({
	 			   	"opacity": 1,
	 			   	"left": (d3.event.pageX) + "px",
	 			   	"top": (d3.event.pageY) - 20 + "px",
	 			   })
	 	}).on("mouseout", function(d){
	 		tooltip.transition()
	 			   .duration(150)
	 			   .style("opacity", 0)
	 	});

 	var legend = chart.selectAll(".legend")
 					  .data(data[0].values, (d) => d)
 					  .enter()
 					  .append("g")
 					  .attrs({
 					  	"class": "legend",
 					  	"transform": (d, i) => "translate(0, " + i*18 + ")"
 					  })

 	legend.append("rect")
 		  .attrs({
 		  	"width": 12,
 		  	"height": 12,
 		  	"x": w,
 		  	"fill": (d) => color(d.rate)
 		  });

 	legend.append("text")
 		  .text((d) => d.rate)
 		  .attrs({
 		  	"x" : w - 6,
 		  	"y": 10,
 		  })
 		  .style("text-anchor", "end")


	chart.attr("transform", "translate(0, " + margin + ")")

})
