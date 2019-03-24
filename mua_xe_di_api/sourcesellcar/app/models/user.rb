class User < ApplicationRecord
  has_many :save_cars, class_name: 'SaveCar', foreign_key: 'user_id'
  has_many :saved_cars, through: :save_cars, source: :car
  has_many :cars
  has_many :comments
  NUMBER_REGEX = /\d/
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }

  validates :username, presence: true, length: { minimum: 6 },
                       uniqueness: { case_sensitive: false }

  # validates :password, presence: true, length: { minimum: 6 }
  # TODO: Create user_type to separate types of User
  validates :location, presence: true, length: { minimum: 2 }
  validates :phone, format: { with: NUMBER_REGEX }, length: { minimum: 10, maximum: 11 }

  has_secure_password

  def update_token_hash(token)
    token_hash = {}
    token_hash[token] = 3.day.from_now.to_i
    token_hash.merge!(JSON.parse(authentoken)) if authentoken
    update_attribute(:authentoken, token_hash.to_json)
  end

  def delete_token(token)
    token_hash = JSON.parse(authentoken)
    update_attribute(:authentoken, token_hash.delete_if { |key, _value| key == token }.to_json)
  end

  def time_of_token(token)
    JSON.parse(authentoken)[token]
  end

  def check_expire_token(token)
    time_of_token(token) && time_of_token(token) >= Time.now.to_i
  end

  def self.public_info(user_id)
    user = User.find(user_id)
    {
      user_id: user_id,
      user_name: user.username,
      name: user.name,
      phone: user.phone,
      avatar: user.avatar,
      location: user.location,
      email: user.email,
      birthday: user.birthday
    }
  rescue
    nil
  end

  def draft_car
    cars.where(draft: true)
  end

  def post_car
    cars.where(draft: false)
  end
end
