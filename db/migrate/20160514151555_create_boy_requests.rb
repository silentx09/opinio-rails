class CreateBoyRequests < ActiveRecord::Migration
  def change
    create_table :boy_requests do |t|
      t.integer :boy_id
      t.integer :request_id
      t.datetime :eta
      t.string :request_status
      t.integer :order_id
      t.string :delivery_start_time
      t.string :datetime
      t.text :delivery_destination
      t.string :delivery_status

      t.timestamps null: false
    end
  end
end
