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

const sqlite3 = require("better-sqlite3");

const database = new sqlite3("./database.db");
database.pragma('journal_mode = WAL');

function setNewVersion(n) {
	const queryA = database.prepare("DROP TABLE IF EXISTS meowerchat_messages;");
	queryA.run();

	const queryB = database.prepare("CREATE TABLE meowerchat_version(mkey INTEGER PRIMARY KEY, version INTEGER);");
	queryB.run();

	const queryC = database.prepare("INSERT INTO meowerchat_version VALUES (?, ?);");
	queryC.run(0, n);
}

function migrateFrom(database, n) {
	return;
}

(async () => {
	const queryA = database.prepare("SELECT version FROM meowerchat_version WHERE mkey = 0");
	const { version } = queryA.get();

	if (version === 0) {
		process.stderr.write("Database is already the latest version!\n");
		database.close();
		process.exit(1);
	}
})();
