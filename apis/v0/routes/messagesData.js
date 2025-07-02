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

const queryA = database.prepare("SELECT * FROM meowerchat_messages ORDER BY timestamp DESC WHERE timestamp < ?; AND channelId = ? LIMIT 100;");
const queryB = database.prepare("SELECT * FROM meowerchat_messages ORDER BY timestamp DESC WHERE channelId = ? LIMIT 100;");

export const method = "get";
export const path = "data/messages/:channelId";
export const authRequired = true;
export async function execute(req, res) {
	let timestamp;
	let a = true;

	try {
		timestamp = parseInt(req.query.timestamp);
		if (isNaN(timestamp) || typeof timestamp !== "number") throw new Error("mf");
	} catch (e) {
		a = false;
	}

	if (req.params.channelId !== "b9105365-a7ea-5fff-802b-5ef598439837") {
		res.status(404);
		res.json({
			error: -1,
			message: "No channel with such channelId was found."
		});

		return;
	}

	let messages;
	if (a) {
		messages = queryA.all(timestamp, req.params.channelId);
	} else {
		messages = queryB.all(req.params.channelId);
	}

	res.json({
		error: 0,
		payload: {
			messages
		}
	});
}
