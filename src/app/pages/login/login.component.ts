import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ NgIf ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  isOpen: boolean = false;
  stepForm: number = 1;
  showPassword: boolean = false;

  setStatusOpen(value: boolean) {
    this.isOpen = value;
  }
  setStepForm(value: number) {
    this.stepForm = value;
  }
  resetSteps() {
    this.stepForm = 1;
    this.isOpen = false;
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
