require 'test_helper'

class BoyRequestsControllerTest < ActionController::TestCase
  setup do
    @boy_request = boy_requests(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:boy_requests)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create boy_request" do
    assert_difference('BoyRequest.count') do
      post :create, boy_request: { boy_id: @boy_request.boy_id, datetime: @boy_request.datetime, delivery_destination: @boy_request.delivery_destination, delivery_start_time: @boy_request.delivery_start_time, delivery_status: @boy_request.delivery_status, eta: @boy_request.eta, order_id: @boy_request.order_id, request_id: @boy_request.request_id, request_status: @boy_request.request_status }
    end

    assert_redirected_to boy_request_path(assigns(:boy_request))
  end

  test "should show boy_request" do
    get :show, id: @boy_request
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @boy_request
    assert_response :success
  end

  test "should update boy_request" do
    patch :update, id: @boy_request, boy_request: { boy_id: @boy_request.boy_id, datetime: @boy_request.datetime, delivery_destination: @boy_request.delivery_destination, delivery_start_time: @boy_request.delivery_start_time, delivery_status: @boy_request.delivery_status, eta: @boy_request.eta, order_id: @boy_request.order_id, request_id: @boy_request.request_id, request_status: @boy_request.request_status }
    assert_redirected_to boy_request_path(assigns(:boy_request))
  end

  test "should destroy boy_request" do
    assert_difference('BoyRequest.count', -1) do
      delete :destroy, id: @boy_request
    end

    assert_redirected_to boy_requests_path
  end
end
