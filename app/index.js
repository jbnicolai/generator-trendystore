'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var _s = require('underscore.string');
var path = require('path');

var githubOptions = {
  version: '3.0.0'
};

var GitHubApi = require('github');
var github = new GitHubApi(githubOptions);

if (process.env.GITHUB_TOKEN) {
  github.authenticate({
    type: 'oauth',
    token: process.env.GITHUB_TOKEN
  });
}

var defaultGithubUserInfo = {
  name: '',
  email: '',
  html_url: ''
};

var githubUserInfo = function(name, cb, log) {
  github.user.getFrom({
    user: name
  }, function(err, res) {
    if(err) {
      log.error('I wasn\'t able to find your github profile, please check if you\'ve typed it correctly.');
      res = defaultGithubUserInfo;
    }
    cb(JSON.parse(JSON.stringify(res)));
  });
};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
    this.currentYear = (new Date()).getFullYear();
  },

  prompting: function () {
    var done = this.async();
    var description = "I am made with [generator-trendystore](https://github.com/basicelements/generator-trendystore)"

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the neat' + chalk.red('Trendystore') + ' generator!'
    ));

    var prompts = [{
      name: 'githubUser',
      message: 'Enter a GitHub username.',
      default: 'userName'
    },{
      name: 'storeName',
      message: 'How would you like to name your store?',
      default: 'storeName'
    },{
      name: 'description',
      message: 'Add a description',
      default: 'description'
    },{
      name: 'license',
      message: 'Wich license do you wanne use?',
      default: 'MIT'
    },{
      name: 'lang',
      message: 'The Default language',
      default: 'en'
    },{
      name: 'includeSass',
      message: 'would you like to use SASS/SCSS?',
      default: 'yes'
    }];

    this.prompt(prompts, function (props) {
      this.githubUser = props.githubUser;
      this.storename = props.storeName;
      this.description = props.description;
      this.license = props.license;
      this.lang = props.lang;
      this.includeSass = props.includeSass;

      // Save config to .yo-rc.json file
      this.config.set({
        storename: this.storename,
        lang: this.lang,
        includeSass: this.includeSass
      });
      this.config.save();

      done();
    }.bind(this));
  },
  configuring: {
    userInfo: function () {
      var done = this.async();

      githubUserInfo(this.githubUser, function (res) {
        /*jshint camelcase:false */
        this.realname = res.name;
        this.email = res.email;
        this.githubUrl = res.html_url;
        done();
      }.bind(this), this.log);
    }
  },

  writing: {
    projectfiles: function () {
      this.copy('_editorconfig', '.editorconfig');
      this.copy('_jshintrc', '.jshintrc');
      this.copy('_gitignore', '.gitignore');
      this.copy('_bowerrc', '.bowerrc');
      this.copy('_Gruntfile.js', 'Gruntfile.js');
    },
    templates: function () {
      this.template('_package.json', 'package.json');
      this.template('_bower.json', 'bower.json');
      this.template('_README.md', 'README.md');
      this.template('app/_index.html', 'app/index.html');
      this.template('app/_manifest.json', 'app/manifest.json');
      this.template('app/elements/_elements.html', 'app/elements/elements.html');
      this.template('app/elements/_trendystore-store.html', 'app/elements/' +this.storename '-store/' + this.storename + '-store.html');
      this.template('app/elements/_trendystore-admin.html', 'app/elements/' +this.storename '-admin/' + this.storename + '-admin.html');
      this.template('app/elements/_trendystore-store.css', 'app/elements/' +this.storename '-store/' this.includeSass ? +this.storename '-store.scss' : + this.storename + '-store.css');
      this.template('app/elements/_trendystore-admin.css', 'app/elements/' +this.storename '-admin/' this.includeSass ? +this.storename '-admin.scss' : + this.storename + '-admin.css');
    },
    app: function () {
      this.copy('app/scripts/_store.js', 'app/scripts/store.js');
      this.copy('app/scripts/_admin.js', 'app/scripts/admin.js');
      this.copy('app/styles/main.css', this.includeSass ? 'app/styles/main.scss':'app/styles/main.css');
      this.copy('app/_robots.txt', 'app/robots.txt');
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
