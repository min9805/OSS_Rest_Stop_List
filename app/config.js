module.exports = {
	server_port: 3000,
	db_url: 'mongodb://oss:12341234@cluster0.us5lm.mongodb.net/?retryWrites=true&w=majority',
	db_schemas: [
	    {file:'./user_schema', collection:'users', schemaName:'UserSchema', modelName:'UserModel'},
		{file:'./post_schema.js', collection:'post', schemaName:'PostSchema', modelName:'PostModel'}
	]

}