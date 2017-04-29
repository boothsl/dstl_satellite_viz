$(document).ready(function() {
	$('#fullpage').fullpage({
      sectionsColor: ['#33A0A0','#AAAAAA','#00AB00'],
      verticalCentered: true,
      paddingBottom: '4em'
  });
  //var fs = require('fs');
  //var files = fs.readdirSync('./data/6040_2_2');
  let svg = d3.select('svg')
  .attr('width', '100%')
  .attr('height', '1000')
  .attr('padding', '0px 0px 0px 0px');

  //const data = $.getJSON("folderStruct.json");

  const imagePaths = [
    'src/img/6040_2_2.png',
    'src/img/6060_2_3.png',
    'src/img/6070_2_3.png',
    'src/img/6100_1_3.png'
  ]
  $.getJSON("src/data/folderStruct.json", (data) => {
    data.forEach((folder, i) => {
    let slide = svg.append('g')
    .attr('class', 'slide')
    .attr('id', i)
    .attr('visibility', 'hidden');

    let imagePath = imagePaths.find(imagePath => imagePath.includes(folder.foldername));

    let imgElem = slide.append('image')
    let img = new Image();
    img.src = imagePath;
    img.onload = (img) => { //Images are defaulting to 0,0 on some browsers. So this is a workaround
      let width = img.srcElement.width;
      let height = img.srcElement.height;
      imgElem.attr('height', height)
      .attr('width', width)
      .attr('xlink:href', imagePath);
    };

    //.attr('xlink:href', imagePath)
    //.attr('width', '750px')
    //.attr('height', '750px');

      folder.files.forEach(file => {
        d3.json('src/data/'+folder.foldername+'/'+file.filename+'.geojson', function(error, data) {
          data.features.forEach(feature => {
            feature.geometry.coordinates.forEach(coord => {
              coord.forEach(subCoord => {
                subCoord[0] *= folder.xFactor;
                subCoord[1] *= folder.yFactor;
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
    slides.forEach(x => x.style.visibility = 'visible');
    let newSlide = slides[slides.length-1];

    $('#overlayToggle').on('click', () => {
      $('.overlays').toggle()
    });

    d3.select('#next').on('click', () => {
      let oldSlide = newSlide;
      if (slides.indexOf(oldSlide) == 0){
        newSlide = slides[slides.length-1];
      } else {
        newSlide = slides[slides.indexOf(oldSlide) - 1];
      }
      d3.select(oldSlide).transition()
        .duration(500)
        .attr('transform', "translate(1000, 0)")
        .on('end', function(){
          $(oldSlide.parentNode).prepend(oldSlide);
        })
        .transition()
          .duration(500)
          .attr('transform', "translate(0, 0)")
      });

    $('#previous').on('click', () => {
      let oldSlide = newSlide;
      if (slides.indexOf(oldSlide) == slides.length-1){
        newSlide = slides[0];
      } else{
        newSlide = slides[slides.indexOf(oldSlide) + 1];
      }
      d3.select(newSlide).transition()
        .duration(500)
        .attr('transform', "translate(1000, 0)")
        .on('end', function(){
          $(oldSlide.parentNode).append(newSlide);
        })
        .transition()
          .duration(500)
          .attr('transform', "translate(0, 0)");
    });
  });
});
