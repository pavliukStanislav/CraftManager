import { Component } from '@angular/core';

import 'firebase/firestore';
import { LogService } from './services/logging/log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ LogService ]
})
export class AppComponent {
  title = 'Craft manager';
}
