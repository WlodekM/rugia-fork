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

export const method = "get";
export const path = "data/guild/:guildId";
export const authRequired = true;
// deno-lint-ignore require-await
export async function execute(req, res) {
	if (req.params.guildId !== "dbf2c411-6e27-50e0-b899-cbebfe91515c") {
		res.status(404);
		res.json({
			error: -1,
			message: "No guild with such guildlId was found."
		});

		return;
	}

	res.json({
		error: 0,
		payload: {
			name: "Chat Domestique",
			topic: "A stub to check the functionality of the server implementation",
			channelIds: ["b9105365-a7ea-5fff-802b-5ef598439837"]
		}
	});
}
