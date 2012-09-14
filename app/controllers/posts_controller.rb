class PostsController < ApplicationController
  before_filter :authenticate_user!

  def index
    @posts = Post.all_for_presentation
  end
end
