class PostsController < ApplicationController
  before_filter :authenticate_user!

  def show
    @post = Post.find(params[:id]).for_presentation
  end

  def index
    @posts = Post.all_for_presentation
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.create params[:post]
    redirect_to posts_path, notice: "The post have been successfully created"
  end
end
