class Reply < ActiveRecord::Base
  belongs_to :author
  belongs_to :comment
  attr_accessible :message
end
