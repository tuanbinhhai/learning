class UsersController < ApplicationController
  include ValidateUser

  # Receive json email, username, password, phone number and location
  # Send authentoken and user information if success, errors if not
  def create
    new_user = User.new(user_params)
    if new_user.save
      token = (('a'..'z').to_a << ('0'..'9').to_a).flatten.sample(10).join
      new_user.update_token_hash(token)
      render json: {
        authentoken: token,
        avatar: new_user.avatar,
        id: new_user.id,
        username: new_user.username,
        email: new_user.email,
        phone: new_user.phone,
        location: new_user.location
      }, status: 201
    else
      render json: {
        errors: new_user.errors.full_messages
      }, status: 400
    end
  end

  private

  def user_params
    params.permit(:email, :password, :username, :phone, :location)
  end
end
