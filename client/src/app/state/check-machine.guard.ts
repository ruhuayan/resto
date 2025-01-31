import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PICKUP_ADDRESS } from './parcel.effects';
import { isValidPickupAddress } from './parcel.selectors';

export function checkMachineGuard(): CanActivateFn {
  return () => {
    const router = inject(Router);
    try {
      const address = localStorage.getItem(PICKUP_ADDRESS);
      if (address === null) {
        throw('No Address Found');
      }
      const pickupDetails = JSON.parse(address);
      if (!pickupDetails?._id) {
        throw('No Machine Found');
      }
      if (!isValidPickupAddress(pickupDetails)) {
        throw('Invalid Pickup Address');
      }
    } catch(err) {
      router.navigateByUrl('');
      return false;
    }
    return true;
  };
}
