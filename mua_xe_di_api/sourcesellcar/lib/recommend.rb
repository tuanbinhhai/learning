module Recommend
  # Add query to the query_arr and excute it whenever query_arr have
  # at most 10 element
  # Using in car model
  def recommend_arr
    query = []
    query.append('car_more_information_id = ' + car_more_information.id.to_s +
     'and price <= ' + (price + 100).to_s + ' and price >= ' + (price - 100).to_s)
    query.append('car_more_information_id in (' + CarMoreInformation
        .where(brand: car_more_information.brand).distinct.pluck(:id).to_s[1..-2] +
    ') and price <= ' + (price + 100).to_s + ' and price >= ' + (price - 100).to_s)
    query.append('car_more_information_id in (' + CarMoreInformation
        .where('year>' + (car_more_information.year - 3).to_s + 'and year<' +
                  (car_more_information.year + 3).to_s).distinct.pluck(:id).to_s[1..-2] +
                     ') and price <= ' + (price + 100).to_s + ' and price >= ' + (price - 100).to_s)
    recommend_cars = Set.new
    count_query = 0
    while recommend_cars.count < 10 && count_query < query.count
      Car.where(query[count_query] + 'AND draft = false').limit(10).each do |recommend_car|
        recommend_cars.add(recommend_car) if recommend_car['id'] != id
        break if recommend_cars.count >= 10
      end
      count_query += 1
    end
    recommend_cars
  end

  # Return recommend price of the specific car
  # Using in CarMoreInformation model
  def recommend_price(kilometerage)
    price_arr = cars.where(draft: false).pluck(:price)
    kilometerage_arr = cars.pluck(:kilometerage)
    depreciation_arr = []
    (0..price_arr.count - 1).each do |i|
      depreciation_arr[i] = price_arr[i].to_f / kilometerage_arr[i].to_f
    end
    depreciation_avg = depreciation_arr.reduce(:+) / depreciation_arr.count
    price_largest = price_arr.max
    kilo_diff = kilometerage_arr[price_arr.find_index(price_largest)].to_f - kilometerage
    price_largest + (kilo_diff * depreciation_avg)
  rescue
    nil
  end
end
