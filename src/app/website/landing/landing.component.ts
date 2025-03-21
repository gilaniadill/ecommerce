import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  isVisible:boolean=false;

  showSearch(){
    this.isVisible = !this.isVisible;
  }
}
