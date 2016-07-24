json.array!(@stores) do |store|
  json.extract! store, :id, :name, :address, :lat, :long, :contact_person, :mobile
  json.url store_url(store, format: :json)
end
