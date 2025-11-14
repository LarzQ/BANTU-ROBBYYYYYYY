import { Component, OnInit } from '@angular/core';
import { Foodservice } from '../foodservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newpasta',
  templateUrl: './newpasta.page.html',
  styleUrls: ['./newpasta.page.scss'],
  standalone: false
})
export class NewpastaPage implements OnInit {

  public alertButtons = ['OK']

  arr_price:number[] = []

  new_name = ""
  new_desc = ""
  new_price = 0
  new_url = ""
  new_spicy = false

  pastas:any[]=[]

  constructor(private foodservice: Foodservice, private router: Router) { }

  ngOnInit() {
    this.arr_price=this.generateNumberOptions(30000,50000,2000)
  }

  generateNumberOptions(start: number, end: number, step: number): number[] {
      const options: number[] = [];
      for (let i = start; i <= end; i += step) {
        options.push(i);
      }
      return options;
  }

  submitpasta()
  {
    this.foodservice
      .addPasta(this.new_name, this.new_url, this.new_desc, this.new_price)
      .subscribe((response: any) => {
        if (response.result === 'success') {
          alert('success');
          this.router.navigate(['/pasta']);
        } else {
          alert(response.message);
        }
    });
  }
}