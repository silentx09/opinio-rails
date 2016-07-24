require 'test_helper'

class DeliveryRequestsControllerTest < ActionController::TestCase
  setup do
    @delivery_request = delivery_requests(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:delivery_requests)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create delivery_request" do
    assert_difference('DeliveryRequest.count') do
      post :create, delivery_request: { accepted: @delivery_request.accepted, arrived: @delivery_request.arrived, boys_required: @delivery_request.boys_required, on_route: @delivery_request.on_route, request_time: @delivery_request.request_time, status: @delivery_request.status, store_id: @delivery_request.store_id, total_amount: @delivery_request.total_amount }
    end

    assert_redirected_to delivery_request_path(assigns(:delivery_request))
  end

  test "should show delivery_request" do
    get :show, id: @delivery_request
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @delivery_request
    assert_response :success
  end

  test "should update delivery_request" do
    patch :update, id: @delivery_request, delivery_request: { accepted: @delivery_request.accepted, arrived: @delivery_request.arrived, boys_required: @delivery_request.boys_required, on_route: @delivery_request.on_route, request_time: @delivery_request.request_time, status: @delivery_request.status, store_id: @delivery_request.store_id, total_amount: @delivery_request.total_amount }
    assert_redirected_to delivery_request_path(assigns(:delivery_request))
  end

  test "should destroy delivery_request" do
    assert_difference('DeliveryRequest.count', -1) do
      delete :destroy, id: @delivery_request
    end

    assert_redirected_to delivery_requests_path
  end
end
