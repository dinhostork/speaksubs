import { connect, Connection, ConfirmChannel } from "amqplib";

interface RabbitMQConfig {
  url: string;
  queue: string;
  exchange?: string;
}

export class RabbitMQService {
  private connection: Connection | null = null;
  private channel: ConfirmChannel | null = null;
  private readonly config: RabbitMQConfig;

  constructor(config: RabbitMQConfig) {
    this.config = config;
  }

  private async connect(): Promise<void> {
    this.connection = await connect(this.config.url);
    this.channel = await this.connection.createConfirmChannel();
    await this.channel.assertQueue(this.config.queue);
    await this.channel.assertExchange(this.config.exchange, "direct");
    await this.channel.bindQueue(this.config.queue, "subtitles", "");
  }
  

  private async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.close();
    }
  }

  async sendMessage(message: any): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }

    const jsonMessage = JSON.stringify(message);
    await this.channel.sendToQueue(this.config.queue, Buffer.from(jsonMessage));
    await this.channel.waitForConfirms();
    await this.disconnect();
  }
}
