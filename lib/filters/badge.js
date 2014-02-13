/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';


// node_modules
var file = require('fs-utils');
var minimatch = require('minimatch');
var _ = require('lodash');


module.exports = function(phaser) {
  var phaserOpts = _.extend({}, phaser.options);
  var defaults = {cwd: 'docs', ext: '.md'};

  // An array of all badge templates.
  var badges = require('readme-badges');

  /**
   * Status, analytics and version badges.
   *
   * @title badge
   * @param {Object} config
   * @param {Object} options
   * @return {Object}
   *
   * @api private
   */
  exports.badge =function (name, options) {
    var opts = _.extend({}, defaults, phaserOpts, options);
    var filepaths = _.filter(badges, function (filepath) {
      return file.basename(filepath) === name;
    });

    // if no matches, then try minimatch
    if (!filepaths || filepaths.length <= 0) {
      filepaths = badges.filter(minimatch.filter(name));
    }

    return filepaths.map(function(filepath) {
      var content = file.readFileSync(filepath, opts);
      return phaser.utils.adjust.headings(content);
    });
  };


  exports.nodei = function (opts, mos) {
    var url = 'https://nodei.co/npm';
    var name = config.name;
    opts = opts ? '?' + opts.split(',').map(function(opt) {
      return opt + '=true';
    }).join('&') : '';
    opts = opts + (mos ? '&months=' + mos : '');
    return '[![NPM]('+url+'/'+name+'.png'+opts+')]('+url+'/'+name+'/)';
  };

  _.mixin(exports);
  return exports;
};

