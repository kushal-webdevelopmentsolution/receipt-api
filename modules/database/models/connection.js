
const config = {
	host:process.env.host,
    user:process.env.user,
    database:process.env.database,
    password:process.env.password,
    port: process.env.port,
    currentSchema:process.env.currentSchema
};
module.exports = {
 config:config
};