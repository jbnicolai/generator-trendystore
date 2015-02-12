'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('trendystore:admin', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../admin'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withArguments(['--skip-install'])
      .withPrompt({
        githubUser: "someValue",
        storename: "someValue",
        license: "someValue",
        lang: "someValue"
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '_bower.json',
      '_package.json',
      '_.bowerrc',
      '_gitignore',
      '_editorconfig',
      '_jshintrc',
      '_Gruntfile.js',
      'app/_index.html',
      'app/_manifest.json',
      // 'app/manifest.webapp',
      'app/styles/_admin.scss',
      'app/scripts/_admin.js',
      'app/_robots.txt',
      'app/elements/_elements.html',
      'app/elements/_trendystore-admin.html'
    ]);
  });
});
