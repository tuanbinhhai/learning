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

ActiveRecord::Schema.define(version: 20171128074742) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "car_more_informations", force: :cascade do |t|
    t.string "brand", null: false
    t.string "model", null: false
    t.string "power"
    t.string "type_of_chassi"
    t.integer "number_of_doors"
    t.string "torque"
    t.string "tank_capacity"
    t.integer "length"
    t.integer "width"
    t.integer "height"
    t.string "transmission_type"
    t.string "drive_type"
    t.string "type_of_four_wheel_drive"
    t.string "fuel_consumption"
    t.integer "number_of_seats"
    t.integer "year", null: false
    t.string "fuel_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cars", force: :cascade do |t|
    t.integer "user_id"
    t.string "version"
    t.bigint "kilometerage"
    t.integer "price"
    t.string "color"
    t.string "description"
    t.string "image", default: [], array: true
    t.string "origin"
    t.string "url"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "draft", default: false
    t.bigint "car_more_information_id", null: false
    t.index ["car_more_information_id"], name: "index_cars_on_car_more_information_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "content"
    t.bigint "car_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["car_id"], name: "index_comments_on_car_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "save_cars", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "car_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["car_id"], name: "index_save_cars_on_car_id"
    t.index ["user_id"], name: "index_save_cars_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "phone"
    t.string "name"
    t.string "avatar"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "location"
    t.string "email"
    t.json "authentoken"
    t.date "birthday"
  end

  add_foreign_key "cars", "car_more_informations"
  add_foreign_key "comments", "cars"
  add_foreign_key "comments", "users"
  add_foreign_key "save_cars", "cars"
  add_foreign_key "save_cars", "users"
end
