'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('trendystore:admin test', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
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
      'app/styles/admin.scss',
      'app/scripts/admin.js',
      'app/robots.txt',
      'app/elements/elements.html',
      'app/elements/trendystore-admin'
    ]);
  });
});
