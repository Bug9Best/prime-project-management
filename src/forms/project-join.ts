import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InputAppForm, InputAppFormType } from "../components/app-form/app-form.component";

export var FormGroupProjectJoin = new FormGroup({
    project_code: new FormControl(null, [Validators.required]),
});

export var listFormProjectJoin: InputAppForm[] = [
    {
        type: InputAppFormType.Text,
        label: "form.join.code",
        field: "project_code",
        required: true,
        disabled: false,
        colWidth: 12,
        maxLength: 10,
    },
]