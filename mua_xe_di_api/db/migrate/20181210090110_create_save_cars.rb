class CreateSaveCars < ActiveRecord::Migration[5.2]
  def change
    create_table :save_cars do |t|
      t.references :user, foreign_key: true
      t.references :car, foreign_key: true

      t.timestamps
    end
  end
end
