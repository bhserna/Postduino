class Reply < ActiveRecord::Base
  belongs_to :author, class_name: User
  belongs_to :comment
  attr_accessible :message
end
