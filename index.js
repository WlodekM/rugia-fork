/* 
 * Copyright (C) 2025 Emilia Luminé <eqilia@anational.shitposting.agency>
 *
 * This file is part of Rugia, from Chat Domestique (chat.eqilia.eu)
 *
 * Rugia is free software: you can redistribute it and/or modify it under the
 * terms of the GNU Affero General Public License, version 3.
 * 
 * Rugia is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 * You should've received a copy of the GNU Affero General Public License v3 along
 * with Rugia. If not, see <https://www.gnu.org/licenses>
*/

import path from "node:path";
import fs from "node:fs";

import sqlite3 from "better-sqlite3";
import events from "eventemitter3";
import express from "express";
import ews from "express-ws";
import ansi from "ansi";

const __dirname = import.meta.dirname;

const database = new sqlite3("./database.db");
const stderr = ansi(process.stderr);
const app = express();

const mainLoop = new events();
app.use(express.json());
ews(app);

globalThis.mainLoop = mainLoop;
globalThis.database = database;
await import("./libs/data.js");

app.use((_req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	next();
});

app.use(async (req, res, next) => {
	const start = Date.now();

	req.on("end", async () => {
		printMethod(req.method);
		printStatusCode(res.statusCode);
		printLatency(Date.now() - start);

		stderr.write(`${req.path}\n`);
	});

	next();
});

async function sleep(ms) {
	await new Promise((a) => setTimeout(a, ms));
	return;
}

function printMethod(method) {
	switch (method.toUpperCase()) {
		case "GET":
			stderr.green().write(method);
			break;
		case "POST":
			stderr.blue().write(method);
			break;
		default:
			stderr.red().write(method);
			break;
	}
	stderr.write(" ").reset();

	return;
}

function printLatency(latency) {
	stderr.brightCyan();

	if (latency > 3) {
		stderr.cyan();
	}

	if (latency > 20) {
		stderr.green();
	}

	if (latency > 40) {
		stderr.yellow();
	}

	if (latency > 50) {
		stderr.brightYellow();
	}

	if (latency > 80) {
		stderr.brightRed();
	}

	if (latency > 100) {
		stderr.red();
	}

	if (latency > 250) {
		stderr.black();
	}

	stderr.write(latency.toString()).write("ms ").reset();
}

function printStatusCode(statusCode) {
	const stringCode = statusCode.toString();
	const colour = statusCode / 100;

	stderr.bold();

	switch (colour) {
		case 2:
			stderr.brightGreen();
			break;
		default:
			stderr.brightRed();
			break;
	}

	stderr.write(stringCode).reset().write(" ");
}


globalThis.loadApis = async () => {
	const apisDir = fs.readdirSync('./apis');

	for (let i = 0; i < apisDir.length; i++) {
		const apisModulePath = path.join(__dirname, "./apis", apisDir[i], 'index.js');
		const apisModule = await import(apisModulePath);

		process.stdout.write(`${apisModule.basePath}\n`);

		for (let j = 0; j < apisModule.routes.length; j++) {
			const route = apisModule.routes[j];

			app[route.method](`${apisModule.basePath}${route.path}`, route.execute);

			process.stdout.write(`\t${route.method.toUpperCase()}\t${apisModule.basePath}${route.path}\n`);
		}
	}

	process.stdout.write('\n');
}
globalThis.loadApis();

(async () => {
	app.listen(40000, () => {
		process.stderr.write("OK\n");
	});
})();
