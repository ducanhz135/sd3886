import { AbstractControl, ValidatorFn, Validator, FormControl } from "@angular/forms";
import { group } from '@angular/animations';

export function forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

        const forbiddenName = /admin/i.test(control.value);

        return forbiddenName ? { "forbiddenName": true } : null
    };
}

export function matchName(): ValidatorFn {
    
    return (group: AbstractControl): { [key: string]: any } | null => {
        
        const nameControl = group.get("Name");

        const seoAliasControl = group.get("SeoAlias");
        // if (nameControl.value === seoAliasControl.value || seoAliasControl.pristine) {
        //     return null;
        //   } else {
        //     return { 'nameMissMatch': true };
        //   }
        return nameControl.value === seoAliasControl.value || seoAliasControl.pristine ? null:{ 'nameMissMatch': true };
    };
}

export function fileExtensionValidator(validExt: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

        // const thumbnailImage = control.get("ThumbnailImage");

        // return thumbnailImage.value == null || thumbnailImage.value.length == 0 ? { "invalidFile" : true} : null;
        let forbidden = true;
        if (control.value) {
          const fileExt = control.value.split('.').pop();
          validExt.split(',').forEach(ext => {
            if (ext.trim() == fileExt) {
             forbidden = false;
           }
          });
        }
        return forbidden ? { 'inValidExt': true } : null;
    
    };
}

export function emailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

        const forbiddenName = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(control.value);

        return forbiddenName ? { "invalidFormat": true } : null
    };
}

export function matchPassword(): ValidatorFn {
    
    return (group: AbstractControl): { [key: string]: any } | null => {
        
        const passwordControl = group.get("Password");

        const confirmPasswordControl = group.get("ConfirmPassword");

        return passwordControl.value === confirmPasswordControl.value || confirmPasswordControl.pristine ? null:{ 'confirmPasswordMissMatch': true };
    };
}