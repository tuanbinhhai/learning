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

  # Save car with params are user information contains id, authentoken
  # and car_id in the url
  def save_car
    user = User.find_by(id: params[:seller][:id])
    # Validate user
    unless validate_user(user, params[:seller][:authentoken])
      render json: { error: "Can't validate the user" }, status: 400
      return
    end
    # Check user saved this car
    if user.saved_cars.ids.include? params[:car_id].to_i
      render json: { error: 'The user saved this car' }, status: 400
      return
    end

    # Check draft car
    if Car.check_draft(params[:car_id])
      render json: { error: 'Invalid car' }, status: 400
      return
    end

    # Add data to save_car database
    save_car = SaveCar.new(user_id: params[:seller][:id], car_id: params[:car_id])
    if save_car.save
      render json: { msg: 'OK' }, status: 200
    else
      render json: { error: save_car.errors.full_messages }, status: 400
    end
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  def unsave_car
    user = User.find_by(id: params[:seller][:id])
    # Validate user
    unless validate_user(user, params[:seller][:authentoken])
      render json: { error: "Can't validate the user" }, status: 400
      return
    end
    car = SaveCar.find_by(car_id: params['car_id'],
                          user_id: params['seller']['id'])
    if car
      SaveCar.delete(car.id)
      render json: { msg: 'OK' }, status: 200
    else
      render json: { error: "You can't unsave this car" }, status: 400
    end
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  def saved_car
    render json: User.find(params[:user_id].to_i).save_cars.pluck(:car_id), status: 200
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  # Return public information of the user
  def info
    render json: { error: "Can't find the user" }, status: 400 unless User.public_info params[:user_id]
    render json: User.public_info(params[:user_id]), status: 200
  rescue
    render json: { error: 'Error' }, status: 400
  end

  # Update user with params contain the information need to update
  def update
    user = User.find_by(id: params[:user_id])
    # Validate user
    unless validate_user(user, params[:authentoken])
      render json: { error: "Can't validate the user" }, status: 400
      return
    end
    user = User.find(params[:user_id])
    if user.update_attributes(params.permit(:birthday, :username,
                                            :name, :phone, :location, :avatar, :password))
      render json: User.public_info(user.id), status: 200
    else
      render json: { error: user.errors.full_messages }, status: 400
    end
  rescue
    render json: { error: 'Error' }, status: 400
  end

  # Return saved car list of the user
  def saved_car_list_detail
    user = User.find(params[:user_id])
    if user
      render json: json_search(user.saved_cars, user.save_cars.count), status: 200
    else
      render json: { error: "Can't find the user" }, status: 400
    end
  rescue
    render json: { error: 'Error' }, status: 400
  end

  # Return the cars belong to the user
  def cars
    user = User.find(params[:user_id])
    if user
      render json: {
        draft_car: json_search(user.draft_car, user.draft_car.count),
        post_car: json_search(user.post_car, user.post_car.count)
      }, status: 200
    else
      render json: { error: "Can't find the user" }, status: 400
    end
  end

  private

  def user_params
    params.permit(:email, :password, :username, :phone, :location)
  end

  # JSON for list of car
  def json_search(cars, count)
    result = {}
    result[:num_of_record] = count
    result[:cars] = []
    cars.each do |car|
      result[:cars].append(
        id: car.id,
        brand: car.car_more_information.brand,
        model: car.car_more_information.model,
        year: car.car_more_information.year,
        price: car.price,
        kilometerage: car.kilometerage,
        desc: car.description,
        address: car.address,
        comments_count: car.comments.count,
        saves_count: car.save_cars.count,
        img: car.image[0],
        created_at: car.created_at
      )
    end
    result
  end
end
