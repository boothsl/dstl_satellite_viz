$(document).ready(() => {
  $('#fullpage').fullpage({
    sectionsColor: ['#008080', '#111111', '#006A00', '#008080'],
    verticalCentered: true,
    paddingBottom: '4em'
  });

  d3.selectAll('svg')
    .attr('width', '100%')
    .attr('height', '1000')
    .attr('padding', '0px 0px 0px 0px');

  const imagePaths = [
    'src/img/6040_2_2.png',
    'src/img/6060_2_3.png',
    'src/img/6070_2_3.png',
    'src/img/6100_1_3.png'
  ];

  $.getJSON('src/data/folderStruct.json', (data) => {
    data.forEach((folder, i) => {
      const slide = d3.select(`#s${i + 1} .fp-tableCell`);

      const imagePath = $.grep(imagePaths, x => x.indexOf(folder.foldername) !== -1);

      const imgContainer = slide.append('div')
        .attr('class', 'd3-img-container');

      const svg = imgContainer.append('svg');

      const imgElem = svg.append('image');


      slide.append('button')
        .attr('class', 'overlayToggle')
        .text('Toggle Overlay')
        .on('click', () => {
          slide.selectAll('.overlays')
          .style('visibility', function () {
            return d3.select(this).style('visibility') === 'hidden' ? 'visible' : 'hidden';
          });
        });

      const image = new Image();
      image.src = imagePath;
      image.onload = (img) => { // Images are defaulting to 0,0 on some browsers.
        const width = img.srcElement.width;
        const height = img.srcElement.height;
        imgElem.attr('height', height * 0.7)
          .attr('width', width * 0.7)
          .attr('xlink:href', imagePath);
        imgContainer.style('height', `${height * 0.7}px`)
          .style('width', `${width * 0.7}px`)
          .style('margin', 'auto auto 10px auto');
      };

      folder.files.forEach((file) => {
        d3.json(`src/data/${folder.foldername}/${file.filename}.geojson`, (geoJSONData) => {
          geoJSONData.features.forEach((feature) => {
            feature.geometry.coordinates.forEach((coord) => {
              coord.forEach((subCoord) => {
                subCoord[0] *= folder.xFactor * 0.7;
                subCoord[1] *= folder.yFactor * 0.7;
              });
            });
          });
          const overlays = svg.append('g')
          .attr('class', 'overlays');

          const path = d3.geoPath();
          overlays.selectAll('path')
            .data(geoJSONData.features)
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', file.color)
            .attr('opacity', 0.7)
            .attr('stroke', 'black')
            .attr('stroke-width', '1');
        });
      });
    });
  });
});
