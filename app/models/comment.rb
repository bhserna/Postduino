class Comment < ActiveRecord::Base
  belongs_to :author, class_name: User
  belongs_to :post
  has_many :replies
  attr_accessible :message

  def for_presentation
    CommentPresenter.new(self)
  end
end
