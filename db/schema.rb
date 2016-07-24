# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160514172251) do

  create_table "boy_requests", force: :cascade do |t|
    t.integer  "boy_id",               limit: 4
    t.integer  "request_id",           limit: 4
    t.datetime "eta"
    t.string   "request_status",       limit: 255
    t.integer  "order_id",             limit: 4
    t.string   "delivery_start_time",  limit: 255    
    t.text     "delivery_destination", limit: 65535
    t.string   "delivery_status",      limit: 255
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.integer  "store_id",             limit: 4
    t.string   "delivery_lat",         limit: 255
    t.string   "delivery_lng",         limit: 255
  end

  create_table "delivery_boys", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "mobile",     limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "delivery_requests", force: :cascade do |t|
    t.integer  "store_id",      limit: 4
    t.datetime "request_time"
    t.integer  "boys_required", limit: 4
    t.float    "total_amount",  limit: 24
    t.string   "status",        limit: 255
    t.integer  "accepted",      limit: 4,   default: 0
    t.integer  "arrived",       limit: 4,   default: 0
    t.integer  "on_route",      limit: 4,   default: 0
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
  end

  create_table "stores", force: :cascade do |t|
    t.string   "name",           limit: 255
    t.text     "address",        limit: 65535
    t.string   "lat",            limit: 255
    t.string   "long",           limit: 255
    t.string   "contact_person", limit: 255
    t.string   "mobile",         limit: 255
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
  end

end
