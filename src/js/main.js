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
  .attr('xlink:href','./img/6040_2_2.png');

  let overlays = svg.append('g')
    .attr('id', 'overlays')

  const data =[
    {
      foldername: "6040_2_2",
      xFactor: 86154.18213583753,
      yFactor: -86143.97876810792,
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
    },
    {
      foldername: "6060_2_3",
      xFactor: 86090.55289508055,
      yFactor: -86172.56637168142,
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
        },
        {
          filename: "001_MM_L3_EXTRACTION_MINE",
          color: "gray"
        },
        {
          filename: "001_MM_L3_RESIDENTIAL_BUILDING",
          color: "indianred"
        },
        {
          filename: "001_MM_L5_MISC_SMALL_STRUCTURE",
          color: "purple"
        },
        {
          filename: "002_TR_L4_POOR_DIRT_CART_TRACK",
          color: "burlywood"
        },
        {
          filename: "003_VH_L5_SMALL_VEHICLE",
          color: "orchid"
        },
        {
          filename: "006_VEG_L3_HEDGEROWS",
          color: "yellow"
        },
        {
          filename: "007_AGR_L6_ROW_CROP",
          color: "darkolivegreen"
        },
        {
          filename: "007_AGR_L7_FARM_ANIMALS_IN_FIELD",
          color: "pink"
        },
        {
          filename: "008_WTR_L3_DRY_RIVERBED",
          color: "aqua"
        }

      ]
    },
    {
      foldername: "6070_2_3",
      xFactor: 86212.63564343251,
      yFactor: -86124.9309010503,
      files: [
        {
          filename: "002_TR_L3_GOOD_ROADS",
          color: "fuchsia"
        },
        {
          filename: "006_VEG_L5_GROUP_TREES",
          color: "green"
        },
        {
          filename: "006_VEG_L5_STANDALONE_TREES",
          color: "lightgreen"
        },
        {
          filename: "003_VH_L4_AQUATIC_SMALL",
          color: "navy"
        },
        {
          filename: "001_MM_L3_RESIDENTIAL_BUILDING",
          color: "indianred"
        },
        {
          filename: "001_MM_L5_MISC_SMALL_STRUCTURE",
          color: "purple"
        },
        {
          filename: "003_VH_L6_MOTORBIKE",
          color: "deeppink"
        },
        {
          filename: "003_VH_L5_SMALL_VEHICLE",
          color: "orchid"
        },
        {
          filename: "006_VEG_L2_SCRUBLAND",
          color: "goldenrod"
        },
        {
          filename: "006_VEG_L2_WOODLAND",
          color: "forestgreen"
        },
        {
          filename: "008_WTR_L2_STANDING_WATER",
          color: "deepskyblue"
        },
        {
          filename: "008_WTR_L3_WATERWAY",
          color: "dodgerblue"
        }

      ]
    },
    {
      foldername: "6100_1_3",
      xFactor: 86173.001310616,
      yFactor: -86153.50586153506,
      files: [
        {
          filename: "002_TR_L3_GOOD_ROADS",
          color: "fuchsia"
        },
        {
          filename: "006_VEG_L5_GROUP_TREES",
          color: "green"
        },
        {
          filename: "006_VEG_L5_STANDALONE_TREES",
          color: "lightgreen"
        },
        {
          filename: "001_MM_L3_NON_RESIDENTIAL_BUILDING",
          color: "hotpink"
        },
        {
          filename: "001_MM_L3_RESIDENTIAL_BUILDING",
          color: "indianred"
        },
        {
          filename: "001_MM_L5_MISC_SMALL_STRUCTURE",
          color: "purple"
        },
        {
          filename: "003_VH_L6_MOTORBIKE",
          color: "deeppink"
        },
        {
          filename: "003_VH_L5_SMALL_VEHICLE",
          color: "orchid"
        },
        {
          filename: "002_TR_L4_POOR_DIRT_CART_TRACK",
          color: "burlywood"
        },
        {
          filename: "002_TR_L6_FOOTPATH_TRAIL",
          color: "orange"
        },
        {
          filename: "008_WTR_L2_STANDING_WATER",
          color: "deepskyblue"
        },
        {
          filename: "007_AGR_L6_ROW_CROP",
          color: "darkolivegreen"
        },
        {
          filename: "004_UPI_L5_PYLONS",
          color: "darkgray"
        },
        {
          filename: "004_UPI_L6_SATELLITE_DISHES_DISH_AERIAL",
          color: "silver"
        },
        {
          filename: "005_VO_L6_MASTS_RADIO_TOWER",
          color: "dimgrey"
        },
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
