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

import mt from "microtime";
import * as uuid from "uuid";

const validateToken = database.prepare("SELECT userId FROM meowerchat_tokens WHERE token = ?;");

export const method = "ws";
export const path = "live/ws";
export const authRequired = false;
export async function execute(ws, req) {
	const token = req.headers['sec-websocket-protocol'];
	const userId = globalThis.verifyToken(token);

	ws.json = (data) => {
		ws.send(JSON.stringify(data));
		return;
	};

	if (userId === null) {
		ws.json({
			type: "authStatus",
			payload: {
				success: false
			}
		});
		ws.close();

		return;
	}

	function newMessageHandler(message) {
		if (!true) return;
		if (!true) return;

		ws.json({
			type: "messageCreate",
			payload: message
		});
	}
	mainLoop.on("messageCreate", newMessageHandler);
	ws.on("end", () => {
		console.log("oh!");
	});

	ws.json({
		type: "serverAuthentication",
		payload: {
			serverName: "Rugia",
			version: "00000000"
		}
	});

	ws.json({
		type: "authStatus",
		payload: {
			success: true
		}
	});

	ws.json({
		type: "guildAvailable",
		payload: {
			uuid: "dbf2c411-6e27-50e0-b899-cbebfe91515c"
		}
	});

	ws.json({
		type: "channelAvailable",
		payload: {
			uuid: "b9105365-a7ea-5fff-802b-5ef598439837"
		}
	});

	ws.json({
		type: "serverFinished"
	});
}
