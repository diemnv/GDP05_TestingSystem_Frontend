import { Injectable } from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class Common {
   randomString(): string {
      var text_radom = Math.random().toString(36).substring(3);
      var text_str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var text_number = "0123456789";
      for (var i = 0; i < 3; i++) {
         text_radom += text_str.charAt(Math.floor(Math.random() * text_str.length));
      }
      for (var i = 0; i < 2; i++) {
         text_radom += text_number.charAt(Math.floor(Math.random() * text_number.length));
      }
      return text_radom;
   }
}
