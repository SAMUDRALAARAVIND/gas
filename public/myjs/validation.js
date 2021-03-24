function registration_validate() 
{
   if( $("#create_password").val() != $("#confirm_password").val())
   {
    $("#create_password_label").text("Passwords must match").css("color","red") ;
    $("#confirm_password_label").text("Passwords must match").css("color","red") ;
       arr[7] = false ;
       return false ;
   }
   else
   {
    arr[7] = true ;
    if(arr.every(function check_bro(k) { return k==true ;}))
   {
    return true ;
   }
   else{
      return false;
   }
   }
   
}