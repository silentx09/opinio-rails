class CreateStores < ActiveRecord::Migration
  def change
    create_table :stores do |t|
      t.string :name
      t.text :address
      t.string :lat
      t.string :long
      t.string :contact_person
      t.string :mobile

      t.timestamps null: false
    end
  end
end
