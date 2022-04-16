import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  myVariable = 'I open at the close ';
  num = 1;
  image = null;

  person ={
    name : '',
    age: ''
  };


  constructor(private router: Router, private storage: Storage  ) {}

  updateValue(){
    this.num += 1;
    this.myVariable = 'Now the force is getting even stronger, '+ this.num;
  }

  openDetails(){
    this.router.navigateByUrl('/list/10000');
  }

  savePerson(){
    this.storage.set('my-person', this.person);
    console.log('Save Person');
  }

  async loadPerson(){
    const result = await this.storage.get('my-person');
    if(result){
      this.person = result;
      console.log('Load Person');
    }
  }

  async captureImage(){
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    });

    this.image = 'data:image/jpeg;base64,' + image.base64String;
  }

}
