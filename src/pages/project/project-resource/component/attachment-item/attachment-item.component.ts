import { CommonModule } from '@angular/common';
import { Component, Input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FileAttachment } from '../../../../../services/project-resource/project-resource.service';

@Component({
  selector: 'attachments-item',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
  ],
  templateUrl: './attachment-item.component.html',
  styleUrl: './attachment-item.component.scss',
})
export class AttachmentsItem {
  @Input()
  file!: any;

  @Input()
  index!: number;
  
  @Input()
  isOpenFile: boolean= false;

  fileTypeMapping: Record<string, { icon: string; color: string; bgColor: string; type?: string }> = {
    'image/jpg': {
      icon: 'pi-images',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      type: 'jpg',
    },
    'image/jpeg': {
      icon: 'pi-images',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      type: 'jpeg',
    },
    'image/png': {
      icon: 'pi-images',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      type: 'png',
    },
    'video/mp4': {
      icon: 'pi-video',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      type: 'mp4',
    },
    'audio/mp3': {
      icon: 'pi-volume-down',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      type: 'mp3',
    },
    'text/plain': {
      icon: 'pi-file',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      type: 'txt',
    },
    'application/json': {
      icon: 'json',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      type: 'json',
    },
    'application/pdf': {
      icon: 'pi-file-pdf',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      type: 'pdf',
    },
    'application/msword': {
      icon: 'pi-file-word',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      type: 'doc',
    },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      icon: 'pi-file-word',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      type: 'docx',
    },
    'application/vnd.ms-excel': {
      icon: 'pi-file-excel',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      type: 'xls',
    },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
      icon: 'pi-file-excel',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      type: 'xlsx',
    },
    'application/vnd.ms-powerpoint': {
      icon: 'ppt',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      type: 'ppt',
    },
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
    {
      icon: 'pptx',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      type: 'pptx',
    },
  };

  getFileSize() {
    return this.formatSize(this.file.size);
  }

  getFileIcon() {
    return (
      this.fileTypeMapping[this.file.type] || {
        icon: 'pi-file',
        color: 'text-gray-600',
        bgColor: 'bg-gray-100',
        type: 'file',
      }
    );
  }

  formatSize(bytes: number) {
    const k = 1024;
    const dm = 3;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
    return `${formattedSize}${sizes[i]}`;
  }
}
