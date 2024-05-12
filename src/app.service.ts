import { Injectable } from '@nestjs/common';
import { ClnNodeServiceService } from './cln-node-service/cln-node-service.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LnService {
  minAmount: number;
  maxAmount: number;
  constructor(
    private readonly clnService: ClnNodeServiceService,
    private readonly configService: ConfigService,
  ) {
    this.minAmount = this.configService.get<number>('MIN_AMOUNT');
    this.maxAmount = this.configService.get<number>('MAX_AMOUNT');
  }

  async getLnAddress(pubkey: string, amount: number) {
    if (amount < this.minAmount || amount > this.maxAmount) {
      return { status: 'ERROR', reason: 'AmountOutOfRange' };
    }
    try {
      const invoice = await this.clnService.createInvoice(amount);
      return {
        pr: invoice.bolt11,
        successAction: {
          tag: 'message',
          message: this.configService.get<string>('MESSAGE'),
        },
        disposable: false,
        routes: [],
      };
    } catch (ex) {
      console.error('An exception occured', ex.message);
      return { status: 'ERROR', reason: 'ErrorCreatingInvoice' };
    }
  }

  async getLnUrl(name: string) {
    return {
      callback: `http://localhost:3000/api/v1/pay/${name}`,
      maxSendable: 100000000,
      minSendable: 1000,
      metadata: [['text/plain', 'Boltz Box']],
      commentAllowed: 0,
      tag: 'payRequest',
    };
  }
}
