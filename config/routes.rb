Rails.application.routes.draw do
  post '/boy_requests/updateDelivery', :to => 'boy_requests#updateDelivery'  
  post '/delivery_requests/save', :to => 'delivery_requests#create'
  post '/boy_requests/save', :to => 'boy_requests#create'
  get '/delivery_requests/list', :to => 'delivery_requests#list'
  get '/boy_requests/list', :to => 'boy_requests#list'
  get '/boy_requests/createDeliveryItems', :to => 'boy_requests#createDeliveryItems'
  get '/acceptRequest', :to => 'app#pilot_app'  
  resources :boy_requests 
  resources :delivery_requests
  resources :stores
  resources :delivery_boys    
  resources :app
end
