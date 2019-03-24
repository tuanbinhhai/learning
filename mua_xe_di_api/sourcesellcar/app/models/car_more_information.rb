class CarMoreInformation < ApplicationRecord
  has_many :cars
  include Recommend

  def info
    {
      brand: brand,
      model: model,
      power: power,
      type_of_chassi: type_of_chassi,
      number_of_doors: number_of_doors,
      torque: torque,
      tank_capacity: tank_capacity,
      length: length,
      width: width,
      height: height,
      transmission_type: transmission_type,
      drive_type: drive_type,
      type_of_four_wheel_drive: type_of_four_wheel_drive,
      fuel_consumption: fuel_consumption,
      number_of_seats: number_of_seats,
      year: year,
      fuel_type: fuel_type
    }
  end

  def range_of_price
    all_price = cars.select(:price).pluck(:price)
    {
      min: all_price.min,
      max: all_price.max
    }
  rescue
    nil
  end
end
