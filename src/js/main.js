window.onload = function(){
  d3.json('./data/002_TR_L6_FOOTPATH_TRAIL.geojson', function(error, data) {
    let svg = d3.select('svg')
      .attr('width', '921px')
      .attr('height', '817px')
      .attr('padding', '0px 0px 0px 0px');

    svg.append('image')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('xlink:href','./img/6040_2_2.png');

    svg.select('body')
      .attr('margin', '0px 0px 0px 0px');

    var path = d3.geoPath();
    svg.selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
        .attr('d', path)
        .attr('fill', 'orange')
        .attr('stroke', 'black')
        .attr('stroke-width', '3');

  });
};

//d3.select('svg').append('image')
//  .attr('xlink:href','../img/6040_2_2.tif');
