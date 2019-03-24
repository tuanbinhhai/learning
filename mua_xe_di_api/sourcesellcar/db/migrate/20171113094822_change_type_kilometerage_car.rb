class ChangeTypeKilometerageCar < ActiveRecord::Migration[5.1]
  def change
    change_column :cars, :kilometerage, 'bigint USING CAST (kilometerage as bigint)'
  end
end
