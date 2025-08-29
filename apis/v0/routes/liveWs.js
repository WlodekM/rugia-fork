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

const connectedUsers = new Map();

let wsId = 0;

function announceAll(obj) {
	for (const {ws} of connectedUsers.values()) {
		ws.json(obj)
	}
}

export const method = "ws";
export const path = "live/ws";
export const authRequired = false;
export function execute(ws, req) {
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

	let thisWsId = wsId++;

	connectedUsers.set(thisWsId, {ws, userId});

	setInterval(() => ws.pong(), 1000);

	function newMessageHandler(message) {
				if (!true) return;
				if (!true) return;

		ws.json({
			type: "messageCreate",
			payload: message
		});
	}
	mainLoop.on("messageCreate", newMessageHandler);
	function handleEnd() {
		console.log("oh!");
		connectedUsers.delete(thisWsId)
		announceAll({
			type: 'statusUpdate',
			payload: {
				userId,
				status: 'offline'
			}
		})
	}
	ws.on("end", handleEnd);
	ws.on("error", handleEnd)

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
			success: true,
			userId
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
		type: "usersOnline",
		payload: {
			users: [...connectedUsers.values()].map(({userId})=>userId)
		}
	});

	ws.json({
		type: "serverFinished"
	});

	announceAll({
		type: 'statusUpdate',
		payload: {
			userId,
			status: 'online'
		}
	})
}
