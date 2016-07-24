json.array!(@boy_requests) do |boy_request|
  json.extract! boy_request, :id, :boy_id, :request_id, :eta, :request_status, :order_id, :delivery_start_time, :delivery_destination, :delivery_status, :store_id, :delivery_lat, :delivery_lng, :etd
  json.url boy_request_url(boy_request, format: :json)
end
