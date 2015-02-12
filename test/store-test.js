'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('trendystore:store', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../store'))
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
      '_bowerrc',
      '_gitignore',
      '_editorconfig',
      '_jshintrc',
      '_Gruntfile.js',
      'app/_index.html',
      'app/_manifest.json',
      // 'app/manifest.webapp',
      'app/_styles/store.scss',
      'app/_scripts/store.js',
      'app/_robots.txt',
      'app/elements/_elements.html',
      'app/elements/_trendystore-store.html'
    ]);
  });
});
