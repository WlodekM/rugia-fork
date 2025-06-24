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

const __dirname = import.meta.dirname;

const routes = [];
const validateToken = database.prepare("SELECT userId FROM meowerchat_tokens WHERE token = ?;");

const dirReading = fs.readdirSync(path.join(__dirname, "./routes"));
for (let i = 0; i < dirReading.length; i++) {
	const module = await import(path.join(__dirname, "./routes", dirReading[i]));
	if (module.authRequired) {
		const newModule = {
			method: module.method,
			path: module.path,
			execute: async (req, res, next) => {
				if (typeof req.headers["authorization"] !== "string") {
					res.status(401);
					res.json({ error: -7, message: "this is one of the messages where the status code actually makes sense. go read it!!" });

					return;
				}

				const userId = globalThis.verifyToken(req.headers["authorization"]);
				if (userId === null) {
					res.status(401);
					res.json({ error: -7, message: "this is one of the messages where the status code actually makes sense. go read it!!" });

					return;
				}
				console.log(userId);

				req.userId = userId;
				await module.execute(req, res, next);
			}
		}

		routes.push(newModule);
	} else {
		routes.push(module);
	}
}

export default {
	basePath: "/api/v0/",
	routes
};
