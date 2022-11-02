import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alarm-modal',
  templateUrl: './alarm-modal.component.html',
  styleUrls: ['./alarm-modal.component.css']
})
export class AlarmModalComponent implements OnInit {

  @Input() message: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  
  fechar() {
    this.activeModal.close(true);
  }

}
