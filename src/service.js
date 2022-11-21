"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
var node_common_log_lib_1 = __importStar(require("@f0c1s/node-common-log-lib"));
var node_common_log_tag_1 = require("@f0c1s/node-common-log-tag");
var node_sha_lib_1 = require("@f0c1s/node-sha-lib");
var deprofane_1 = __importDefault(require("./deprofane"));
/* Colors */
var bgred = require("@f0c1s/color-bgred");
var bgblue = require("@f0c1s/color-bgblue");
var red = require("@f0c1s/color-red");
var yellow = require("@f0c1s/color-yellow");
var green = require("@f0c1s/color-green");
var server = require("express")();
var bodyParser = require("body-parser");
var helmet = require("helmet");
var requestID = require("@m1yh3m/requestid.middleware")().requestid;
server.use(bodyParser.urlencoded({ extended: false }));
server.use(helmet());
server.use(requestID);
var configFilename = (0, path_1.join)(__dirname, "../config.json");
var config = JSON.parse((0, fs_1.readFileSync)(configFilename).toString());
(0, node_common_log_lib_1.default)(green(node_common_log_tag_1.TAGS.READ("FILE")), yellow(configFilename));
/* All routes go through these */
var N_A = "Not allowed!";
var path = "/deprofane";
var allowedPath = [path];
server.all("*", requestID);
server.all("*", function (req, res, next) {
    var _path = req.path;
    (0, node_common_log_lib_1.default)(node_common_log_tag_1.TAGS.REQUEST, "".concat(red(_path), " at ").concat(yellow(Date.now())));
    if (!allowedPath.some(function (i) { return i.endsWith(_path); })) {
        (0, node_common_log_lib_1.default)(node_common_log_tag_1.TAGS.INFO, N_A, node_common_log_lib_1.TypesEnum.WARN);
        res.status(404).send(N_A);
    }
    else {
        next();
    }
});
server.get(path, function (req, res) {
    var params = Object.keys(req.query);
    if (!params.includes("rawtext") || params.length !== 1) {
        res.status(404).send(N_A);
        return;
    }
    var input = req.query["rawtext"] || "";
    var output = JSON.stringify((0, deprofane_1.default)(input));
    var ts = Date.now();
    var hash = (0, node_sha_lib_1.sha256)(output);
    res.send(JSON.stringify({ hash: hash, output: output, input: input, ts: ts }));
});
/* SERVER IS READY */
var port = process.env["PORT"] || config.ports.services.deprofane;
(0, node_common_log_lib_1.default)(node_common_log_tag_1.TAGS.INFO, "Serving deprofane service at port ".concat(bgblue(port), " path ").concat(bgred(path), "."));
server.listen(port);
//# sourceMappingURL=service.js.map