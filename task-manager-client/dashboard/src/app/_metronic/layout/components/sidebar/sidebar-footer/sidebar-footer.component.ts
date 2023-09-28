import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { AuthService } from "../../../../../modules/auth/services/auth.service";

@Component({
  selector: 'app-sidebar-footer',
  templateUrl: './sidebar-footer.component.html',
  styleUrls: ['./sidebar-footer.component.scss'],
})
export class SidebarFooterComponent {
  appPreviewChangelogUrl: string = environment.appPreviewChangelogUrl;

  constructor(
    private auth: AuthService,
  ) {}

  logout() {
    this.auth.logout();
    document.location.reload();
  }
}
