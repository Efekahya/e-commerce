/*
!                                              LOGIN - REGISTER                        
*___________________________________________________________________________________________________________________
! ../login
? get // no get request
? post // login functionality
? put // no put request
? delete // no delete request

! ../register
? get // no get request
? post // register functionality
? put // no put request
? delete // no delete request

! ../register/verify
? get // no get request
? post // verify functionality
? put // no put request
? delete // no delete request

*___________________________________________________________________________________________________________________

!                                              CORE FUNCTIONALITY                        
*___________________________________________________________________________________________________________________
! ../restaurants 
? get // returns all the restaurants inside the perimeter 
? post // adds new restaurant. only available to admins.
? put // no put request
? delete // no delete request

! ../restaurants/:id/
? get // returns specific restaurant info based on id.
? post // no post request
? put // change restaurant info only available to admins + restaurant owners
? delete // delete restaurant from the system.

! ../products  
? get // return all the products inside the perimeter
? post // no post request
? put // no put request
? delete // no delete request 

! ../restaurants/:id/addproduct 
? get // no get request
? post // add new product to restaurant menu
? put // no put request
? delete // no delete request 

! ../restaurants/:id/:productId
? get // return specific product info based on id
? post // no post request 
? put // change product info available to only restaurant owners + admins
? delete // delete product from the restaurant menu
*___________________________________________________________________________________________________________________


*/ 