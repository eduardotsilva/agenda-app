import { Component, OnInit } from "@angular/core";
import { ContatoService } from "../contato.service";
import { Contato } from "./contato";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-contato",
  templateUrl: "./contato.component.html",
  styleUrls: ["./contato.component.css"],
})
export class ContatoComponent implements OnInit {
  formulario: FormGroup;

  constructor(private service: ContatoService, private fb: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      nome: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
    });
  }

  submit() {
    console.log(this.formulario.value);

    const teste = this.formulario.controls.email.errors.email;
    console.log(teste);

    //this.service.save(c).subscribe(
    // (response) => {
    //  console.log(response);
    //},
    //(responseError) => {}
    //);
  }
}
