$(function(){
	const dataset = [
	  {
	    language: 'Rust',
	    value: 78.9,
	    color: '#000000'
	  },
	  {
	    language: 'Kotlin',
	    value: 75.1,
	    color: '#00a2ee'
	  },
	  {
	    language: 'Python',
	    value: 68.0,
	    color: '#fbcb39'
	  },
	  {
	    language: 'TypeScript',
	    value: 67.0,
	    color: '#007bc8'
	  },
	  {
	    language: 'Go',
	    value: 65.6,
	    color: '#65cedb'
	  },
	  {
	    language: 'Swift',
	    value: 65.1,
	    color: '#ff6e52'
	  },
	  {
	    language: 'JavaScript',
	    value: 61.9,
	    color: '#f9de3f'
	  },
	  {
	    language: 'C#',
	    value: 60.4,
	    color: '#5d2f8e'
	  },
	  {
	    language: 'F#',
	    value: 59.6,
	    color: '#008fc9'
	  },
	  {
	    language: 'Clojure',
	    value: 59.6,
	    color: '#507dca'
	  }
	];
	var w = 800,
		h = 400,
		margin = 30;

	d3.select("#chart")
	  .append("svg")
	  .attr("width", w + margin*2)
	  .attr("height", h + margin*2);

	var container = d3.select("#chart svg");

	const chart = container.append("g");

	const xScale = d3.scaleBand()
					 .domain(dataset.map((s) => s.language))
					 .padding(0.2)
					 .range([0,w]);

	const yScale = d3.scaleLinear()
					 .domain([0, d3.max(dataset, (d) => d["value"])])
					 .range([h, 0]);

	chart.append("g")
		 .attr("id", "x-axis")
		 .attr("transform", `translate(${margin}, ${h})`)
		 .call(d3.axisBottom(xScale));

	chart.append("g")
		 .attr("id", "y-axis")
		 .attr("transform", "translate(" + margin + ", 0)")
		 .call(d3.axisLeft(yScale));

	chart.append("g")
		 .selectAll("rect")
		 .data(dataset)
		 .enter()
		 .append("rect")
		 .attr("x", (d, i) => xScale(d.language))
		 .attr("y", (d) => yScale(d.value))
		 .attr("width", xScale.bandwidth)
		 .attr("height", (d) => h - yScale(d.value))
		 .attr("fill", "navy")
		 .attr("transform", "translate(" + margin + ", 0)");

	chart.attr("id", "container")
		 .attr("transform", "translate(0, " + margin + ")");

	// container.selectAll("rect")
	// 		 .data(dataset)
	// 		 .enter()
	// 		 .append("rect")
	// 		 .attr("x", (d, i) => xScale(d.language))
	// 		 .attr("y", (d) => yScale(d.value))
	// 		 .attr("width", xScale.bandwidth)
	// 		 .attr("height", (d) => h - yScale(d.value))
	// 		 .attr("fill", "navy");
})