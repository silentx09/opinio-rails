class AddColumnNameToBoyRequests < ActiveRecord::Migration
  def change
    add_column :boy_requests, :store_id, :integer
  end
end
