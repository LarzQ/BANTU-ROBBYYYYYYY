import { Component, OnInit } from '@angular/core';

interface Product {
  productName: string;
  productDate: Date;
  productPrice: number;
  productQuantity: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: false
})
export class ListPage implements OnInit {
  couponcode: string = '0000';
  strvalid: string = 'invalid';
  textcolor: string = 'red';
  discount: number = 0;

  product: Product = {
    productName: 'Iphone 14',
    productDate: new Date(),
    productPrice: 14000000,
    productQuantity: 1
  };

  books = [
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publishedDate: new Date('1960-07-11'),
      price: 7.99,
      discount: 10
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publishedDate: new Date('1925-04-10'),
      price: 10.99,
      discount: 5
    },
    {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      publishedDate: new Date('1813-01-28'),
      price: 12.75,
      discount: 15
    }
  ];

  today: string = '15 September 2025';
  currentDate = new Date();
  numberclicked = 0;

  is5daysago = false;
  is5dayslater = false;
  isMinimum = false;
  isMaximum = false;

  constructor() { }

  ngOnInit() { }

  getDiscountedPrice(book: any): number {
    return book.price - (book.price * book.discount / 100);
  }

  getFinalPrice(book: any): number {
    const priceAfterItemDiscount = this.getDiscountedPrice(book);
    return priceAfterItemDiscount - (priceAfterItemDiscount * this.discount / 100);
  }

  today_ind(): string {
    const bulans = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const haris = [
      'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
    ];

    const d = this.currentDate.getDate();
    const m = this.currentDate.getMonth();
    const y = this.currentDate.getFullYear();
    const day = this.currentDate.getDay();

    return `${haris[day]}, ${d}-${bulans[m]}-${y}`;
  }

  checkValid() {
    if (this.couponcode === '1234') {
      this.strvalid = 'valid';
      this.discount = 5;
      this.textcolor = 'green';
    } else if (this.couponcode === '6789') {
      this.strvalid = 'valid';
      this.discount = 10;
      this.textcolor = 'green';
    } else {
      this.strvalid = 'invalid';
      this.discount = 0;
      this.textcolor = 'red';
    }
  }

  total(): number {
    return this.product.productQuantity * this.product.productPrice;
  }

  goYesterday() {
    this.currentDate.setDate(this.currentDate.getDate() - 1);
    this.numberclicked++;

    if (this.is5dayslater) this.is5dayslater = false;
    if (this.numberclicked === 5) this.is5daysago = true;
  }

  goToday() {
    this.currentDate = new Date();
    this.numberclicked = 0;

    this.is5daysago = false;
    this.is5dayslater = false;
    this.isMinimum = false;
    this.isMaximum = false;

    this.product.productQuantity = 1;
  }

  goTomorrow() {
    this.currentDate.setDate(this.currentDate.getDate() + 1);
    this.numberclicked--;

    if (this.is5daysago) this.is5daysago = false;
    if (this.numberclicked === -5) this.is5dayslater = true;
  }

  reduceQuantity() {
    if (this.product.productQuantity > 0) {
      this.product.productQuantity--;
      this.isMaximum = false;
    }
    this.isMinimum = this.product.productQuantity === 0;
  }

  addQuantity() {
    if (this.product.productQuantity < 10) {
      this.product.productQuantity++;
      this.isMinimum = false;
    }
    this.isMaximum = this.product.productQuantity === 10;
  }
}
