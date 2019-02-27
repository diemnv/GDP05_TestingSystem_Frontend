import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/semester-exam/service/api.service';
import { Router } from '@angular/router';
import { SemesterExam } from '../../model/SemesterExam';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Common } from 'src/app/semester-exam/utils/Common';

@Component({
   selector: 'app-info',
   templateUrl: './info.component.html',
   styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
   public obj: any = {}
   data: FormGroup;
   @Input() semester_id: string;
   ckeConfig: any;
   @ViewChild("myckeditor") ckeditor: any;

   startTime: Date;
   endTime: Date;
   semestercode: string = "";
   // public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

   constructor(private fb: FormBuilder, private service: ApiService, private router: Router, private common: Common) {
      this.ckeConfig = { extraPlugins: 'divarea', height: 110, allowedContent: false, forcePasteAsPlainText: true, fontSize_defaultLabel: 22 }
   }

   ngOnInit() {
      this.getOneByID(this.semester_id);
      this.data = this.fb.group({
         id: '',
         name: ['', [Validators.required]],
         user: this.fb.group({
            userId: '',
            fullName: ['']
         }),
         status: ['', [Validators.required]],
         startTime: ['', [Validators.required]],
         endTime: [new Date(), [Validators.required]],
         description: ['', [Validators.required]],

         semesterExamCode: this.fb.group({
            code: []
         })
      });
   }

   getOneByID(id: string) {
      this.service.getOne('semesterexam/getone', id).subscribe(result => {
         this.obj = result.data;
         console.log(this.obj);
         const semesterUser: SemesterExam = result.data;
         this.data.patchValue(semesterUser);
      });
   }

   save() {
      try {
         const value = this.data.value;
         const test: SemesterExam = { ...value };
         const code = this.data.get("semesterExamCode") as FormArray;
         test.semesterExamCode = [code.value];
         console.log(test);
         this.service.saveOne('semesterexam/add', test).subscribe(data => {
            console.log(data);
         });

      } catch (error) {
         console.log(error);
      }
      //console.log()
   }

   comeBack() {
      this.router.navigateByUrl("manager/semester")
   }

   autoCodeSemesterExam() {
      this.semestercode = this.common.randomString();
      var obj = {
         semesterExamCode: {
            // id:this.obj.id,
            code: this.semestercode
         }
      };
      this.data.patchValue(obj);
   }

}
