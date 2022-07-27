import { Component, OnInit } from '@angular/core';
import { persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona.service';
import { TokenService } from 'src/app/service/token.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  persona: persona = new persona("","","","","");

  public editPersona: persona ;
  
  constructor(public personaService: PersonaService, private tokenService: TokenService, private activatedRouter: ActivatedRoute,
    private router: Router) { }

  isLogged = false;

  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data => {this.persona = data})


    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }


  }


  
  public onOpenModal(mode: string, persona?: persona):void {

    const container=document.getElementById('main-container');
    const button=document.createElement('button');
   // button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toogle', 'modal');    
    
    
    if (mode==='edit')  {
      this.editPersona=persona;
      button.setAttribute('data-target','#editUsuarioModal');

    }



}


onUpdate(): void{
  const id = this.activatedRouter.snapshot.params['id'];
  this.personaService.update(id, this.persona).subscribe(
    data => {
      this.router.navigate(['']);
    }, err =>{
       alert("Error al modificar datos de la persona");
       this.router.navigate(['']);
    }
  )
}





}
