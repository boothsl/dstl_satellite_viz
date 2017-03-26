function overlayFunc() {
  let overlays = document.getElementById('overlays');
  if(overlays.style.visibility == 'hidden') {
    overlays.style.visibility = 'visible';
  }
  else {
    overlays.style.visibility = 'hidden';
  }

}
window.onload = function(){
  //var fs = require('fs');
  //var files = fs.readdirSync('./data/6040_2_2');
  let svg = d3.select('svg')
  .attr('width', '789px')
  .attr('height', '779px')
  .attr('padding', '0px 0px 0px 0px');

  svg.append('image')
  .attr('x', 0)
  .attr('y', 0)
  .attr('width', '100%')
  .attr('height', '100%')
  .attr('xlink:href','./img/6040_2_2b.png');

  let overlays = svg.append('g')
    .attr('id', 'overlays')

  const data =[
    {
      foldername: "6040_2_2",
      files: [
        {
          filename: "002_TR_L6_FOOTPATH_TRAIL",
          color: "orange"
        },
        {
          filename: "006_VEG_L5_GROUP_TREES",
          color: "green"
        },
        {
          filename: "006_VEG_L5_STANDALONE_TREES",
          color: "lightgreen"
        }
      ]
    }
  ]
  data.forEach(folder => {
    folder.files.forEach(file => {
      d3.json('./data/'+folder.foldername+'/'+file.filename+'.geojson', function(error, data) {
        data.features.forEach(feature => {
          feature.geometry.coordinates.forEach(coord => {
            coord.forEach(subCoord => {
              subCoord[0] *= 789 /0.009158;
              subCoord[1] *= -779 /0.009043;
            });
          });
        });
        console.log(data);

        let path = d3.geoPath();

        overlays.append('g').selectAll('path')
        .data(data.features)
        .enter()
        //.attr('x', 100)
        //.attr('y', 100)
        .append('path')
        .attr('d', path)
        .attr('fill', file.color)
        .attr('stroke', 'black')
        .attr('stroke-width', '1');

      });
    });
  });

};
