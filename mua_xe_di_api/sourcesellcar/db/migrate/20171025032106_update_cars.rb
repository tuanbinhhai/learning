class UpdateCars < ActiveRecord::Migration[5.1]
  def change
    remove_column :cars, :model, :string
    remove_column :cars, :brand, :string
    remove_column :cars, :year, :integer
    add_reference :cars, :car_more_information, foreign_key: true, null: false
  end
end
