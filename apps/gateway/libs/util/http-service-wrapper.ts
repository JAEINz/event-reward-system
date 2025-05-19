import { HttpException } from '@nestjs/common';
import { Observable, firstValueFrom } from 'rxjs';

export async function forwardHttpRequest<T>(
  observable: Observable<T>,
): Promise<T> {
  try {
    return await firstValueFrom(observable);
  } catch (error) {
    if (error.isAxiosError && error.response) {
      const { status, data } = error.response;
      throw new HttpException(data, status);
    }
    throw error;
  }
}
