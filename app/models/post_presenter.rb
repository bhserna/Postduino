require 'delegate'
require 'json'

class PostPresenter < SimpleDelegator
  def comments
    super.map(&:for_presentation)
  end

  def comments_json(context)
    comments.map { |comment| comment.to_hash(context) }.to_json
  end
end
