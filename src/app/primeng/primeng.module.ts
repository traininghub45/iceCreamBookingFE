import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import { AccordionModule } from 'primeng/accordion';
import { TimelineModule } from 'primeng/timeline';
import { PanelModule } from 'primeng/panel';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OrderListModule } from 'primeng/orderlist';
import { InputMaskModule } from 'primeng/inputmask';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CarouselModule } from 'primeng/carousel';
const primeModules = [
  TableModule,
  CardModule,
  ButtonModule,
  TagModule,
  ChipModule,
  AccordionModule,
  TimelineModule,
  MenuModule,
  SplitButtonModule,
  DynamicDialogModule,
  OrderListModule,
  ConfirmDialogModule,
  InputMaskModule,
  ToastModule,
  RatingModule,
  PanelModule,
  CarouselModule,
  ConfirmDialogModule 
];
@NgModule({
  imports: primeModules,
  exports: primeModules,
})
export class PrimeNgModule {}
