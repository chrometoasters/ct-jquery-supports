// Feature detection that can't be achieved using modernizr
// example: if ( ! CT_SUPPORTS.nthchild ) { ... }

// VALIDATION SETTINGS FOR JSHINT.COM

// This file
/*jshint browser:true, jquery:true, strict:true, devel:true */
// globals prevents an error when referencing variables/functions which are concatenated into outward-bound-vendor.combined.js
/*globals platform:true */

var CT_SUPPORTS = null; // global

(function($) {

    "use strict"; // JSHINT - Use ECMAScript 5 Strict Mode

    //alert('platform.js not loaded');

    CT_SUPPORTS = {

        is: {}, // placeholder for tests

        html_hooks: function() {

            // what: adds browser classes to the HTML element
            // how: CT_SUPPORTS.html_hooks();

            // dependencies
            if ( typeof platform === 'undefined' ) {
                // TODO throw error here
                return;
            }

            var $html = $('html'),
                platform_name = '',
                platform_layout = '',
                platform_version = '',
                platform_family = '',
                platform_family_parts = [],
                platform_product = '';

            if ( platform.name ) {
                platform_name = platform.name.toLowerCase();
            }

            if ( platform.layout ) {
                platform_layout = platform.layout.toLowerCase();
            }

            if ( platform.version ) {
                platform_version = parseInt( platform.version, 10 );
            }

            if ( platform.os ) {
                if ( platform.os.family ) {
                    platform_family = platform.os.family.toLowerCase();

                    // if OS X don't split the string
                    if ( platform_family === 'os x' ) {
                        platform_family_parts[0] = 'mac';
                    }
                    else {
                        platform_family_parts = platform_family.split(' ');
                    }
                }
            }

            if ( platform.product ) {
                platform_product = platform.product.toLowerCase();
            }

            // browser name
            if ( platform_name === 'chrome' ) {
                $html.addClass('chrome');
            }
            else if ( ( platform_name === 'ie' ) ) { // TODO: also interesting: http://ajaxian.com/archives/attack-of-the-ie-conditional-comment
                $html.addClass('ie');

                if ( platform_version === 8 ) {
                    $html.addClass('ie8');
                }
                else if ( platform_version === 9 ) {
                    $html.addClass('ie9');
                }
                else if ( platform_version === 10 ) {
                    $html.addClass('ie10');
                }
                // https://github.com/bestiejs/platform.js/issues/34
                // else if ( platform_version === 11 ) {
                //     $html.addClass('ie11');
                // }
            }
            else if ( platform_name === 'firefox' ) {
                $html.addClass('firefox');
            }
            else if ( platform_name === 'opera' ) {
                $html.addClass('opera');
            }
            else if ( platform_name === 'safari' ) {
                $html.addClass('safari');
            }

            // browser layout engine
            if ( platform_layout === 'webKit' ) {
                $html.addClass('webkit');
            }

            // os family

            if ( platform_family_parts.length > 0 ) {
                platform_family = platform_family_parts[0];
            }

            // detect and save settings
            CT_SUPPORTS.is.android = platform_family === 'android';
            CT_SUPPORTS.is.ios = platform_family === 'ios';
            CT_SUPPORTS.is.mac = platform_family === 'mac';
            CT_SUPPORTS.is.win = platform_family === 'windows';
            CT_SUPPORTS.is.iphone = platform_product === 'iphone';
            CT_SUPPORTS.is.ipad = platform_product === 'ipad';
            CT_SUPPORTS.is.ipod = platform_product === 'ipod';
            CT_SUPPORTS.is.touchscreen = CT_SUPPORTS.is.iphone || CT_SUPPORTS.is.ipad || CT_SUPPORTS.is.ipod || CT_SUPPORTS.is.android;

            if ( CT_SUPPORTS.is.ios ) {
                $('html').addClass('ios');
            }

            return true;
        },

        supported: function() {

            // what: determines whether the browser is supported by the project
            // how: CT_SUPPORTS.supported();

            // dependencies
            if ( typeof platform === 'undefined' ) {
                return;
            }

            var platform_name = '',
                platform_version = '';

            if ( platform.name ) {
                platform_name = platform.name.toLowerCase();
            }

            if ( platform.version ) {
                platform_version = parseInt( platform.version, 10 );
            }

            // unsupported browsers
            var unsupported_below_this_version = [
                { 'ie' : 8 },
                { 'safari' : 5 }
                //{ 'chrome' : 999 } // test
                // { 'ff' : 3 },
                // { 'opera' : 9.5 },
                // { 'netscape' : 8 },
            ];

            var unsupported = false;

            // check whether the browser is on the unsupported list
            $.each( unsupported_below_this_version, function( i, browser ) {

                $.each( browser, function( browser_name, min_browser_version ) {

                    if ( ( platform_name === browser_name ) && ( platform_version < min_browser_version ) ) {

                        unsupported = true;
                    }
                });
            });

            return ! unsupported;
        },

        nthchild: function() {

            // dependencies
            if ( typeof platform === 'undefined' ) {
                return;
            }

            var platform_name = '',
                platform_version = '';

            if ( platform.name ) {
                platform_name = platform.name.toLowerCase();
            }

            if ( platform.version ) {
                platform_version = parseInt( platform.version, 10 );
            }

            // unsupported browsers
            var unsupported_below_this_version = [
                {
                    'ie' : 9
                }
            ];

            var unsupported = false;

            // check whether the browser is on the unsupported list
            $.each( unsupported_below_this_version, function( i, browser ) {

                $.each( browser, function( browser_name, min_browser_version ) {

                    //var min_browser_version = parseInt( min_browser_version, 10 );

                    if ( ( platform_name === browser_name ) && ( platform_version < min_browser_version ) ) {

                        unsupported = true;
                    }
                });
            });

            return ! unsupported;
        }
    };

})(jQuery);