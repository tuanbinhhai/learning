class SaveCar < ApplicationRecord
  belongs_to :user, class_name: 'User'
  belongs_to :car, class_name: 'Car'

  validates :user_id, presence: true
  validates :car_id, presence: true
end
