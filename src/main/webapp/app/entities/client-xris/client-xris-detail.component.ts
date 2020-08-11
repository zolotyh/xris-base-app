import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IClientXris } from 'app/shared/model/client-xris.model';

@Component({
  selector: 'jhi-client-xris-detail',
  templateUrl: './client-xris-detail.component.html',
})
export class ClientXrisDetailComponent implements OnInit {
  client: IClientXris | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ client }) => (this.client = client));
  }

  previousState(): void {
    window.history.back();
  }
}
