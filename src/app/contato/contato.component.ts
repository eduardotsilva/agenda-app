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
  colunas = ["id", "nome", "email", "favorito"];

  constructor(private service: ContatoService, private fb: FormBuilder) {}

  ngOnInit() {
    this.montarFormulario();
    this.listarContatos();
  }

  montarFormulario() {
    this.formulario = this.fb.group({
      nome: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
    });
  }

  listarContatos() {
    this.service.list().subscribe(
      (response) => {
        this.contatos = response;
      },
      (responseError) => {}
    );
  }

  favoritar(contato: Contato) {
    this.service.favorite(contato).subscribe(
      (response) => {
        contato.favorito = !contato.favorito;
      },
      (responseError) => {}
    );
  }

  submit() {
    const formValue = this.formulario.value;
    const contato: Contato = new Contato(formValue.nome, formValue.email);

    this.service.save(contato).subscribe(
      (response) => {
        this.listarContatos();
      },
      (responseError) => {}
    );
  }
}
