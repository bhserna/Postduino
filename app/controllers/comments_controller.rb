class CommentsController < ApplicationController
  before_filter :authenticate_user!

  def create
    @post = Post.find(params[:post_id])
    @comment = @post.comments.new(message: params[:message])
    @comment.author = current_user
    @comment.save
    render json: @comment.for_presentation.to_json(view_context)
  end

  def reply
    @comment = Comment.find(params[:id])
    @reply = @comment.replies.new(message: params[:message])
    @reply.author = current_user
    @reply.save
    render json: @reply
  end
end
