module.exports = function (grunt) {
    grunt.initConfig({
        pkg: '<json:package.json>',

        // requirejs: {
        //     compile: {
        //         options: {
        //             uglify2: {
        //                 mangle: false
        //             },
        //             baseUrl: "app/scripts",
        //             mainConfigFile: "app/scripts/main.js",
        //             name: "main", // assumes a production build using almond
        //             out: "app/dist/main.js",
        //             optimize: 'uglify2'
        //         }
        //     }
        // }


        dojo: {
          dist: {
            options: {
              dojo: './src/dojo/dojo.js', // Path to dojo.js file in dojo source
              load: 'build', // Optional: Utility to bootstrap (Default: 'build')
              profile: './profiles/app.profile.js', // Profile for build
              profiles: [], // Optional: Array of Profiles for build
              appConfigFile: '', // Optional: Config file for dojox/app
              package: '', // Optional: Location to search package.json (Default: nothing)
              packages: [], // Optional: Array of locations of package.json (Default: nothing)
              require: '', // Optional: Module to require for the build (Default: nothing)
              requires: [], // Optional: Array of modules to require for the build (Default: nothing)
              action: '', // Optional: Build action, release, help. clean has been deprecated.
              cwd: './', // Directory to execute build within
              dojoConfig: '', // Optional: Location of dojoConfig (Default: null),
              // Optional: Base Path to pass at the command line
              // Takes precedence over other basePaths
              // Default: null
              basePath: ''
            }
          },
          options: {
            // You can also specify options to be used in all your tasks
            dojo: './src/dojo/dojo.js', // Path to dojo.js file in dojo source
            load: 'build', // Optional: Utility to bootstrap (Default: 'build')
            profile: './profiles/app.profile.js', // Profile for build
            profiles: [], // Optional: Array of Profiles for build
            appConfigFile: '', // Optional: Config file for dojox/app
            package: '', // Optional: Location to search package.json (Default: nothing)
            packages: [], // Optional: Array of locations of package.json (Default: nothing)
            require: '', // Optional: Module to require for the build (Default: nothing)
            requires: [], // Optional: Array of modules to require for the build (Default: nothing)
            action: '', // Optional: Build action, release, help. clean has been deprecated.
            cwd: './', // Directory to execute build within
            dojoConfig: '', // Optional: Location of dojoConfig (Default: null),
            // Optional: Base Path to pass at the command line
            // Takes precedence over other basePaths
            // Default: null
            basePath: ''
          }
        }


    })


    //grunt.loadNpmTasks('grunt-contrib-requirejs')

    grunt.loadNpmTasks('grunt-dojo');

    grunt.registerTask('default', ['dojo'])
}