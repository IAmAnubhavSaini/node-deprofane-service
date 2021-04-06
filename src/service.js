"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var node_common_log_lib_1 = require("@f0c1s/node-common-log-lib");
var node_common_log_tag_1 = require("@f0c1s/node-common-log-tag");
var node_common_log_lib_2 = __importDefault(require("@f0c1s/node-common-log-lib"));
var node_sha_lib_1 = require("@f0c1s/node-sha-lib");
/* Colors */
var bgyellow = require('@f0c1s/color-bgyellow');
var bgred = require('@f0c1s/color-bgred');
var bgblue = require('@f0c1s/color-bgblue');
var red = require('@f0c1s/color-red');
var yellow = require('@f0c1s/color-yellow');
var green = require('@f0c1s/color-green');
var deprofane_1 = __importDefault(require("./deprofane"));
var server = require('express')();
var bodyParser = require('body-parser');
var helmet = require('helmet');
var requestID = require('@m1yh3m/requestid.middleware')().requestid;
server.use(bodyParser.urlencoded({ extended: false }));
server.use(helmet());
server.use(requestID);
var configFilename = path_1.join(__dirname, '../config.json');
var config = JSON.parse(fs_1.readFileSync(configFilename).toString());
node_common_log_lib_2.default(green(node_common_log_tag_1.TAGS.READ('FILE')), yellow(configFilename));
/* All routes go through these */
var N_A = 'Not allowed!';
var path = '/deprofane';
var allowedPath = [path];
server.all('*', requestID);
server.all('*', function (req, res, next) {
    var _path = req.path;
    node_common_log_lib_2.default(node_common_log_tag_1.TAGS.REQUEST, red(_path) + " at " + yellow(Date.now()));
    if (!allowedPath.some(function (i) { return i.endsWith(_path); })) {
        node_common_log_lib_2.default(node_common_log_tag_1.TAGS.INFO, N_A, node_common_log_lib_1.TypesEnum.WARN);
        res.status(404).send(N_A);
    }
    else {
        next();
    }
});
server.get(path, function (req, res) {
    var params = Object.keys(req.query);
    if (!params.includes('rawtext') || params.length !== 1) {
        res.status(404).send(N_A);
        return;
    }
    var input = req.query['rawtext'] || '';
    var data = JSON.stringify(deprofane_1.default(input));
    var ts = Date.now();
    var hash = node_sha_lib_1.sha256(data);
    res.send(JSON.stringify({ hash: hash, deprofane: data, ts: ts }));
});
/* SERVER IS READY */
var port = config.ports.services.deprofane;
node_common_log_lib_2.default(node_common_log_tag_1.TAGS.INFO, bgyellow("Serving deprofane service at port " + bgblue(port) + " path " + bgred(path) + "."));
server.listen(port);
//# sourceMappingURL=service.js.map