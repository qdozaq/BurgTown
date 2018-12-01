module.exports = {
    db:{
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || '',
        pass: process.env.DB_PASS || '',
        name: process.env.DB_NAME || 'burgDB'
    },

}