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

const acquireAccountByUsername = database.prepare("SELECT userId FROM meowerchat_authentication WHERE username = ?;");
const acquireIdByUsername = database.prepare("SELECT userId FROM meowerchat_authentication WHERE username = ?;");
const acquirePasshashById = database.prepare("SELECT passwordHash FROM meowerchat_authentication WHERE userId = ?;");
const addToken = database.prepare("INSERT INTO meowerchat_tokens VALUES (?, ?);");

const crypto = require("node:crypto");
const bcrypt = require("bcrypt");

function bssha256(data) {
	return crypto.createHash("sha256").update(data).digest("base64");
}

function createToken(userId) {
	const data = crypto.randomBytes(32).toString("hex");
	addToken.run(data, userId);

	return data;
}

module.exports = {
	method: "post",
	path: "login",
	async execute(req, res, next) {
		if (typeof req.body !== "object") {
			res.status(412);
			res.json({ error: -1, message: "THIS IS A MATTRESS STORE NOT A MOTHERFUCKING SOUP STORE"});
			return;
		}
		
		if (typeof req.body.username !== "string" || typeof req.body.password !== "string") {
			res.status(406);
			res.json({ error: -2, message: "gimme an username and a password you ASSHAT" });
			return;
		}
		
		if (req.body.username.length < 6) {
			res.status(402);
			res.json({ error: -3, message: "bitch" });
			return;
		}
		
		if (acquireAccountByUsername.get(req.body.username) === undefined) {
			res.status(417);
			res.json({ error: -4, message: "USED USERNAME PLEASE" });
			return;
		}
		
		const userId = acquireIdByUsername.get(req.body.username).userId;
		// what the fuck?
		const passhash = acquirePasshashById.get(userId)?.passwordHash;
		const isTrue = await bcrypt.compare(bssha256(req.body.password), passhash);
		
		if (!isTrue) {
			res.status(403);
			res.json({
				error: -5,
				message: "ah, fuck off!"
			});
			return;
		}

		const token = createToken(userId);
		res.status(200);
		res.json({
			error: 0,
			message: "Success",
			payload: {
				token,
				userId
			}
		});
		
		return;
	}
}
