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

import * as uuid from "uuid";

export const method = "post";
export const path = "message/post";
export const authRequired = true;
export async function execute(req, res) {
	if (typeof req.body !== "object") {
		res.status(412);
		res.json({ error: -1, message: "THIS IS A MATTRESS STORE NOT A MOTHERFUCKING SOUP STORE" });
		return;
	}

	if (typeof req.body.guildId !== "string" || typeof req.body.channelId !== "string" || typeof req.body.content !== "string") {
		res.status(406);
		res.json({ error: -6, message: "rude." });

		return;
	}

	if (req.body.guildId !== "dbf2c411-6e27-50e0-b899-cbebfe91515c" || req.body.channelId !== "b9105365-a7ea-5fff-802b-5ef598439837") {
		res.status(404);
		res.json({ error: -8, message: "guess what's wrong! you forgot either the guild id or the channel id. i could care less which. it's either one." });

		return;
	}

	if (req.body.content.length === 0) {
		res.status(404);
		res.json({ error: -8, message: "fuck off pat" });

		return;
	}

	const messageId = uuid.v7();
	const emitMsg = {
		messageId: messageId,
		guildId: req.body.guildId,
		channelId: req.body.channelId,
		content: req.body.content,
		authorId: req.userId,
		timestamp: Date.now()
	};
	console.log(emitMsg);
	mainLoop.emit("messageCreate", emitMsg);

	res.status(200);
	res.json({
		error: 0,
		payload: emitMsg
	});
}
