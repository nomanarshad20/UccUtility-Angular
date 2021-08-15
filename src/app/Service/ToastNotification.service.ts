import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastNotification {


  constructor() {
  }



  info(msg:string , header:string , toastr: ToastrService){
    toastr.info(msg, header,{
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
      easing: 'ease-in'
    });
    }


    
    warning(msg:string , header:string , toastr: ToastrService){
    toastr.warning(msg, header,{
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      closeButton: true,
      easing: 'ease-in'
    });
    }


    
    success(msg:string , header:string , toastr: ToastrService){
      toastr.success(msg, header,{
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        closeButton: true,
        easing: 'ease-in'
      });
      }



      
      error(msg:string , header:string , toastr: ToastrService){
      toastr.error(msg, header,{
        timeOut: 6000,
        positionClass: 'toast-bottom-right',
        closeButton: true,
        easing: 'ease-in'
      });
      }

    
}