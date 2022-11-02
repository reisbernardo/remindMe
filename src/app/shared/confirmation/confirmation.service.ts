import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationComponent } from './confirmation.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    message: string,
    btnOkText: string,
    btnCancelText: string): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationComponent, { size: 'sm' });
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.btnCancelText = btnCancelText;

    return modalRef.result;
  }
}
