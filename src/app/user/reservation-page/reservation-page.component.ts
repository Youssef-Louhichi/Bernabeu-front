import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Terrain } from 'src/app/models/terrain';
import { TerrainService } from 'src/app/services/terrain.service';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.css']
})
export class ReservationPageComponent implements OnInit {



  constructor(private terrainservice: TerrainService, private router: Router) { }

  terrains!: Terrain[];


  ngOnInit(): void {
    this.inisializeTerrain()
  }

  inisializeTerrain(){
    this.terrainservice.getTerrains().subscribe(res => this.terrains = res)
  }

  goToCalendrier(id: number) {
    this.router.navigate(['/main/reservation/calendrier', id])
  }




}
