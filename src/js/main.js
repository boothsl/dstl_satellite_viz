window.onload = function(){
  //var fs = require('fs');
  //var files = fs.readdirSync('./data/6040_2_2');
  let svg = d3.select('svg')
  .attr('width', '1089px')
  .attr('height', '1079px')
  .attr('padding', '0px 0px 0px 0px');

  //const data = $.getJSON("folderStruct.json");

  const imagePaths = [
    './img/6040_2_2.png',
    './img/6060_2_3.png',
    './img/6070_2_3.png',
    './img/6100_1_3.png'
  ]
  $.getJSON("./data/folderStruct.json", (data) => {
    data.forEach((folder, i) => {
    let slide = svg.append('g')
    .attr('class', 'slide')
    .attr('id', i+1)
    .style('visibility', 'hidden');

    let imagePath = imagePaths.find(imagePath => imagePath.includes(folder.foldername));

    slide.append('image')
    .attr('xlink:href', imagePath);

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
          let overlays = slide.append('g')
          .attr('class', 'overlays');

          let path = d3.geoPath();
          overlays.selectAll('path')
          .data(data.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', file.color)
          .attr('stroke', 'black')
          .attr('stroke-width', '1');
        });
      });
    });
  });

  $('#start').on('click', () => {
    const slides = $('.slide').toArray();
    let newSlide = slides[slides.length-1];
    newSlide.style.visibility = 'visible';

    $('#overlayToggle').on('click', () => {
      $('.overlays').toggle()
    });

    d3.select('#next').on('click', () => {
      let oldSlide = newSlide;
      if (slides.length-1 == slides.indexOf(oldSlide)){
        newSlide = slides[0];
      } else {
        newSlide = slides[slides.indexOf(oldSlide) + 1];
      }
      newSlide.style.visibility = 'visible';
      d3.select(oldSlide).transition()
        .duration(500)
        .attr('transform', "translate(-1000, 0)")
        .on('end', function(){
          oldSlide.parentNode.prepend(oldSlide);
          oldSlide.style.visibility = 'hidden';
          oldSlide.setAttribute('transform', "translate(0, 0)");
        });
      });

    $('#previous').on('click', () => {
      let oldSlide = newSlide;
      if (slides.indexOf(oldSlide) == 0){
        newSlide = slides[slides.length-1];
      } else{
        newSlide = slides[slides.indexOf(oldSlide) - 1];
      }
      newSlide.style.visibility = 'visible';
      d3.select(oldSlide).transition()
        .duration(500)
        .attr('transform', "translate(2000, 0)")
        .on('end', function(){
          oldSlide.parentNode.prepend(oldSlide);
          oldSlide.style.visibility = 'hidden';
          oldSlide.setAttribute('transform', "translate(0, 0)");
        });
    });

  });
};
