class RemoveUnnecessaryFieldsFromCars < ActiveRecord::Migration[5.1]
  def change
    remove_column :cars, :fuel, :string
    remove_column :cars, :transmission, :string
  end
end
