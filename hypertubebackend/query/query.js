var con = require('../model/connect');
const { query } = require('express');

let dbquery = {};

dbquery.insertUserD = function(username, firstname, lastname, email, password, token){
    return new Promise((resolve, reject) =>{
        con.query(`INSERT INTO user (username, firstname, lastname, email, password, token)
        VALUES(?,?,?,?,?,?)`,
        [username, firstname, lastname, email, password, token],
        (error, result) => {
            if(error) return reject(error);
            return resolve(result); 
        })
    })
}

dbquery.checkEmailAndUserNameExists = function(username,email){
    return new Promise((resolve, reject) => {
        console.log('we in here'+username)
		con.query('SELECT * FROM user WHERE username=? OR email=?',
            [username, email],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result)
				return resolve(result);

			})
	})
}

dbquery.checkUserNameExists = function(username){
    return new Promise((resolve, reject) => {
		con.query('SELECT * FROM user WHERE username=? ',
            [username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
			//	console.log(result)
				return resolve(result);
			})
	})
}

dbquery.insertAuth = function(username, firstname){
    return new Promise((resolve, reject) =>{
        con.query(`INSERT INTO user (username, firstname)
        VALUES(?,?)`,
        [username, firstname],
        (error, result) => {
            if(error) return reject(error);
            return resolve(result); 
        })
    })
}

dbquery.checkEmailExists = function(email){
    return new Promise((resolve, reject) => {
		con.query('SELECT * FROM user WHERE email=? ',
            [email],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				//console.log(result)
				return resolve(result);
			})
	})
}

dbquery.checkUserId = function(user_id){
    return new Promise((resolve, reject) => {
		con.query('SELECT * FROM user WHERE user_id=? ',
            [user_id],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				//console.log(result)
				return resolve(result);
			})
	})
}

dbquery.updateToken = function (token, email) {
	return new Promise((resolve, reject) => {
		con.query(`UPDATE user SET token=? where email=?`,
			[token, email],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result);
				return resolve(result);
			})
	})

}

dbquery.findUserByToken = function(token){
    return new Promise((resolve, reject) => {
		con.query('SELECT * FROM user WHERE token=? ',
            [token],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				//console.log(result)
				return resolve(result);
			})
	})
}

dbquery.activateAccount = function (token) {
	return new Promise((resolve, reject) => {
		con.query(`UPDATE user SET verify=?, token='' WHERE token=?`,
			['yes', token],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result);
				return resolve(result);
			})
	})

}

dbquery.updateUserPassword = function (password, username) {
	return new Promise((resolve, reject) => {
		con.query(`UPDATE user SET password=?, token='' WHERE username=?`,
			[password, username],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result);
				return resolve(result);
			})
	})

}

dbquery.updateFirstname = function (firstname, user_id) {
	return new Promise((resolve, reject) => {
		con.query(`UPDATE user SET firstname=? WHERE user_id=?`,
			[firstname, user_id],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result);
				return resolve(result);
			})
	})

}

dbquery.updateLastName = function (lastname, user_id) {
	return new Promise((resolve, reject) => {
		con.query(`UPDATE user SET lastname=? WHERE lastname=?`,
			[lastname, user_id],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result);
				return resolve(result);
			})
	})

}

dbquery.updateUserName = function (username, user_id) {
	return new Promise((resolve, reject) => {
		con.query(`UPDATE user SET username=? WHERE user_id=?`,
			[username, user_id],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result);
				return resolve(result);
			})
	})

}

dbquery.updateEmail = function (email, user_id) {
	return new Promise((resolve, reject) => {
		con.query(`UPDATE user SET email=? WHERE user_id=?`,
			[email, user_id],
			(error, result) => {
				if (error) {
					return reject(error);
				}
				console.log(result);
				return resolve(result);
			})
	})

}



module.exports = dbquery;