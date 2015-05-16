svg = d3.select("body").append("svg").attr({
    width: window.innerWidth - 40,
    height: window.innerHeight
});

var padding = 10,
    radius = 4;

var parse = d3.time.format("%d/%m/%Y").parse;

d3.csv("stack.csv", function(d) { d.Date = parse(d.Date); return d; }, function(data) {

    var max = d3.max(data, function(d) { return d.Amount; });
    console.log(max);

    var dateScale = d3.time.scale()
        .domain(d3.extent(data, function(d) { return d.Date; }))
        .range([50, window.innerWidth - 50]);

    var amountScale = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.Amount; })])
        .range([50, window.innerHeight - 50]);

    // Define date Axis
    var dateAxis = d3.svg.axis().scale(dateScale)
        //.tickSize(100 - window.innerHeight)
        .tickSize(1)
        .orient("bottom");

    // Draw date Axis
    svg.append("g")
        .attr({
            "class": "date-axis",
            "transform": "translate(" + [0, window.innerHeight -50] + ")"
        }).call(dateAxis);

    // Define amount Axis
    var amountAxis = d3.svg.axis().scale(amountScale)
        //.tickSize(100 - window.innerHeight)
        .tickSize(1)
        .orient("left");

    // Draw amount Axis
    svg.append("g")
        .attr({
            "class": "amount-axis",
            "transform": "translate(" + 50 + ",0)"
        }).call(amountAxis);

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr({
            cx: function(d) { return dateScale(d.Date); },
            cy: function(d) { return window.innerHeight - amountScale(d.Amount); },
            r: 3,
            fill: "#fff",
            stroke: "#78B446",
            "stroke-width": 2,
            "title": function (d) { return d.Amount; },
            "data-date": function (d) { return d.Date; }
        });

});