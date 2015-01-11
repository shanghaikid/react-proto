var profile = {
    action: "release",
    basePath:".",
    releaseDir:"./build",
    releaseName: "app",

    mini: true,

    packages: [{
            name: "dojo",
            location: "lib/dojo"
        },{
            name: "dijit",
            location: "lib/dijit"
        },{
            name: "dojox",
            location: "lib/dojox"
        },{
            name: "react",
            location: "lib/react"
        },{
            name: 'cli',
            location: 'src'
        }
    ],


    layers: {
        'cli/app': { 
            }
    },


    resourceTags: {
        amd: function(filename, mid) {
            return (/\.js$/).test(filename);
        }
    }
};