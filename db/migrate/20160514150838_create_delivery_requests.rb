class CreateDeliveryRequests < ActiveRecord::Migration
  def change
    create_table :delivery_requests do |t|
      t.integer :store_id
      t.datetime :request_time
      t.integer :boys_required
      t.float :total_amount
      t.string :status
      t.integer :accepted
      t.integer :arrived
      t.integer :on_route

      t.timestamps null: false
    end
  end
end
