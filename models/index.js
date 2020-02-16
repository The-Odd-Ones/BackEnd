var path = require('path')

module.exports = {
    User: require('./user.js'),
    Comment: require('./comment.js'),
    Dislike: require('./dislike.js'),
    Like: require('./like.js'),
    Post: require('./post.js'),
    Event: require(path.resolve(__dirname, 'event.js')),
    Following: require('./following.js'),
    Participation : require('./participation.js'),
    Community: require('./community.js'),
    Notification:require('./notification.js'),
    Active : require('./active.js')

}