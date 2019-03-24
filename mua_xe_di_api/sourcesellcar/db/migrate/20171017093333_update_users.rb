class UpdateUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :location, :string
    add_column :users, :email, :string
    add_column :users, :authentoken, :json
  end
end
