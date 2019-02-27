import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CKEditorModule } from 'ng2-ckeditor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxPaginationModule } from 'ngx-pagination';

import { SemesterRoutingModule } from './semester-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { CreateComponent } from './create/create.component';
import { InfoComponent } from './detail/info/info.component';
import { ReportComponent } from './detail/report/report.component';
import { CandidateComponent } from './detail/candidate/candidate.component';
import { ExamComponent } from './detail/exam/exam.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatNativeDateModule } from '@angular/material';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TestResultComponent } from './detail/test-result/test-result.component';
import { DatepickerComponent } from './share-use/datepicker/datepicker.component';
// import { GridModule, PDFModule } from '@progress/kendo-angular-grid';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
import { ConfirmComponent } from './share-use/confirm/confirm.component';
import { RouterModule } from '@angular/router';

@NgModule({
   declarations: [
      ListComponent,
      DetailComponent,
      CreateComponent,
      InfoComponent,
      ReportComponent,
      CandidateComponent,
      ExamComponent,
      TestResultComponent,
      DatepickerComponent,
      ConfirmComponent
   ],
   imports: [
      CommonModule,
      FormsModule,
      SemesterRoutingModule,
      CKEditorModule,
      MatDatepickerModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatRippleModule,
      MatDatepickerModule,
      MatNativeDateModule,
      SemesterRoutingModule,
      TabsModule.forRoot(),
      TimepickerModule.forRoot(),
      BsDatepickerModule.forRoot(),
      ModalModule.forRoot(),
      ReactiveFormsModule,
      NgxPaginationModule,
     // GridModule,
     // PDFModule ,
      PDFExportModule,
      RouterModule
   ]
})
export class SemesterModule { }
