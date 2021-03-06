module.exports = {
    /** 
     * Add one like to a specific post.
     * @method post_like
     * @memberof MYSQL#
     * @param {!string} post_id - The id of the post to place the like.
     * @param {?HandleCallback} callback - The callback that handles the response.
     *
     */
    post_like: function(post_id, callback) {
        if (!(callback instanceof Function)) callback = function() {};

        if (post_id != null || typeof post_id != 'undefined') {
            this.pool.getConnection(function(err, connection) {
                if (err) {
                    return callback(err);
                }
                connection.query(
                    'UPDATE posts SET `post_like_count` = `post_like_count` + 1, `post_feature_dynamic` = `post_feature_dynamic` + 1 WHERE post_ID = ?', [post_id],
                    function(err, result) {
                        connection.release();
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, result);
                        }
                    }
                );
            });

        } else {
           callback(new Error('No post_id provided to post_like call.'));
        }

    }
}
