import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClientXris } from 'app/shared/model/client-xris.model';
import { ClientXrisService } from './client-xris.service';

@Component({
  templateUrl: './client-xris-delete-dialog.component.html',
})
export class ClientXrisDeleteDialogComponent {
  client?: IClientXris;

  constructor(protected clientService: ClientXrisService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.clientService.delete(id).subscribe(() => {
      this.eventManager.broadcast('clientListModification');
      this.activeModal.close();
    });
  }
}
