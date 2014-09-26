ct-jquery-supports
==================

User-agent based detection for features not detected by Modernizr

This plugin also adds browser identifier hooks to the `<html>` tag.

__Please note: this plugin is optimised for internal Chrometoaster use. YMMV.__

## Installation

1. In Terminal: `cd /PATH/TO/PROJECT-THEME-FOLDER`
1. `bower install https://github.com/chrometoasters/ct-jquery-supports.git#v1.0.2 --save`

Note: if you wish to customise where Bower puts installed components, you may add a `.bowerrc` file into this folder:

        {
            "directory" : "PATH/TO/COMPONENTS"
        }

## Usage

        CT_SUPPORTS.nthchild(); // returns true if :nth-child is supported
        CT_SUPPORTS.supported(); // returns true if the browser supported