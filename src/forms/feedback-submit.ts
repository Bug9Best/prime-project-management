import { FormGroup, FormControl, Validators } from "@angular/forms";
import { InputAppForm, InputAppFormType } from "../components/app-form/app-form.component";

export var FormGroupFeedbackSubmit = new FormGroup({
    function: new FormControl(null, [Validators.required]),
    design: new FormControl(null, [Validators.required]),
    speed: new FormControl(null, [Validators.required]),
    satisfaction: new FormControl(null, [Validators.required]),
});

export var listFormFeedbackSubmit: InputAppForm[] = [
    {
        type: InputAppFormType.Number,
        label: "form.feedback.function",
        field: "function",
        required: true,
        disabled: false,
        colWidth: 6,
        isLimitLength: true,
        min: 1,
        max: 10,
    },
    {
        type: InputAppFormType.Number,
        label: "form.feedback.design",
        field: "design",
        required: true,
        disabled: false,
        colWidth: 6,
        isLimitLength: true,
        maxLength: 2,
        min: 1,
        max: 10,
    },
    {
        type: InputAppFormType.Number,
        label: "form.feedback.speed",
        field: "speed",
        required: true,
        disabled: false,
        colWidth: 6,
        isLimitLength: true,
        maxLength: 2,
        min: 1,
        max: 10,
    },
    {
        type: InputAppFormType.Number,
        label: "form.feedback.satisfaction",
        field: "satisfaction",
        required: true,
        disabled: false,
        colWidth: 6,
        isLimitLength: true,
        maxLength: 2,
        min: 1,
        max: 10,
    },
]