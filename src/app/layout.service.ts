import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  // BehaviorSubject que controla a adição ou remoção da classe 'active'
  private layoutState = new BehaviorSubject<boolean>(true);

  // Observable que os componentes podem se inscrever
  layoutState$ = this.layoutState.asObservable();

  // Método para alterar o estado da classe 'active'
  toggleActiveState() {
    this.layoutState.next(!this.layoutState.value);
  }
}
