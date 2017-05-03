'use strict';

$(document).ready(function () {
  $('#fullpage').fullpage({
    sectionsColor: ['#008080', '#111111', '#006A00', '#008080'],
    verticalCentered: true,
    paddingBottom: '4em'
  });

  var svg = d3.selectAll('svg').attr('width', '100%').attr('height', '1000').attr('padding', '0px 0px 0px 0px');

  var imagePaths = ['src/img/6040_2_2.png', 'src/img/6060_2_3.png', 'src/img/6070_2_3.png', 'src/img/6100_1_3.png'];
  $.getJSON("src/data/folderStruct.json", function (data) {
    data.forEach(function (folder, i) {
      var slide = d3.select('#s' + (i + 1) + ' .fp-tableCell');

      var imagePath = $.grep(imagePaths, function (imagePath) {
        return imagePath.includes(folder.foldername);
      });

      var imgContainer = slide.append('div').attr('class', 'd3-img-container');

      var svg = imgContainer.append('svg');

      var imgElem = svg.append('image');

      var img = new Image();

      var toggler = slide.append('button').attr('class', 'overlayToggle').text("Toggle Overlay").on('click', function () {
        slide.selectAll('.overlays').style("visibility", function () {
          return d3.select(this).style("visibility") == "hidden" ? 'visible' : 'hidden';
        });
      });

      img.src = imagePath;
      img.onload = function (img) {
        //Images are defaulting to 0,0 on some browsers. So this is a workaround
        var width = img.srcElement.width;
        var height = img.srcElement.height;
        imgElem.attr('height', height * 0.7).attr('width', width * 0.7).attr('xlink:href', imagePath);
        imgContainer.style('height', height * 0.7 + "px").style('width', width * 0.7 + "px").style('margin', "auto auto 10px auto");
      };

      folder.files.forEach(function (file) {
        d3.json('src/data/' + folder.foldername + '/' + file.filename + '.geojson', function (error, data) {
          data.features.forEach(function (feature) {
            feature.geometry.coordinates.forEach(function (coord) {
              coord.forEach(function (subCoord) {
                subCoord[0] *= folder.xFactor * 0.7;
                subCoord[1] *= folder.yFactor * 0.7;
              });
            });
          });
          var overlays = svg.append('g').attr('class', 'overlays');

          var path = d3.geoPath();
          overlays.selectAll('path').data(data.features).enter().append('path').attr('d', path).attr('fill', file.color).attr('opacity', 0.7).attr('stroke', 'black').attr('stroke-width', '1');
        });
      });
    });
  });
});
