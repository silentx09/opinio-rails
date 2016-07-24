//Comment this later..
var store_id = 3;


var store_id_name_pairs = {
    "Barbeque Nation" : 3
}


function submitRequest(){   
    store_id = store_id_name_pairs[$('#hidden_place').val().trim()];
    $.ajax({
        type: "POST",
        dataType: "json",
        url:'delivery_requests/save',
        data: { "delivery_request": 
            {
                "store_id" : store_id_name_pairs[$('#hidden_place').val().trim()], 
                "request_time" : $('#reach_time').val(), 
                "boys_required" : $('#no_of_boys_required').val(), 
                "total_amount" : $("#total_amount").val()               
            }
        },        
        success: function(data){            
            swal("Request Submitted!", "Delivery boys are being notified.", "success")
            console.log(data);
        },
        error: function(err){
            sweetAlert("Oops.", "Something went wrong!", "error");
            console.log(err);
        }
    });  
}

function getDeliveryRequests(){    
    $.ajax({
        type: "GET",
        dataType: "html",
        url:'/delivery_requests/list?store_id='+store_id,
        success: function(data){                    
            $('#tab_b').html($(data).filter('#tab_b_request_list').html());            
            requestsAcceptedByBoys(); 
            bindEvent();           
        }
    });      
}

function getDeliveries(){        
    $.ajax({
        type: "GET",
        dataType: "html",
        url:'/boy_requests/createDeliveryItems?store_id='+store_id,
        success: function(data){                                
            $('#tab_c').html($(data).filter('#tab_c_request_list').html());   
            calculateETD_3();      
            bindEvent();               
        }
    });      
}

function acceptRequest(){
     $.ajax({
        type: "POST",
        dataType: "json",
        url:'boy_requests/save',
        data: { "boy_request": 
            {
                "store_id" : $("#store_id").val(),
                "request_id" : $('#request_id').val(), 
                "boy_id" : $('#boy_id').val(), 
                "request_status" : $("#request_status").val()               
            }
        },        
        success: function(data){            
            swal("Get Going!", "The store owner is being notified.", "success")
            console.log(data);
        },
        error: function(err){
            sweetAlert("Oops.", "Something went wrong!", "error");
            console.log(err);
        }
    });  
}

function requestsAcceptedByBoys(){    

    /**
    if(update){        
        clearHtml = $(".boys_detail_container");
        for(var i = 0 ; i < clearHtml.length ; i++){
            child = clearHtml[i].firstElementChild;
            parent = clearHtml[i];
            parent.removeChild(child);            
        }
    }
    **/

     $.ajax({
        type: "GET",
        dataType: "html",
        url:'/boy_requests/list?store_id='+store_id,
        success: function(data){     
            var helperClassArray = $(data).filter('.helperClass');            
            var orderIds = {};            
            //console.log(helperClassArray);
            for(var i = 0 ; i < helperClassArray.length ; i++){                
                if(!orderIds.hasOwnProperty(helperClassArray[i].id)){
                    orderIds[helperClassArray[i].id] = 1;
                    $('#'+helperClassArray[i].id).append($(data).filter('#'+helperClassArray[i].id).html());            
                    //console.log(orderIds);
                }                                   
                else{
                    var getIndex = orderIds[helperClassArray[i].id];
                    var boyRequestClass = $(data).filter("."+helperClassArray[i].id)[getIndex];   
                    $('#'+helperClassArray[i].id).append(boyRequestClass);
                    orderIds[helperClassArray[i].id] = getIndex + 1;         
                }
            }            
            calculateETA_3();
        }
    });  
}

