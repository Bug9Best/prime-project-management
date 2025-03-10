import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InputAppForm, InputAppFormType } from "../components/app-form/app-form.component";

export var FormGroupProjectEdit = new FormGroup({
    project_name: new FormControl(null, [Validators.required]),
    project_description: new FormControl(null),
    project_privacy_type: new FormControl('PRIVATE', [Validators.required]),
    project_type: new FormControl(null, [Validators.required]),
});

export var listFormProjectEdit: InputAppForm[] = [
    {
        type: InputAppFormType.Text,
        label: "form.project.name",
        field: "project_name",
        required: true,
        disabled: false,
        colWidth: 12,
    },
]