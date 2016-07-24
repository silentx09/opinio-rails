delivery_boys_list = [
  [ "Piyush", 9029537456 ],
  [ "Dheeraj", 9029537457 ],
  [ "Shubham", 9029537458 ],
  [ "Shivam", 9029537459 ],
  [ "Kancha", 9029537460 ],
  [ "Shashank", 9029537461 ],
  [ "Sanchit", 9029537462 ],
  [ "Debendra", 9029537463 ],
  [ "Abhijeet", 9029537464 ],
  [ "Mayank", 9029537465 ]
]

delivery_boys_list.each do |name, mobile|
  DeliveryBoy.create( name: name, mobile: mobile )
end