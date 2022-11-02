import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlarmModalComponent } from 'src/app/shared/alarm-modal/alarm-modal.component';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  public openModal(
    modal: string,
    message: string,
    btnOkText: string = 'ok',
    btnCancelText: string = 'cancel'
  ): Promise<boolean> {
    let modalRef: any;
    if (modal == 'confirmation') {
      modalRef = this.modalService.open(ConfirmationModalComponent, {size: 'sm'});
      modalRef.componentInstance.message = message;
      modalRef.componentInstance.btnOkText = btnOkText;
      modalRef.componentInstance.btnCancelText = btnCancelText;
    } else {
      modalRef = this.modalService.open(AlarmModalComponent, { size: 'sm' });
      modalRef.componentInstance.message = message;
      modalRef.componentInstance.btn = btnOkText;
    }
    return modalRef.result;
  }
}
