json.array!(@delivery_boys) do |delivery_boy|
  json.extract! delivery_boy, :id, :name, :mobile
  json.url delivery_boy_url(delivery_boy, format: :json)
end
