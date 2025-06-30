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

const queryA = globalThis.database.prepare("DELETE FROM meowerchat_authentication WHERE userId = ?;");
const queryB = globalThis.database.prepare("DELETE FROM meowerchat_users WHERE userId = ?;");
const queryC = globalThis.database.prepare("DELETE FROM meowerchat_users_guilds WHERE userId = ?;");
const queryD = globalThis.database.prepare("DELETE FROM meowerchat_tokens WHERE userId = ?;");
const queryE = globalThis.database.prepare("DELETE FROM meowerchat_messages WHERE authorId = ?;");

export const method = "post";
export const path = "data/forget";
export const authRequired = true;
export async function execute(req, res) {
	queryA.run(req.userId);
	queryB.run(req.userId);
	queryC.run(req.userId);
	queryD.run(req.userId);
	queryE.run(req.userId);

	res.json({
		error: 0,
		payload: {
			message: "Thank you for using chat domestique. May your future travelers bring you luck and hope."
		}
	});
	return;
}
