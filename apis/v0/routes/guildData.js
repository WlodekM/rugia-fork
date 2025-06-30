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
export async function execute(req, res) {
	if (req.params.guildId !== "2afab9d1-71bc-5800-9bc8-93a4a00b7f1c") {
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
			channelIds: ["b4b7c88c-71b6-5260-807e-c0e42b299c19"]
		}
	});
}
