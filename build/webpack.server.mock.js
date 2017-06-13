var fs = require('fs');
var assert = require('assert');
var chokidar = require('chokidar');
var chalk = require('chalk');
var proxy = require('express-http-proxy');
var url = require('url');
var { join } = require('path');
var bodyParser = require('body-parser');
var { paths } = require('./webpack.config.base');

let error = null;

const mockFiles = [];
const mock = {};
fs.readdirSync(join(paths.appSrc, 'mock')).forEach(function(file) {
  filepath = join(paths.appSrc, 'mock', file);
  mockFiles.push(filepath);
	Object.assign(mock, require(filepath));
})


function createMockHandler(method, path, value) {
  return function mockHandler(...args) {
    const res = args[1];
    if (typeof value === 'function') {
      value(...args);
    } else {
      res.json(value);
    }
  };
}

function createProxy(method, path, target) {
  return proxy(target, {
    filter(req) {
      return method ? req.method.toLowerCase() === method.toLowerCase() : true;
    },
    forwardPath(req) {
      let matchPath = req.baseUrl;
      const matches = matchPath.match(path);
      if (matches.length > 1) {
        matchPath = matches[1];
      }
      return join(winPath(url.parse(target).path), matchPath);
    },
  });
}

function applyMock(devServer) {
  const realRequire = require.extensions['.js'];
  try {
    realApplyMock(devServer);
    error = null;
  } catch (e) {
    // 避免 require mock 文件出错时 100% cpu
    require.extensions['.js'] = realRequire;

    error = e;

    console.log();
    outputError();
  }
}

function realApplyMock(devServer) {
  const config = mock;
  const files = mockFiles;
  const app = devServer.app;

  devServer.use(bodyParser.json({ limit: '5mb' }));
  devServer.use(bodyParser.urlencoded({
    extended: true,
    limit: '5mb',
  }));

  Object.keys(config).forEach((key) => {
    const keyParsed = parseKey(key);
    assert(
      !!app[keyParsed.method],
      `method of ${key} is not valid`
    );
    assert(
      typeof config[key] === 'function' ||
      typeof config[key] === 'object' ||
      typeof config[key] === 'string',
      `mock value of ${key} should be function or object or string, but got ${typeof config[key]}`
    );
    if (typeof config[key] === 'string') {
      let path = keyParsed.path;
      if (/\(.+\)/.test(keyParsed.path)) {
        path = new RegExp(`^${keyParsed.path}$`);
      }
      app.use(
        path,
        createProxy(keyParsed.method, path, config[key])
      );
    } else {
      app[keyParsed.method](
        keyParsed.path,
        createMockHandler(keyParsed.method, keyParsed.path, config[key])
      );
    }
  });

  // 调整 stack，把 historyApiFallback 放到最后
  let lastIndex = null;
  app._router.stack.forEach((item, index) => {
    if (item.name === 'webpackDevMiddleware') {
      lastIndex = index;
    }
  });
  const mockAPILength = app._router.stack.length - 1 - lastIndex;
  if (lastIndex && lastIndex > 0) {
    const newStack = app._router.stack;
    newStack.push(newStack[lastIndex - 1]);
    newStack.push(newStack[lastIndex]);
    newStack.splice(lastIndex - 1, 2);
    app._router.stack = newStack;
  }

  const watcher = chokidar.watch(files, {
    ignored: /node_modules/,
    persistent: true,
  });
  watcher.on('change', (path) => {
    console.log(chalk.green('CHANGED'), path.replace(paths.appDirectory, '.'));
    watcher.close();

    // 删除旧的 mock api
    app._router.stack.splice(lastIndex - 1, mockAPILength);

    applyMock(devServer);
  });
}

function parseKey(key) {
  let method = 'get';
  let path = key;

  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ');
    method = splited[0].toLowerCase();
    path = splited[1];
  }

  return { method, path };
}

function outputError() {
  if (!error) return;

  const filePath = error.message.split(': ')[0];
  const relativeFilePath = filePath.replace(paths.appDirectory, '.');
  const errors = error.stack.split('\n')
    .filter(line => line.trim().indexOf('at ') !== 0)
    .map(line => line.replace(`${filePath}: `, ''));
  errors.splice(1, 0, ['']);

  console.log(chalk.red('Failed to parse mock config.'));
  console.log();
  console.log(`Error in ${relativeFilePath}`);
  console.log(errors.join('\n'));
  console.log();
}

module.exports = {
  applyMock
}
