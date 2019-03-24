class CreateCarMoreInformations < ActiveRecord::Migration[5.1]
  def change
    create_table :car_more_informations do |t|
      t.string :brand, null: false
      t.string :model, null: false
      t.string :power
      t.string :type_of_chassi
      t.integer :number_of_doors
      t.string :torque
      t.string :tank_capacity
      t.integer :length
      t.integer :width
      t.integer :height
      t.string :transmission_type
      t.string :drive_type
      t.string :type_of_four_wheel_drive
      t.string :fuel_consumption
      t.integer :number_of_seats
      t.integer :year, null: false
      t.string :fuel_type

      t.timestamps
    end
  end
end
