'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ace ${chalk.red('generator-yik-test')} generator!`)
    );

    const prompts = [
      {
        type: 'confirm',
        name: 'includeNormalize',
        message: 'Would you like to include normalize.css?',
        default: true
      },{
        name: 'projectName',
        message: 'Enter the name of your project'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    // fixed
    this.fs.copy(
      this.templatePath('package.json'),
      this.destinationPath('package.json')
    );
    this.fs.copy(
      this.templatePath('main.js'),
      this.destinationPath('scripts/main.js')
    );
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    // flexible
    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      this.props
    );
    this.fs.copyTpl(
      this.templatePath('main.less'),
      this.destinationPath('styles/main.less'),
      this.props
    );


  }

  install() {
    this.installDependencies();
  }
};
