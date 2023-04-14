import json
import logging
import os

import pika

from subtitle import get_subtitle_text
# from processor import process_text


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def callback(ch, method, properties, body):
 #   logger.info(f"Received message: {body}")

    try:
        # Parse message payload as JSON
        payload = json.loads(body)

        # Get subtitles text by ID
        subtitleId = payload["subtitleId"]
       
        
        text = get_subtitle_text(subtitleId)

        # Process text to extract entities and emotions
 #       entities, emotions = process_text(text)

        # TODO: Do something with entities and emotions, e.g. store them in a database

    except Exception as e:
        
        logger.error(f"Error processing message: {e}")

    finally:
        ch.basic_ack(delivery_tag=method.delivery_tag)


def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()

    # Declara a fila "subtitle-process"
    channel.queue_declare(queue='subtitles-process', durable=True)


    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='subtitles-process', on_message_callback=callback)

    logger.info("Waiting for messages...")
    channel.start_consuming()


if __name__ == "__main__":
    main()
