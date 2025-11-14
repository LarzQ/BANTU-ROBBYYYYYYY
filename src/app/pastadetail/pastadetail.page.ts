import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foodservice } from '../foodservice';

@Component({
  selector: 'app-pastadetail',
  templateUrl: './pastadetail.page.html',
  styleUrls: ['./pastadetail.page.scss'],
  standalone: false
})
export class PastadetailPage implements OnInit {

  index = 0
  pasta: any;
  constructor(
    private route: ActivatedRoute,
    private fs: Foodservice,
    private router: Router 
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.fs.pastaDetail(params['index']).subscribe((data) => {
        this.pasta = data;
      });
    });
  }

  deletepasta(id: any) {
    this.fs.deletePasta(id).subscribe((response: any) => {
      if (response.result === 'success') {
        alert('success');
        this.router.navigate(['/pasta']);
      } else {
        alert(response.message);
      }
    });
  }

  newStep: any;
  newInstruction: string = '';

  addInstruction(id: any) {
    if (!this.newStep || !this.newInstruction) {
      alert('Please fill both Step and Instruction!');
      return;
    }

    this.fs.addInstruction(id,this.newStep, this.newInstruction)
      .subscribe((response: any) => {
        if (response.result === 'success') {
          alert('Instruction added!');
          window.location.reload();
        } else {
          alert('Failed: ' + response.message);
        }
      });
  }
}
