# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

car_info = JSON.parse(File.read('./db/car_more_information.json'))
car_info.each do |data|
  next if data['Model Year'].to_i < 2008
  CarMoreInformation.create(brand: data['Brand'], model: data['Model'],
                            power: data['Power (kW)'], type_of_chassi: data['Type of Chassi'],
                            number_of_doors: data['Number of Doors'].to_i, torque: data['Torque'],
                            tank_capacity: data['Tank Capacity'], length: data['Length'].to_i,
                            width: data['Width'].to_i, height: data['Height'].to_i,
                            transmission_type: data['Transmission Type'], drive_type: data['Drive Type'],
                            type_of_four_wheel_drive: data['Type of Four Wheel Drive'],
                            fuel_consumption: data['City'], number_of_seats: data['Number of Seats'],
                            year: data['Model Year'].to_i, fuel_type: data['Fuel Type'])
end

cars = File.read('./db/car_data.json')
cars_data = JSON.parse(cars)

cars_data.each_with_index do |data, index|
  break if Car.all.count > 1000
  # next if data['car']['year'].integer?
  begin
    Integer(data['car']['year'])
  rescue
    next
  end
  car_more_info = CarMoreInformation.where('brand = ? and model = ? and year = ?',
                                           data['car']['brand'], data['car']['model'],
                                           data['car']['year']).pluck(:id)[0] ||
                  CarMoreInformation.where('brand = ? and model = ? and year = ?',
                                           data['car']['brand'], data['car']['version'],
                                           data['car']['year']).pluck(:id)[0]
  next if car_more_info.nil?
  next if (data['car']['price'].delete('.')[0..-7].to_f / data['car']['kilometerage'].delete(',').to_f) > 1.35
  User.create(name: data['user']['seller'], phone: data['user']['phone'],
              password_digest: BCrypt::Password.create('123456'),
              email: "abc123#{index}@gmail.com", username: "unknowman#{index}",
              location: 'DN')
  Car.create(user_id: User.last.id, version: data['car']['version'],
             kilometerage: data['car']['kilometerage'].delete(',').to_i,
             price: data['car']['price'].delete('.')[0..-7].to_i,
             color: data['car']['color'], description: data['car']['description'],
             image: data['car']['image'], origin: data['car']['origin'],
             url: data['url'], address: data['user']['address'],
             car_more_information_id: car_more_info)
end

# Delete CarMoreInformation record isn't necessary
car_more_information_id = Car.pluck(:car_more_information_id).uniq
CarMoreInformation.where.not(id: car_more_information_id).delete_all
