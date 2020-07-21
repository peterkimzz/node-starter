import { v4 } from 'uuid'

export class OrderedUUID {
  static Generate(): string {
    const tokens = v4().split('-')

    return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4]
  }

  static ToBinary(uuid: string): Buffer {
    return Buffer.from(uuid, 'hex')
  }

  static ToString(binary_uuid: Buffer): string {
    return Buffer.from(binary_uuid).toString('hex')
  }
}
