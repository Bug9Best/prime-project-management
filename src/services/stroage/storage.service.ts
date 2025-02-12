import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class FirebaseStorageService {
  private storage = inject(Storage);
  constructor(private messageService: MessageService) { }

  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file) return reject('No file selected');

      const storageRef = ref(this.storage, file.name);
      const fileUpload = uploadBytesResumable(storageRef, file);

      fileUpload.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
        (error) => {
          console.error('Upload failed', error);
          this.messageService.add({
            key: 'app',
            severity: 'error',
            summary: 'Upload Failed',
            detail: error.message,
          });
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(storageRef);
            this.messageService.add({
              key: 'app',
              severity: 'success',
              summary: 'Success',
              detail: `${file.name} uploaded successfully!`,
            });
            resolve(downloadURL);
          } catch (error) {
            console.error('Error getting download URL', error);
            reject(error);
          }
        }
      );
    });
  }
}
