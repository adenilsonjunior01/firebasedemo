import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { ContactPage } from './../contact/contact';
import { ContactProvider } from '../../providers/contact/contact';
import { Observable } from 'rxjs-compat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contacts: Observable<any>;

  constructor(
    public navCtrl: NavController,
    private provider: ContactProvider,
    private toast: ToastController
    ) {
      this.contacts = this.provider.getAll();
    }

  newContact() {
    this.navCtrl.push(ContactPage);
  }

  editContact(contact: any) {
    this.navCtrl.push(ContactPage, { contact: contact});
  }

  removeContact(key: string) {
    this.provider.remove(key)
    .then(()=> {
      this.toast.create({ message: 'Contato removido com sucesso.', duration: 3000}).present();
    })
    .catch((e) => {
      this.toast.create({ message: 'Erro ao remover o contato.', duration: 3000}).present();
    })
  }
}
