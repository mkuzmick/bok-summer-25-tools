var chalk = require('chalk');

exports.red = ( ...theArguments ) => {
  for (var i = 0; i < theArguments.length; i++) {
    if (typeof theArguments[i] === 'string') {
      console.log(chalk.red(theArguments[i]));
    } else {
      console.log(chalk.red(JSON.stringify(theArguments[i], null, 4)));
    }
  }
}

exports.orange = ( ...theArguments ) => {
  for (var i = 0; i < theArguments.length; i++) {
    if (typeof theArguments[i] === 'string') {
      console.log(chalk.rgb(255,110,20)(theArguments[i]));
    } else {
      console.log(chalk.rgb(255,110,20)(JSON.stringify(theArguments[i], null, 4)));
    }
  }
}

exports.grey = ( ...theArguments ) => {
  for (var i = 0; i < theArguments.length; i++) {
    if (typeof theArguments[i] === 'string') {
      console.log(chalk.rgb(100,100,100)(theArguments[i]));
    } else {
      console.log(chalk.rgb(100,100,100)(JSON.stringify(theArguments[i], null, 4)));
    }
  }
}

exports.purple = ( ...theArguments ) => {
  for (var i = 0; i < theArguments.length; i++) {
    if (typeof theArguments[i] === 'string') {
      console.log(chalk.rgb(140,30,255)(theArguments[i]));
    } else {
      console.log(chalk.rgb(140,30,255)(JSON.stringify(theArguments[i], null, 4)));
    }
  }
}

exports.gray = ( ...theArguments ) => {
  for (var i = 0; i < theArguments.length; i++) {
    if (typeof theArguments[i] === 'string') {
      console.log(chalk.rgb(150,150,150)(theArguments[i]));
    } else {
      console.log(chalk.rgb(150,150,150)(JSON.stringify(theArguments[i], null, 4)));
    }
  }
}

exports.cyan = function( ...theArguments ){
  for (var i = 0; i < theArguments.length; i++) {
    if (typeof theArguments[i] === 'string') {
      console.log(chalk.cyan(theArguments[i]));
    } else {
      console.log(chalk.cyan(JSON.stringify(theArguments[i], null, 4)));
    }
  }
}

exports.blue = function( ...theArguments ){
  for (var i = 0; i < theArguments.length; i++) {
    if (typeof theArguments[i] === 'string') {
      console.log(chalk.blue(theArguments[i]));
    } else {
      console.log(chalk.blue(JSON.stringify(theArguments[i], null, 4)));
    }
  }
}

exports.yellow = function( ...theArguments ){
  for (var i = 0; i < theArguments.length; i++) {
    if (typeof theArguments[i] === 'string') {
      console.log(chalk.yellow(theArguments[i]));
    } else {
      console.log(chalk.yellow(JSON.stringify(theArguments[i], null, 4)));
    }
  }
}

exports.magenta = function( ...theArguments ){
  for (var i = 0; i < theArguments.length; i++) {
    if (typeof theArguments[i] === 'string') {
      console.log(chalk.magenta(theArguments[i]));
    } else {
      console.log(chalk.magenta(JSON.stringify(theArguments[i], null, 4)));
    }
  }
}
