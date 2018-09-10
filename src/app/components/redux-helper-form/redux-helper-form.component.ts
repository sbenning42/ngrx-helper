import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormArray } from '../../../../node_modules/@angular/forms';

function validateJson(c: AbstractControl): ValidationErrors {
  try {
    JSON.parse(c.value);
    return {
    };
  }
  catch {
    return {
      invalidJson: true
    };
  }
}

@Component({
  selector: 'app-redux-helper-form',
  templateUrl: './redux-helper-form.component.html',
  styleUrls: ['./redux-helper-form.component.css']
})
export class ReduxHelperFormComponent implements OnInit {

  actions = [];
  stateModel: string;
  template: string;
  templateHtml: string;

  helperForm: FormGroup;

  nameControl: FormControl;
  modelControl: FormControl;
  newActionNameControl: FormControl;
  actionsControlArray: FormArray;

  constructor() {
    this.nameControl = new FormControl('', [Validators.required]);
    this.newActionNameControl = new FormControl('', []);
    this.modelControl = new FormControl('', [
      Validators.required,
      validateJson
    ]);
    this.actionsControlArray = new FormArray([]);
    this.helperForm = new FormGroup({
      nameControl: this.nameControl,
      modelControl: this.modelControl,
      newActionNameControl: this.newActionNameControl,
      actionsControlArray: this.actionsControlArray
    });
  }

  ngOnInit() {
  }

  addAction() {
    if (this.newActionNameControl.value) {
      this.actions.push({type: this.newActionNameControl.value});
      this.actionsControlArray.push(new FormControl('', [Validators.required, validateJson]));
      this.newActionNameControl.reset();
    }
  }

  removeAction(index: number) {
    this.actions = this.actions.filter((a, i) => i !== index);
    this.actionsControlArray.removeAt(index);
  }

  prepareModel(model: string) {
    model = model.replace(/{(.*)}/, '$1');
    return model.replace(/"(.*?)"/g, '$1');
  }

  prepare() {
    this.stateModel = this.prepareModel(this.modelControl.value);
    this.actions.forEach((a,i) => {
      a.json = this.actionsControlArray.value[i];
    });
  }

  generate() {
    if (this.helperForm.invalid) {
      return ;
    }
    this.prepare();
    this.template = `
      import { Action } from '@ngrx/store';

      export interface ${this.nameControl.value}State {
        ${this.stateModel}
      }
      
      export enum ${this.nameControl.value}ActionTypes {
        ${
          this.actions
            .map(a => `${a.type} = '${a.type}',\n\t\t`)
            .reduce((p,c) => p+c, '')
        }
      }

      ${
        this.actions
          .map(a => `
      export class ${this.nameControl.value}${a.type}Action implements Action {
        type = ${this.nameControl.value}ActionTypes.${a.type};
        constructor(
          ${Object.keys(JSON.parse(a.json))
            .map(k=>({k,v:JSON.parse(a.json)[k]}))
            .reduce((p,c) => p+`public ${c.k}: ${c.v}, `, '')}
        ) {}
      }
      `)
          .reduce((p,c) => p+c, '')
      }

      export type ${this.nameControl.value}ActionsUnion = ${
        this.actions
          .map(a => `${this.nameControl.value}${a.type}Action`)
          .reduce((p,c) => p?p+`\n\t\t|${c}`:c, '')
      };

      export function ${this.nameControl.value}Reducer (
        state: ${this.nameControl.value}State,
        action: ${this.nameControl.value}ActionsUnion
      ): ${this.nameControl.value}State {
        switch () {
          ${
            this.actions
              .map(a => `case ${this.nameControl.value}ActionTypes.${a.type}:\n\t\t`)
              .reduce((p,c) => p+c, '')
          }
          default:
            return state;
        }
      }

    `;
    console.log(this.template);
    this.templateHtml = this.template.replace(/\n/g, '<br/>');
    this.templateHtml = this.templateHtml.replace(/\t/g, '    ');
    this.templateHtml = this.templateHtml.replace(/ /g, '&nbsp;');
  }

}
