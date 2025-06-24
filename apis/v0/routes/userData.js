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

const acquireAuthDataById = database.prepare("SELECT * FROM meowerchat_authentication WHERE userId = ?;");
const acquireUserDataById = database.prepare("SELECT * FROM meowerchat_users WHERE userId = ?;");

module.exports = {
	method: "get",
	path: "data/user/:userId",
	authRequired: false,
	async execute(req, res, next) {
		const authData = acquireAuthDataById.get(req.params.userId);
		const userData = acquireUserDataById.get(req.params.userId);


		if (authData === undefined || userData === undefined) {
			res.status(404);
			res.json({
				error: -1,
				message: "No user with such userId was found."
			});

			return;
		}

		res.status(200);
		res.json({
			error: 0,
			payload: {
				username: authData.username,
				verified: authData.verified,
				displayName: userData.displayName,
				isAdmin: authData.isAdmin
			}
		});
	}
}
