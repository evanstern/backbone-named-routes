module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json")
        , jshint: {
            options: {
                laxcomma: true
            }
            , ignore_warnings: {
                options: {
                    "-W030": true
                }
                , files: {
                    src: ["js/*js"]
                }
            }
        }
        , uglify: {
            options: {
                sourceMap: "dist/<%= pkg.name %>.map.js"
            }
            , build: {
                src: "js/<%= pkg.name %>.js"
                , dest: "dist/<%= pkg.name %>.min.js"
            }
        }
        , jasmine: {
            browser: {
                src: ["js/<%= pkg.name %>.js"]
                , options: {
                    specs: "test/*js"
                    , vendor: [
                        "bower_components/jquery/jquery.js"
                        , "node_modules/backbone/node_modules/underscore/underscore.js"
                        , "node_modules/backbone/backbone.js"
                    ]
                }
            }
            , amd: {
                src: ["js/<%= pkg.name %>.js"]
                , options: {
                    specs: "test/*js"
                    , template: require("grunt-template-jasmine-requirejs")
                    , templateOptions: {
                        requireConfig: {
                            baseUrl: "js/"
                            , paths: {
                                "jquery": "../bower_components/jquery/jquery"
                                , "backbone": "../node_modules/backbone/backbone"
                                , "underscore": "../node_modules/backbone/node_modules/underscore/underscore"
                            }
                            , shim: {
                                backbone: {
                                    deps: ["underscore", "jquery"]
                                    , exports: "Backbone"
                                }
                            }
                        }
                    }
                }
            }
        }
        , docco: {
            build: {
                src: ["js/<%= pkg.name %>.js"]
                , options: {
                    output: "docs/"
                }
            }
        }
    });

    // Contrib packages
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jasmine");

    // 3rd party packages
    grunt.loadNpmTasks("grunt-docco");

    grunt.registerTask("test", ["jasmine"]);
};

