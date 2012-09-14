require 'delegate'
require 'json'

class CommentPresenter < SimpleDelegator
  def to_hash(context)
    as_json.merge replies: replies.as_json,
      replies_url: context.reply_comment_path(id)
  end

  def to_json(context)
    to_hash(context).to_json
  end
end
