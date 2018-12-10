class AuthentokensController < ApplicationController
  # Receive username and password
  # Send authentoken, username and email if success, errors if not.
  def create
    if params[:username].present?
      user = User.find_by(email: params[:username]) ||
             User.find_by(username: params[:username])

      if user && user.authenticate(params[:password])
        token = (('a'..'z').to_a << ('0'..'9').to_a).flatten.sample(10).join
        user.update_token_hash(token)
        data = {
          authentoken: token,
          id: user.id,
          username: user.username,
          phone: user.phone,
          email: user.email,
          avatar: user.avatar
        }
        render json: data, status: 200
      else
        render json: {
          errors: 'Invalid email/password combination'
        }, status: 401
      end
    else
      render json: {
        errors: 'Nil value'
      }, status: 401
    end
  end

  # Receive authentoken and username
  # Send result if success, errors if not
  def destroy
    user = User.find_by(username: params[:username])
    if user.time_of_token(params[:authentoken])
      user.delete_token(params[:authentoken])
      render json: {
        result: true
      }, status: 200
    else
      render json: {
        errors: 'Authentication failed'
      }, status: 400
    end
  end
end
