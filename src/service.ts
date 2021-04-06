import {Express} from "express";
import {join} from 'path';
import {readFileSync} from 'fs';

import {TypesEnum} from '@f0c1s/node-common-log-lib';
import {TAGS} from '@f0c1s/node-common-log-tag';
import log from '@f0c1s/node-common-log-lib';
import {sha256} from '@f0c1s/node-sha-lib';

/* Colors */
const bgyellow = require('@f0c1s/color-bgyellow');
const bgred = require('@f0c1s/color-bgred');
const bgblue = require('@f0c1s/color-bgblue');
const red = require('@f0c1s/color-red');
const yellow = require('@f0c1s/color-yellow');
const green = require('@f0c1s/color-green');

import CONFIG from '../config';
import deprofane from './deprofane';

const server: Express = require('express')();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const requestID = require('@m1yh3m/requestid.middleware')().requestid;
server.use(bodyParser.urlencoded({extended: false}));
server.use(helmet());
server.use(requestID);

const configFilename = join(__dirname, '../config.json');
const config: CONFIG = JSON.parse(readFileSync(configFilename).toString());
log(green(TAGS.READ('FILE')), yellow(configFilename));

/* All routes go through these */
const N_A = 'Not allowed!'
const path = '/deprofane';
const allowedPath = [path];
server.all('*', requestID);
server.all('*', (req: { path: any }, res: any, next: () => void) => {
    const _path = req.path;
    log(TAGS.REQUEST, `${red(_path)} at ${yellow(Date.now())}`);
    if (!allowedPath.some(i => i.endsWith(_path))) {
        log(TAGS.INFO, N_A, TypesEnum.WARN);
        res.status(404).send(N_A);
    } else {
        next();
    }
});

server.get(path, (req, res) => {
    const params = Object.keys(req.query);
    if (!params.includes('rawtext') || params.length !== 1) {
        res.status(404).send(N_A);
        return
    }
    const input: string = req.query['rawtext'] as string || '';
    const data = JSON.stringify(deprofane(input));
    const ts = Date.now();
    const hash = sha256(data);
    res.send(JSON.stringify({hash, deprofane: data, ts}));
});
/* SERVER IS READY */
const port = config.ports.services.deprofane;
log(TAGS.INFO, bgyellow(`Serving deprofane service at port ${bgblue(port)} path ${bgred(path)}.`));
server.listen(port);
