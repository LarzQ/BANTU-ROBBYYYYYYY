import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
  standalone: false
})
export class SettingPage implements OnInit {
  url: string = '';
  password: string = '';

  kriteria1: boolean = false;
  kriteria2: boolean = false; 
  kriteria3: boolean = false;

  constructor() {}

  ngOnInit() {}

  private containsDigit(str: string): boolean {
    return /\d/.test(str);
  }

  private containsSpecialChar(str: string): boolean {
    return /[!@#$%^&*]/.test(str);
  }

  cekPassword() {
    this.kriteria1 = this.password.length > 6;
    this.kriteria2 = this.containsDigit(this.password);
    this.kriteria3 = this.containsSpecialChar(this.password);
  }
}
