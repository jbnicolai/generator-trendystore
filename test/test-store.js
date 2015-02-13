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
        storeName: "trendystore",
        license: "someValue",
        lang: "someValue"
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.bowerrc',
      '.gitignore',
      '.editorconfig',
      '.jshintrc',
      'Gruntfile.js',
      'app/index.html',
      'app/manifest.json',
      // 'app/manifest.webapp',
      'app/styles/store.scss',
      'app/scripts/store.js',
      'app/robots.txt',
      'app/elements/elements.html',
      'app/elements/trendystore-store.html'
    ]);
  });
});
