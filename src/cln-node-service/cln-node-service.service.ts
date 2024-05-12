import { ClientGrpc } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
@Injectable()
export class ClnNodeServiceService {
  constructor(@Inject('NODE_PACKAGE') private client: ClientGrpc) {}

  private nodeService: any;

  private packageDefinition = protoLoader.loadSync('./dist/proto/node.proto');
  private proto = grpc.loadPackageDefinition(this.packageDefinition);

  async onModuleInit() {
    this.nodeService = this.client.getService('Node');
    const info = await this.nodeService.Getinfo({}).toPromise();
    console.log(info);
  }

  async createInvoice(msat: number) {
    console.log('createInvoice');
    const invoiceRequest = {
      description: 'ln-url/address request',
      label: Math.random().toFixed(2), // needs to be unique
      cltv: 123,
      expiry: 456,
      amount_msat: {
        amount: {
          msat,
        },
      },
    };

    try {
      return this.nodeService.invoice(invoiceRequest).toPromise();
    } catch (ex) {
      console.error('An exception occurred', ex.message);
      return { status: 'ERROR', reason: 'ErrorCreatingInvoice' };
    }
  }
}
