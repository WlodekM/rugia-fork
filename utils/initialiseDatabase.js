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

import sqlite3 from "better-sqlite3";

const database = new sqlite3("./database.db");
database.pragma('journal_mode = WAL');

(() => {
	database.prepare("DROP TABLE IF EXISTS meowerchat_version;").run();
	database.prepare("DROP TABLE IF EXISTS meowerchat_messages;").run();
	database.prepare("DROP TABLE IF EXISTS meowerchat_authentication;").run();
	database.prepare("DROP TABLE IF EXISTS meowerchat_users;").run();
	database.prepare("DROP TABLE IF EXISTS meowerchat_users_guilds").run();
	database.prepare("DROP TABLE IF EXISTS meowerchat_tokens;").run();

	database.prepare("CREATE TABLE meowerchat_version(mkey TEXT PRIMARY KEY, version INTEGER);").run();
	database.prepare("CREATE TABLE meowerchat_messages(messageId TEXT PRIMARY KEY, authorId TEXT, guildId TEXT, channelId TEXT, timestamp INTEGER, content TEXT);").run();
	database.prepare("CREATE TABLE meowerchat_authentication(userId TEXT PRIMARY KEY, username TEXT UNIQUE, passwordHash INTEGER, verified INTEGER, isAdmin INTEGER);").run();
	database.prepare("CREATE TABLE meowerchat_users(userId TEXT PRIMARY KEY, displayName TEXT);").run();
	database.prepare("CREATE TABLE meowerchat_users_guilds(userId TEXT PRIMARY KEY, guildId text);").run();
	database.prepare("CREATE TABLE meowerchat_tokens(token TEXT PRIMARY KEY, userId TEXT);").run();

	database.prepare("INSERT INTO meowerchat_version VALUES (?, ?);").run(0, 0);
})();
