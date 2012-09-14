class Post < ActiveRecord::Base
  belongs_to :author, class_name: User
  has_many :comments
  attr_accessible :name, :text

  def self.all_for_presentation
    order("created_at DESC").map(&:for_presentation)
  end

  def for_presentation
    PostPresenter.new(self)
  end
end
