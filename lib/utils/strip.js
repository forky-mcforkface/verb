/**
 * phaser <https://github.com/jonschlinkert/phaser>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

/**
 * Strip newlines and whitespace padding.
 *
 * @name reverse
 * @param  {String} str The string to reverse
 * @return {String}     The reversed string.
 * @api public
 */

module.exports = function(str) {
  str = str || '';
  str = str.replace(/^\s+/gm, '');
  str = str.replace(/\s+$/gm, '');
  str = str.replace(/\n+/gm, ' ');
  return str;
};