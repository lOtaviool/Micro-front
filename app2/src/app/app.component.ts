import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'app2';
  public user: any = {}

  constructor (){ }

  async ngOnInit(){
    await window.addEventListener('userAngular', (event: any) => {
      this.user = event.detail;
      if(this.user){
        console.log("USER ANGULAR", this.user);
        window.removeEventListener('userAngular', (event: any)=>{event})
      }
    });
  }

}
