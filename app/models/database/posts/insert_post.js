module.exports = {
    insert_post: function(post_details, callback) {
        if (typeof(callback) === 'undefined') callback = function() {};

        if (!('title' in post_details)) post_details.title = '';

        if ('author' in post_details && 'date' in post_details && 'content' in post_details && 'type' in post_details) {
            this.conn.query(
                'INSERT INTO posts (author_ID, post_date, post_content, post_type, post_title) VALUES(?, ?, ?, ?, ?);', 
                [post_details.author, post_details.date, post_details.content, post_details.type, post_details.title],
                function(err, result) {
                    if (err) throw err;
                    callback();
                }
            );
        } else {
            throw new Error('You need to provide all the parameters to insert_post call.');
        }

    }
}
