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
  contatos: Contato[] = [];

  constructor(private service: ContatoService, private fb: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      nome: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
    });
  }

  submit() {
    const formValue = this.formulario.value;
    console.log("formValues ", formValue);

    const contato: Contato = new Contato(formValue.nome, formValue.email);

    this.service.save(contato).subscribe(
      (response) => {
        console.log('response ',response);
        this.contatos.push(response);
      },
      (responseError) => {}
    );
  }
}
