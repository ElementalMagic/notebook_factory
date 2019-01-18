import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

const TYPE_BLOKNOT_NA_PRUJINE = 'блокнот на пружине';
const TYPE_BLOKNOT_NA_KLEU = 'блокнот на клею';

const FORMAT_A4 = 'A4';
const FORMAT_A5 = 'A5';

const NAVIVKA_VERTICAL = 'вертикальная';
const NAVIVKA_HORIZONTAL = 'горизонтальная';

const BLOK_BUMAGA_80_GR = '80 гр.';
const BLOK_BYMAGA_100_GR = '100 гр.';

const BLOK_CVETNOST_0_0 = '0+0';
const BLOK_CVETNOST_4_0 = '4+0';
const BLOK_CVETNOST_4_4 = '4+4';

const OBLOJKA_BUMAGA_200 = '200 гр.';
const OBLOJKA_BYMAGA_250 = '250 гр.';

const OBLOJKA_CVETNOST_0_0 = '0+0';
const OBLOJKA_CVETNOST_4_0 = '4+0';
const OBLOJKA_CVETNOST_4_4 = '4+4';

const COMPLEXITY_FACTOR = 1;
const N_PAPER = 0;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculator';

  type: string = TYPE_BLOKNOT_NA_PRUJINE;
  format: string = FORMAT_A4;
  navivka: string = NAVIVKA_VERTICAL;
  paperCount: number = 0;
  copies: number = 0;
  blockPaperWeight = 80;  //BLOK_BUMAGA_80_GR
  blockChromaticity: string = BLOK_CVETNOST_0_0;
  coverPaper = 200;
  coverСhromaticity: string = OBLOJKA_CVETNOST_0_0;
  resultPrice: number = 0;

  // formula vars
  productsPerSheet: number = 0;
  printing: number = 0;
  cutting: number = 0;
  leafPrice: number = 0;
  offsetPrice: number = 0;

  changeType(newType: string){
    this.type = newType;
    this.updatePrice();
  }

  changeFormat(newFormat: string){
    this.format = newFormat;
    this.updatePrice();
  }

  changeNavivka(newNavivka: string){
    this.navivka = newNavivka;
    this.updatePrice();
  }

  changeBlockPaper(paper: string){
    switch(paper.toString()){
      case BLOK_BUMAGA_80_GR:
        this.blockPaperWeight = 80;
        break;
      case BLOK_BYMAGA_100_GR:
        this.blockPaperWeight = 100;
        break;
    }
    this.updatePrice();
  }

  changeBlockChromaticity(chromaticity: string){
    this.blockChromaticity = chromaticity;
    this.updatePrice();
  }

  changeCoverPaper(paper: string){
    switch(paper){
      case OBLOJKA_BUMAGA_200:
        this.coverPaper = 200;
        break;
      case OBLOJKA_BYMAGA_250:
        this.coverPaper = 250;
        break;
    }
    this.updatePrice();
  }

  changeCoverChromaticity(chromaticity: string){
    this.coverСhromaticity = chromaticity;
    this.updatePrice();
  }
  l(m){
    console.log(m);
  }
  updatePrice(){
    this.resultPrice = 0;
    this.productsPerSheet = this.format === FORMAT_A4 ? 2 : 4;
    this.productsPerSheet = Math.floor(this.productsPerSheet);
    let edition = this.paperCount*this.copies;
    let cover = 0;
    let block = 0;
    let postPrinting = 0;
    this.copies = +this.copies;
    switch(this.coverСhromaticity){
      case OBLOJKA_CVETNOST_4_0:{
        // cover
        this.printing = (2800+0.75*this.copies)*(1+COMPLEXITY_FACTOR)/2;
        this.l(this.printing);
        this.cutting = 300+(1+this.copies/50)*this.productsPerSheet*(1+this.coverPaper/1000);
        this.leafPrice = 0;
        this.leafPrice = (0.175*85*(this.coverPaper/1000)*(150*COMPLEXITY_FACTOR+this.copies+this.copies*0.02));
        this.offsetPrice = 800;
        cover = (this.printing+this.cutting)*(1-0/*скидка*/)+
          this.leafPrice+this.offsetPrice;
        // block
        switch (this.blockChromaticity) {
          case BLOK_CVETNOST_4_0:{
            this.printing = ((1700+edition*0.75) /*часть формулы с цветами*/ +
              (1000+edition*0.7)+(700+edition*0.5))*(1+COMPLEXITY_FACTOR)/2;
            this.cutting = 300+(1+edition/50)*this.productsPerSheet*(1+this.blockPaperWeight/1000);
            this.leafPrice = (0.175*85*this.blockPaperWeight/1000*
              (50*COMPLEXITY_FACTOR+edition+edition*0.03))*(1+0); // в формуле не учтено количество красок
            this.offsetPrice = 200; // в формуле не учтено количество красок
            block = (this.printing+this.cutting)*(1-0)+this.leafPrice+this.offsetPrice;
            break;
          }
        }

        // navivka
        let navivka = 0;
        if(this.copies <= 30){
          navivka = 148*this.copies/10*0.1 + (0.75+this.copies*148/10*0.75);
        } else if(this.copies <= 40){
          navivka = 148*this.copies/10*0.13 + (0.80+this.copies*148/10*0.80);
        } else {
          navivka = 148*this.copies/10*0.16 + (0.90+this.copies*148/10*0.90);
        }

        this.resultPrice = (cover + block + navivka)*0.7;
        if(this.type === TYPE_BLOKNOT_NA_KLEU){
          this.resultPrice *= 1.1;
        }
        this.resultPrice = Math.floor(this.resultPrice);
        break;
      }
    }
  }
}
