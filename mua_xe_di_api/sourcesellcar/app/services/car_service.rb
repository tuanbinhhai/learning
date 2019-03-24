class CarService
  def greater_compare_car(car_ids)
    result = {}
    result[:power] = detail_compare(car_ids) { :power }
    result[:torque] = detail_compare(car_ids) { :torque }
    result[:tank_capacity] = detail_compare(car_ids) { :tank_capacity }
    result[:fuel_consumption] = detail_compare(car_ids) { :fuel_consumption }
    result[:kilometerage] = detail_compare(car_ids) { :kilometerage }
    result
  end

  def get_spec_car(car)
    CarMoreInformation.find_by('brand = ? and model = ? and year = ?', car[:brand],
                               car[:model], car[:year])
  rescue
    nil
  end

  private

  def detail_compare(car_ids)
    result = []
    key = yield
    car_arr = Car.where(id: car_ids).joins(:car_more_information).select(key, :id)
    return nil if car_arr.select(key).distinct.pluck(key).length == 1
    # Check null for fields lower is better
    car_arr = car_arr.where("#{key} != ''") if key != :kilometerage # Kilometerage have integer type
    car_arr = car_arr.sort { |e1, e2| e1.send(key).to_f <=> e2.send(key).to_f }
    greater_better_arr = %i[power torque tank_capacity]
    if greater_better_arr.include? key
      car_arr.select { |e| e.send(key) == car_arr.last.send(key) }.each { |e| result.append(e.id) }
    else
      car_arr.select { |e| e.send(key) == car_arr.first.send(key) }.each { |e| result.append(e.id) }
    end
    result
  rescue
    nil
  end
end
