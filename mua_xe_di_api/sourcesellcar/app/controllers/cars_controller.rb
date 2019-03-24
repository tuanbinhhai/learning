class CarsController < ApplicationController
  include ValidateUser
  # Edit car in db with params contain fields want to update
  def update
    user = User.find_by(id: params[:seller][:id])
    # Validate user
    unless validate_user(user, params[:seller][:authentoken])
      render json: { error: "Can't validate the user" }, status: 401
      return
    end
    # Check this car is owned by user
    unless user.cars.ids.include? params[:car_id].to_i
      render json: { error: "The user doesn't own this car" }, status: 400
      return
    end
    car = Car.find(params[:car_id])
    if !params[:car][:brand].nil? || !params[:car][:model].nil? || !params[:car][:year].nil?
      # Check for invalid car
      info_car = CarMoreInformation
                 .find_by(brand: params[:car][:brand] || car.car_more_information.brand,
                          model: params[:car][:model] || car.car_more_information.model,
                          year: params[:car][:year] || car.car_more_information.year)
      if info_car.nil?
        render json: { error: 'Car is invalid' }, status: 400
        return
      else
        car.update_attribute(:car_more_information_id, info_car.id)
      end
    end

    if car.update_attributes(params[:car]
                                 .permit(:transmission, :fuel, :version, :status,
                                         :kilometerage, :price, :color,
                                         :description, :image, :origin, :address, :draft))
      render json: json_car_info(car), status: 200
    else
      render json: { error: car.errors.full_messages }
    end
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  # Save new car to db by receive car params
  def create
    user = User.find_by(id: params[:seller][:id])
    unless validate_user(user, params[:seller][:authentoken])
      render json: { error: "Can't validate the user" }, status: 401
      return
    end
    # Check for invalid car
    info_car = CarMoreInformation.find_by(brand: params[:car][:brand],
                                          model: params[:car][:model],
                                          year: params[:car][:year])
    if info_car.nil?
      render json: { error: 'Car is invalid' }, status: 400
      return
    end

    new_car = user.cars.new(new_car_params
        .merge(user_id: user.id).merge(car_more_information_id: info_car.id))
    if new_car.save
      render json: json_car_info(new_car), status: 200
    else
      render json: { error: new_car.errors.full_messages }, status: 400
    end
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  # Detail of the car by receive get request with param car_id
  def car_info
    car = Car.find_by(id: params[:car_id])
    if car && !car.draft
      render json: json_car_info(car), status: 200
    else
      render json: { error: "Can't find this car" }, status: 400
    end
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  # Search by keywords by receive get request with params
  # are keywords is a brand, year or model and page is the page you want to show,
  # start from 0 and one page have 10 elements
  def keywords_search
    search_result = Car.where.not(draft: true).keywords_search(params[:keywords])
                       .offset(params[:page].to_i * 10).limit(10)
    render json: json_search(search_result, Car.where.not(draft: true)
        .keywords_search(params[:keywords]).count), status: 200
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  # Search cars by some filter by receive get request
  # with the params are query with the query code, order is the sort order by
  # and page is the page you want to see, start page is 0
  def filter
    params[:order] = params.fetch(:order, 'price desc') # set default if field in params is nil
    join_table = Car.joins(:car_more_information).select('cars.*,brand,model,year')
    query = params[:query].blank? ? 'draft = false' : params[:query] + ' and draft = false'
    filter_result = join_table.where(query).order(params[:order])
                              .offset(params[:page].to_i * 10).limit(10)
    render json: json_search(filter_result, join_table
        .where(query).count('*')), status: 200
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  # Query car by save count
  def hot_trend
    saved_cars_ids = SaveCar.group(:car_id).order(count: :DESC).pluck(:car_id)
    # Check params page for get element
    if params[:page].to_i < saved_cars_ids.count / 10
      result = Car.find saved_cars_ids[params[:page].to_i * 10..10]
    elsif params[:page].to_i == saved_cars_ids.count / 10 && saved_cars_ids
          .count % 10 != 0
      saved_cars = Car.find saved_cars_ids[params[:page].to_i * 10..10]
      rest_cars = Car.where.not(id: saved_cars_ids, draft: true)
                     .order(created_at: :DESC).limit(10 - saved_cars.count)
      result = saved_cars + rest_cars
    else
      result = Car.where.not(id: saved_cars_ids, draft: true).order(created_at: :DESC)
                  .offset(params[:page].to_i * 10 - saved_cars_ids.count)
                  .limit(10)
    end
    render json: json_search(result, Car.where.not(id: saved_cars_ids, draft: true).count)
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  # Return all brand in the database
  def brand
    render json: CarMoreInformation.select(:brand).distinct.pluck(:brand), status: 200
  end

  # Return all model by brand in the database
  def model
    render json: CarMoreInformation.select(:model)
                                   .where(brand: params[:brand]).distinct.pluck(:model)
  end

  # Return all year base on brand and model in the database
  def year
    render json: CarMoreInformation.select(:year)
                                   .where('brand = ? and model = ?', params[:brand], params[:model]).distinct.pluck(:year)
  end

  # Compare array of car_ids and return the id of the car better by each fields
  def compare
    render json: compare_with_compare_service, status: 200
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  # Return spec car by brand, model and year of the car
  def spec_car
    render json: CarService.new.get_spec_car(params), status: 200
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  # Return min and max of specific car
  def price_around
    info_car = CarMoreInformation.find_by('brand = ? and model = ? and year = ?',
                                          params[:brand], params[:model], params[:year])
    if info_car.nil?
      render json: { msg: "Can't find this car" }, status: 400
    else
      render json: info_car.range_of_price, status: 200
    end
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  # Return recommend price for the car
  def recommend_price
    car_spec = CarMoreInformation.find(params[:car_more_information_id])
    render json: car_spec
      .recommend_price(params[:kilometerage].to_i), status: 200
  rescue
    render json: { msg: 'Error' }, status: 400
  end

  # Return information of the draft car
  def draft_car_info
    user = User.find_by(id: params[:seller][:id])
    # Validate user
    unless validate_user(user, params[:seller][:authentoken])
      render json: { error: "Can't validate the user" }, status: 401
      return
    end
    # Check this car is owned by user
    unless user.cars.ids.include? params[:car_id].to_i
      render json: { error: "The user doesn't own this car" }, status: 400
      return
    end
    render json: json_car_info(Car.find(params[:car_id])), status: 200
  rescue
    render json: { error: "Can't find this car" }, status: 400
  end

  private

  def compare_with_compare_service
    CarService.new.greater_compare_car(JSON.parse(params[:car_ids]))
  end

  def new_car_params
    params.required(:car).permit(:version, :kilometerage,
                                 :price, :color, :description,
                                 :origin, :address, :draft, image: [])
  end

  def car_params
    params.permit(:car_id)
  end

  # The return json for search cars
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

  # The return json for car info
  def json_car_info(car)
    comment_array = []
    car.comments.each do |comment|
      comment_array.append(
        id: comment.id,
        user_id: comment.user.id,
        user_name: comment.user.username,
        content: comment.content,
        avatar: comment.user.avatar,
        created_at: comment.created_at,
        updated_at: comment.updated_at
      )
    end
    {
      seller: {
        name: User.find(car.user_id).name,
        phone: User.find(car.user_id).phone
      },
      car: car.public_info,
      comments: comment_array,
      recommend_car: json_search(car.recommend_arr, car.recommend_arr.count)
    }
  end
end
