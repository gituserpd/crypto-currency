import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListViewComponent } from './list-view/list-view.component';
import { CryptoService } from './crypto.service';

import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ValuesPipe } from './values.pipe';
import { PriceChartComponent } from './price-chart/price-chart.component';
import { LongPress } from 'long-press';
import { FavLogoComponent } from './fav-logo/fav-logo.component';
import { CompareComponent } from './compare/compare.component';

// import { HttpClient } from 'selenium-webdriver/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, MatInputModule, MatSortModule } from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    ListViewComponent,
    ValuesPipe,
    PriceChartComponent,
    LongPress,
    FavLogoComponent,
    CompareComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    BrowserAnimationsModule, 
    MatTableModule, MatPaginatorModule, MatFormFieldModule, 
    MatInputModule,MatPaginatorModule, MatSortModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: ListViewComponent },
      { path: 'detail/:id/:convert', component: PriceChartComponent },
      { path: 'compare/:id1/:id2/:convert', component: CompareComponent },
      { path: '**', component: ListViewComponent }
    ])
  ],
  providers: [CryptoService],
  bootstrap: [AppComponent],
  exports: [MatTableModule, MatPaginatorModule,MatPaginatorModule]
})
export class AppModule { }
