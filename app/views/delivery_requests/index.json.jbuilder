json.array!(@delivery_requests) do |delivery_request|
  json.extract! delivery_request, :id, :store_id, :request_time, :boys_required, :total_amount, :status, :accepted, :arrived, :on_route
  json.url delivery_request_url(delivery_request, format: :json)
end
