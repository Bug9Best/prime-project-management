import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ChaosUsb {
  
  async all() {
    const device = await (navigator as any).usb.requestDevice({ filters: [] });
    console.log(device);
  }
}