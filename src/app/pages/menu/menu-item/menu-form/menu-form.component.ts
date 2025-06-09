import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-menu-form',
  standalone: true,
  imports: [],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.css'
})
export class MenuFormComponent {
  constructor(public bsModalRef: BsModalRef) { }

}
