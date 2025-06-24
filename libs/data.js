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

globalThis.isUserAuthorisedInGuild = (userId, guildId) => {
	if (guildId === "dbf2c411-6e27-50e0-b899-cbebfe91515c") {
		return true;
	}

	return false;
}

globalThis.isUserAuthorisedInChannel = (userId, guildId, channelId) => {
	if (!isUserAuthorisedInGuild(userId, guildId)) {
		return false;
	}

	if (channelId === "dbf2c411-6e27-50e0-b899-cbebfe91515c") {
		return true;
	}

	return false;
}

const validateToken = database.prepare("SELECT userId FROM meowerchat_tokens WHERE token = ?;");
globalThis.verifyToken = (token) => {
	const queryA = validateToken.get(token);
	console.log(queryA);

	if (queryA === undefined) {
		return null;
	}

	return queryA.userId;
}
