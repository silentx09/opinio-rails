require 'test_helper'

class DeliveryBoysControllerTest < ActionController::TestCase
  setup do
    @delivery_boy = delivery_boys(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:delivery_boys)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create delivery_boy" do
    assert_difference('DeliveryBoy.count') do
      post :create, delivery_boy: { mobile: @delivery_boy.mobile, name: @delivery_boy.name }
    end

    assert_redirected_to delivery_boy_path(assigns(:delivery_boy))
  end

  test "should show delivery_boy" do
    get :show, id: @delivery_boy
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @delivery_boy
    assert_response :success
  end

  test "should update delivery_boy" do
    patch :update, id: @delivery_boy, delivery_boy: { mobile: @delivery_boy.mobile, name: @delivery_boy.name }
    assert_redirected_to delivery_boy_path(assigns(:delivery_boy))
  end

  test "should destroy delivery_boy" do
    assert_difference('DeliveryBoy.count', -1) do
      delete :destroy, id: @delivery_boy
    end

    assert_redirected_to delivery_boys_path
  end
end
