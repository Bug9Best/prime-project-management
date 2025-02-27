import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InputAppForm, InputAppFormType } from "../components/app-form/app-form.component";

export var FormGroupProjectCreate = new FormGroup({
    project_name: new FormControl(null, [Validators.required]),
    project_description: new FormControl(null),
    project_privacy_type: new FormControl('PRIVATE', [Validators.required]),
    project_type: new FormControl(null, [Validators.required]),
});

export var listFormProjectCreate: InputAppForm[] = [
    {
        type: InputAppFormType.Text,
        label: "form.project.name",
        field: "project_name",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: InputAppFormType.Textarea,
        label: "form.project.description",
        field: "project_description",
        required: false,
        disabled: false,
        colWidth: 12,
    },
    {
        type: InputAppFormType.Toggle,
        label: "form.project.privacyType",
        field: "project_privacy_type",
        required: true,
        disabled: false,
        colWidth: 12,
    },
    {
        type: InputAppFormType.ProjectType,
        label: "form.project.type",
        field: "project_type",
        required: true,
        disabled: false,
        colWidth: 12,
    },
]