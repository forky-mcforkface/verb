#!/usr/bin/env node

var path = require('path');
var mapCommands = require('map-config');
var processArgv = require('base-argv').processArgv();
var minimist = require('minimist');
var utils = require('./lib/utils');
var Verb = require('./');

// parse argv
var args = minimist(process.argv.slice(2), {
  alias: {verbose: 'v'}
});

Verb.use(function(app) {
  app.set('cache.argv', processArgv(args));
});

// register `runner` as a mixin
Verb.mixin(utils.runner('verb', 'verbApp'));

/**
 * Get the `base` instance of verb to use for
 * registering all other instances. This will either
 * be local to the user (e.g. `node_modules/verb`)
 * or a globally installed module
 */

var base = Verb.getConfig('verbfile.js', __dirname);

/**
 * Custom base-cli command mappings.
 */

var cli = mapCommands(base)
  .map('save', function(val) {
    console.log(val)
  })
  .map('data', function(val) {
    app.visit('data', val);
  })
  .map('cwd', function(fp) {
    app.option('cwd', fp);
  });

var argv = base.processArgv(args);
cli.process(argv.options);

/**
 * Resolve config files (`verbfile.js`)
 */

base.resolve({pattern: 'verb-*/verbfile.js', cwd: '@/'});

/**
 * Run verbApps and tasks
 */

base.cli.map('verbApps', function(verbApps) {
  if (!verbApps.length) {
    if (base.tasks.hasOwnProperty('default')) {
      verbApps = [{base: ['default']}];
    } else {
      console.log(' no default task is defined.');
      utils.timestamp('done');
      return;
    }
  }

  base.runVerbApps(verbApps, function(err) {
    if (err) return console.error(err);
    utils.timestamp('done');
  });
});

/**
 * Process args
 */

base.cli.process(args);