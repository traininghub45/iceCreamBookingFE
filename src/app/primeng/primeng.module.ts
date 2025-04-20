// primeng.module.ts
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
  imports: [
    ButtonModule,
    TableModule,
    ToastModule,
    CardModule,
    InputMaskModule,
    CarouselModule
  ],
  exports: [
    ButtonModule,
    TableModule,
    ToastModule,
    CardModule,
    InputMaskModule,
    CarouselModule,
  ]
})
export class PrimeNgModule { }
