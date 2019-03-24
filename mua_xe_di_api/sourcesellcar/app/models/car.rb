class Car < ApplicationRecord
  belongs_to :car_more_information
  belongs_to :user
  has_many :comments
  has_many :save_cars, class_name: 'SaveCar', foreign_key: 'car_id'
  has_many :saved_user, through: :save_cars, source: :user
  include PgSearch
  include Recommend

  NUMBER_REGEX_4 = /\A\d{4}\z/
  validates :price, presence: true, format: { with: /\A\d*\z/ }
  validates :kilometerage, presence: true
  validates :image, presence: true, length: { minimum: 3 }

  pg_search_scope :keywords_search, associated_against: {
    car_more_information: %i[brand model year]
  }, using: [:tsearch], ranked_by: 'created_at'

  def public_info
    {
      id: id,
      user_id: user_id,
      version: version,
      kilometerage: kilometerage,
      price: price,
      color: color,
      description: description,
      image: image,
      origin: origin,
      address: address,
      created_at: created_at
    }.merge!(CarMoreInformation.find_by(id: car_more_information.id).info)
  end

  def self.check_draft(car_id)
    Car.find(car_id).draft
  rescue
    false
  end
end
