import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/semester-exam/service/api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Test } from './test.interface';

@Component({
   selector: 'app-test-result',
   templateUrl: './test-result.component.html',
   styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {
   @Output() public eventName = new EventEmitter();
   @Input() public actived: boolean;
   data = [];
   exam = [];
   testFrm: FormGroup;
   @Input()
   semester_id: string;
   selectedAll: any;
   arrDelete: any = [];
   isCheck: boolean = false;

   public TestList = [];
   configPagination: any;
   itempages: any = [2, 4, 6, 8];
   constructor(private fb: FormBuilder,
      private http: HttpClient,
      private router: Router,
      private service: ApiService) {
      this.configPagination = {
         currentPage: 1,
         itemsPerPage: 8
      }
   }

   ngOnInit() {
      this.getAll();
      this.getAllExam();
      this.getListTest();
      this.testFrm = this.fb.group({
         testID: null,
         testName: ['', [Validators.required, Validators.minLength(5)]],
         status: 1,
         exam: this.fb.group({
            examId: [null, [Validators.required, Validators.minLength(5)]]
         }),
         semesterExam: {
            id: this.semester_id
         }
      });
   }

   isCheckAll(event: any) {
      if (event.target.checked) {
         this.isCheck = true;
         var othis = this;
         this.TestList.filter(function (item) {
            othis.arrDelete.push(item.id);
         })

      } else {
         this.isCheck = false;
         this.arrDelete = [];
      }
   }

   getId(event: any) {
      if (event.target.checked) {
         this.arrDelete.push(event.target.value);
      } else {
         this.arrDelete = this.arrDelete.filter(item => item !== event.target.value);
      }
   }

   deleteItem() {
      if (this.arrDelete.length == 0) {
         alert("Chưa chọn kỳ thi để xóa");
      } else {
         var temp = confirm("Bạn có chắc chắn muốn xóa không?");
         if (temp) {
            for (let i = 0; i < this.arrDelete.length; i++) {
               this.service.deleteTest(`test/delete/${this.arrDelete[i]}`).subscribe(result => {
                  this.TestList = result.data;
                  this.getAll();
               });
            }
            this.arrDelete = [];
         }
      }
   }

   changeTabs() {
      this.eventName.emit(true);
   }

   semesterExamTrackByFn(test: Test) {
      return test.testID;
   }

   getListTest() {
      this.service.getAll('test/listTest').subscribe(result => {
         this.TestList = result.data;
      });
   }

   getAll() {
      this.service.getAll(`test/listBySemester/${this.semester_id}`).subscribe(result => {
         this.data = result;
      });
   }
   getAllExam() {
      this.service.getAll("exam/listExams").subscribe(result => {
         this.exam = result;
      });
   }
   onSubmit() {
      try {
         const value = this.testFrm.value;
         const test: Test = { ...value };
         this.service.saveOne('test/add', test).subscribe(data => {
            this.onReset();
            this.getAll();
         });
      } catch (error) {
         console.log(error);
      }
   }

   onReset(): void { this.resetForm(); }

   resetForm(value: any = undefined): void {
      this.testFrm.reset(value);
   }



}

