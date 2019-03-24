class SocialController < ApplicationController
    def new; end
    # Receive json email, username, password, phone number and location
    # Send authentoken and user information if success, errors if not
    def create
      if params[:email].present?
        user = User.find_by(email: params[:email])
        if user
         token = (('a'..'z').to_a << ('0'..'9').to_a).flatten.sample(10).join
         user.update_token_hash(token)
         data = {
           authentoken: token,
           id: user.id,
           username: user.username,
           email: user.email,
           location:user.location
         }
         render json: data, status: 200
        else
        new_user = User.new(user_params)
        token = (('a'..'z').to_a << ('0'..'9').to_a).flatten.sample(10).join
        new_user.update_token_hash(token)
        render json: {
           authentoken: token,
           id: new_user.id,
           username: new_user.username,
           email: new_user.email,
           location: new_user.location
          }, status: 201
      end
    end
  end

    private
    def user_params
      params.permit(:id, :email, :username, :location)
    end
end
