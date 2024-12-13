import { Module } from '@nestjs/common';
import { CacheModule as LibCacheModule } from 'core/cache';
import { LruStore } from 'core/cache/stores/lru';
import { RedisStore } from 'core/cache/stores/redis';
import Redis from 'ioredis';
import { ConfigService } from '../config/config.service';
import { ILogger, LoggerToken } from '../logger';

@Module({
  imports: [
    LibCacheModule.registerAsync({
      inject: [ConfigService, LoggerToken('redis')],
      useFactory: (config: ConfigService, logger: ILogger) => {
        const connStr = config.redis.url;
        if (!connStr) {
          const store = new LruStore(config.lruCache);
          return { store };
        }
        const redis = new Redis(connStr);
        redis.on('ready', () => {
          logger.info('Connection established');
        });
        redis.on('error', (error) => {
          logger.error('Connection encountered an error', { error });
        });
        const store = new RedisStore(redis);
        return { store };
      },
    }),
  ],
  exports: [LibCacheModule],
})
export class CacheModule {}
