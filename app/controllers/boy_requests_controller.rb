class BoyRequestsController < ApplicationController
  before_action :set_boy_request, only: [:show, :edit, :update, :destroy]

  def list                
    @requests = BoyRequest.find_by_sql("
      Select t1.id, t1.boy_id, t1.request_id, t2.name, t2.mobile, t1.eta, t1.request_status, t1.order_id, t1.delivery_destination FROM boy_requests t1
      INNER JOIN delivery_boys t2
      ON t1.boy_id = t2.id
      where store_id = #{params[:store_id]}
      order by boy_id")


  end   

  # GET /boy_requests
  # GET /boy_requests.json
  def index
    @boy_requests = BoyRequest.all
  end

  # GET /boy_requests/1
  # GET /boy_requests/1.json
  def show
  end

  # GET /boy_requests/new
  def new
    @boy_request = BoyRequest.new
  end

  # GET /boy_requests/1/edit
  def edit
  end

  # POST /boy_requests
  # POST /boy_requests.json
  def create
    @boy_request = BoyRequest.new(boy_request_params)    
    respond_to do |format|
      if @boy_request.save
        format.html { redirect_to @boy_request, notice: 'Boy request was successfully created.' }
        format.json { render :show, status: :created, location: @boy_request }
        a = DeliveryRequest.find(params["boy_request"]["request_id"])
        a.accepted = a.accepted + 1
        a.on_route = a.on_route + 1
        a.save
      else
        format.html { render :new }
        format.json { render json: @boy_request.errors, status: :unprocessable_entity }
      end
    end        
    
  end

  def updateDelivery    
    updateRecord = BoyRequest.find(params["updateDelivery"]["id"])
    updateRecord.order_id = params["updateDelivery"]["order_id"]
    updateRecord.delivery_destination = params["updateDelivery"]["delivery_destination"]
    updateRecord.delivery_lat = params["updateDelivery"]["delivery_lat"]
    updateRecord.delivery_lng = params["updateDelivery"]["delivery_lng"]
    updateRecord.delivery_start_time = params["updateDelivery"]["delivery_start_time"];
    updateRecord.save    
  end
   
  def createDeliveryItems
     @deliveries = BoyRequest.find_by_sql("
      Select t1.id, t1.boy_id, t1.request_id, t2.name, t2.mobile, t1.eta, t1.etd, t1.delivery_status, t1.order_id, t1.delivery_destination, t1.delivery_start_time, t1.delivery_lng, t1.delivery_lat, t1.order_id FROM boy_requests t1
      INNER JOIN delivery_boys t2
      ON t1.boy_id = t2.id
      where store_id = #{params[:store_id]}
      order by t1.order_id DESC")     
  end 

  # PATCH/PUT /boy_requests/1
  # PATCH/PUT /boy_requests/1.json
  def update    
    respond_to do |format|
      if @boy_request.update(boy_request_params)
        format.html { redirect_to @boy_request, notice: 'Boy request was successfully updated.' }
        format.json { render :show, status: :ok, location: @boy_request }
        a = DeliveryRequest.find(params["boy_request"]["request_id"])
        if params["boy_request"]["request_status"]  == "Arrived"        
          if a.arrived < a.boys_required
            a.arrived = a.arrived + 1
            a.on_route = a.on_route - 1
          end            
          a.save
        end          
      else
        format.html { render :edit }
        format.json { render json: @boy_request.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /boy_requests/1
  # DELETE /boy_requests/1.json
  def destroy
    @boy_request.destroy
    respond_to do |format|
      format.html { redirect_to boy_requests_url, notice: 'Boy request was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_boy_request
      @boy_request = BoyRequest.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def boy_request_params
      params.require(:boy_request).permit(:boy_id, :request_id, :eta, :request_status, :order_id, :delivery_start_time, :delivery_destination, :delivery_status, :store_id, :delivery_lat, :delivery_lng)
    end
end
