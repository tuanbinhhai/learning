class AddDraftToCars < ActiveRecord::Migration[5.1]
  def change
    add_column :cars, :draft, :bool, default: false
  end
end
