import { Component, OnInit, Input } from '@angular/core';
import { userRole, UserroleService } from 'src/app/services/userrole.service';

@Component({
  selector: 'app-hintbox',
  templateUrl: './hintbox.component.html',
  styleUrls: ['./hintbox.component.css']
})
export class HintboxComponent implements OnInit {
  role: userRole = userRole.human_resources;
  @Input() stepperIndex: number = 0

  constructor(private userRoleService: UserroleService) {
    this.role = userRoleService.getUserRole();
   }

  ngOnInit(): void {
  }

}
