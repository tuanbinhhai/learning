class CarsController < ApplicationController
  # include ValidateUser
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
    p ('=======')
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

  private

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
end
