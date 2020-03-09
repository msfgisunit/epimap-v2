/* Configuration file - epiMap
 * Change the webmap' settings here, accordingly with the associated comments (lines starting with "//").
 * Please keep in mind that parameters are case-sensitives.
 */
const config = {
  // Name of your epimap version
  name: 'This is a demo epimap',

  //DROPDOWNS LISTS CONFIGURATION
  time: {
    // Set to "true" for each time unit you want analysis, else set to "false"
    year: true,
    month: true,
    week: true,
    day: true
  },
  geography: {
    // Set to "true" for each geographic level you want analysis, else set to "false"
    level1: {
      exist: false,
      name: 'Country'//Name of your level, put it in the singular
    },
    level2: {
      exist: true,
      name: 'Region'//Name of your level, put it in the singular
    },
    level3: {
      exist: true,
      name: 'District'//Name of your level, put it in the singular
    }
  },
  disease: [
    // Copy and change this block for every disease you want to add to analysis
    {//From here...
      // The name of your disease
      name: 'Choléra',
      // The code of your disease, it has to be the same than in CSV header
      code: 'chl',
      // Configure each indicator for each disease
      indicators: {
        // Cases: just set to "true" or "false"
        case: true,
        // Deaths: just set to "true" or "false"
        death: true,
        // Attack rate: set exist to "true" or "false", if setted to true, personalize the multiplier, tresholds, and colors
        // if setted to false, you can let default values
        attack: {
          exist: true,
          // Multiplier for Attack rate
          multiplier: 100,
          // Tresholds for Attack rate
          tresholds: [0.01, 0.05, 0.1, 0.5, 0.8],
          // Colors for polygons, include 0 (first color), from 0 to first treshold, betweend every tresholds, and superior to last treshold (last color)
          // If you have 5 tresholds, you need 7 colors
          colors: ["#FFF", "#FFE9E0", "#FFC7B4", "#FFA791", "#FF8875", "#E75B5B","#B8474F"]
        },
        // lethality: This indicator can be calculated by the app if cases and deaths are filled in the dataset
        // set exist to "true" or "false", if setted to true, personalize the multiplier, tresholds, and colors
        // if setted to false, you can let default values
        lethality: {
          exist: true,
          // Multiplier for lethality
          multiplier: 100,
          // Tresholds for lethality
          tresholds: [0.0001, 0.0002, 0.0005, 0.0009],
          // Colors for polygons, include 0 (first color), from 0 to first treshold, betweend every tresholds, and superior to last treshold (last color)
          // If you have 5 tresholds, you need 7 colors
          colors: ["#FFF", "#FFE9E0", "#FFA791","#E75B5B","#E75B5B","#B8474F"]
        }
      }
    },//...to here
    {
      name: 'Méningite',
      code: 'mgt',
      indicators: {
        case: true,
        death: true,
        attack: {
          exist: false,
          multiplier: 10000,
          tresholds: [0.2, 0.5, 0.8, 1.5, 2],
          colors: ["#FFF", "#FFE9E0", "#FFC7B4", "#FFA791", "#FF8875", "#E75B5B","#B8474F"]
        },
        lethality: {
          exist: false,
        }
      }
    }
  ],

  // MAP ITEMS CONFIGURATION
  // You can get hexa color codes here: https://htmlcolorcodes.com/
  mapping: {
    // Color of polygons without data, only hexa color code is accepted
    no_data: '#9fa6a6',
    // Circles border color, only hexa color code is accepted
    circles_contour: "#000",
    // Circles fill color, only hexa color code is accepted
    circles_fill: "#e91625",
    // Circles max radius, integers values only
    circles_radius: 75,
  },

  // CONFIGURE APPLICATION INITIALISATION (to fill with values you have in your dataset)
  initialisation: {
    time: 'month',//Accepted values: 'year', 'month', 'week', 'day'
    geography: 'level2',//Accepted values: 'level1', 'level2', 'level3'
    disease: 'chl'//Accepted values: any of your diseases code
  },
  // INFOS BOX
  informations:{
    open_by_default: false,//Accepted values: true / false
    content: `<p>This information window is used to present the end-user with contextual or explicative content, or to provide additionnal information such as the source of spatial and epidemiological data. For instance:</p>
<p>This is a <strong>demo Epimap</strong> made with love by MSF GIS-Unit. It is based on GIS-Unit Health Boundaries geodata and mock epidemiological dataset. These are originally based on real figures, but have been significantly altered for demonstration purposes. Thus, Epidemiological data visible on the Epimap data <span style="text-decoration: underline;">must not&nbsp;be considered as real</span>. The GIS-Unit would like to thanks MSF SiS Dakar for providing original material used as base to create it.</p>`
  }
}
