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

const path = require("node:path");
const fs = require("node:fs");

const routes = [];

const dirReading = fs.readdirSync(path.join(__dirname, "./routes"));
for (let i = 0; i < dirReading.length; i++) {
	const module = require(path.join(__dirname, "./routes", dirReading[i]));
	routes.push(module);
}

module.exports = {
	basePath: "/api/v0/auth/",
	routes
};
