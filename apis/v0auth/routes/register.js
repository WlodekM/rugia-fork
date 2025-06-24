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

import bcrypt from "bcrypt";
import crypto from 'crypto';
import * as uuid from 'uuid'

function bssha256(data) {
	return crypto.createHash("sha256").update(data).digest("base64");
}

const acquireAccountByUsername = database.prepare("SELECT userId FROM meowerchat_authentication WHERE username = ?;");
const createAccountAuthProfile = database.prepare("INSERT INTO meowerchat_authentication VALUES (?, ?, ?, ?, ?);");
const createAccountUserProfile = database.prepare("INSERT INTO meowerchat_users VALUES (?, ?);");

export const method = "post";
export const path = "register";
export async function execute(req, res) {
	if (typeof req.body !== "object") {
		res.status(412);
		res.json({ error: -1, message: "THIS IS A MATTRESS STORE NOT A MOTHERFUCKING SOUP STORE" });
		return;
	}

	if (typeof req.body.username !== "string" || typeof req.body.password !== "string") {
		res.status(406);
		res.json({ error: -2, message: "gimme an username and a password you ASSHAT" });
		return;
	}

	if (req.body.username.length < 6) {
		res.status(402);
		res.json({ error: -3, message: "pay me if you want an username THAT short" });
		return;
	}

	if (acquireAccountByUsername.get(req.body.username) !== undefined) {
		res.status(417);
		res.json({ error: -4, message: "UNUSED USERNAME PLEASE" });
		return;
	}

	const passhash = await bcrypt.hash(bssha256(req.body.password), 10);
	const userId = uuid.v7();
	createAccountAuthProfile.run(userId, req.body.username, passhash, 0, 0);
	createAccountUserProfile.run(userId, req.body.username);

	res.status(200);
	res.json({
		error: 0,
		message: "Success",
		payload: {
			userId
		}
	});

	return;
}
