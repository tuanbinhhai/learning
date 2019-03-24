class CreateCars < ActiveRecord::Migration[5.1]
  def change
    create_table :cars do |t|
      t.integer :user_id
      t.string :model
      t.integer :year
      t.string :transmission
      t.string :fuel
      t.string :version
      t.string :kilometerage
      t.integer :price
      t.string :color
      t.string :description
      t.string :image, default: [], array: true
      t.string :origin
      t.string :brand
      t.string :url
      t.string :address

      t.timestamps
    end
  end
end
