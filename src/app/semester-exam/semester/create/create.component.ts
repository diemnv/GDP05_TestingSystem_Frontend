import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SemesterExam } from '../model/SemesterExam';
import { ApiService } from '../../service/api.service';
import Swal from 'sweetalert2';

@Component({
   selector: 'app-create',
   templateUrl: './create.component.html',
   styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

   ckeConfig = {};
   @ViewChild("myckeditor") ckeditor: any;

   user = {
      userId: 1,
      fullName: "Vu Van Dong",
      email: "vudongkm1997@gmail.com",
      mobile: "0332132609",
      password: "123",
      status: 1,
   }

   profileFrm: FormGroup;
   constructor(private fb: FormBuilder, private router: Router, private service: ApiService) {
      this.ckeConfig = { extraPlugins: 'divarea', height: 110, allowedContent: false, forcePasteAsPlainText: true, fontSize_defaultLabel: 22 }
   }

   ngOnInit() {
      this.profileFrm = this.fb.group({
         name: ['', [Validators.required]],
         startTime: [new Date(), [Validators.required]],
         endTime: ['', [Validators.required]],
         description: '',
         creator: 1
      });
   }
   startTime: any;
   getStartTime(event: any) {
      if (event != null) {
         var selecttime = event.getTime();
      }
      var timenow = Date.now();
      if (selecttime < timenow) {
         let timerInterval
         Swal.fire({
            html:
               '<h4 class="text-danger">Thời gian bắt đầu phải lớn hơn hoặc bằng thời gian hiện tại' +
               '<p style="color:red">Vui lòng chọn lại thời gian<br/></p>' +
               '<i>Tự động đóng sau <strong></strong> seconds.</i>',
            showCloseButton: true,
            position: 'center',
            type: 'error',
            timer: 5000,
            onBeforeOpen: () => {
               Swal.showLoading()
               timerInterval = setInterval(() => {
                  Swal.getContent().querySelector('strong').textContent = (Swal.getTimerLeft() / 1000)
                     .toFixed(0)
               }, 100)
            },
            onClose: () => {
               clearInterval(timerInterval)
            }
         }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer || result.dismiss === Swal.DismissReason.backdrop) {
               this.startTime = null;
            }
         })
      }

      if (event == 'Invalid Date') {
         this.startTime = new Date();
      }
   }

   onChange(event: any): void {
      console.log(event);
   }

   onSubmit() {
      try {
         const value = this.profileFrm.value;
         const semesterExam: SemesterExam = {
            user: this.user,
            ...value
         };
         if (semesterExam.startTime.getTime() < semesterExam.endTime.getTime()) {
            this.service.saveOne('semesterexam/add', semesterExam).subscribe(data => {
               this.router.navigateByUrl('manager/semester');
            });
         } else {
            let timerInterval
            Swal.fire({
               html:
                  '<h4 class="text-danger">Thời gian kết thúc phải lớn hơn thời gian bắt đầu</h4>' +
                  '<p style="color:red">Vui lòng chọn lại thời gian<br/></p>' +
                  '<i>Tự động đóng sau <strong></strong> seconds.</i>',
               showCloseButton: true,
               position: 'center',
               type: 'error',
               timer: 5000,
               onBeforeOpen: () => {
                  Swal.showLoading()
                  timerInterval = setInterval(() => {
                     Swal.getContent().querySelector('strong').textContent = (Swal.getTimerLeft() / 1000)
                        .toFixed(0)
                  }, 100)
               },
               onClose: () => {
                  clearInterval(timerInterval)
               }
            }).then((result) => {
               if (result.dismiss === Swal.DismissReason.timer) {
                  // console.log('I was closed by the timer')
               }
            })
         }

      } catch (error) {
         console.log(error);
      }
   }

}
