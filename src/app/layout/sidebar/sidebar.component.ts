import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public menuItems = [
    { name: 'Users', icon: 'people', link: '/users' },
    { name: 'Attractions', icon: 'location_on', link: '/attractions' },
    { name: 'Pet Sales', icon: 'pets', link: '/pet-sales' },
  ];
}
