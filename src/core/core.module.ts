import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderModule } from 'core/data-loader';
import { EmailModule } from 'core/nestjs-email';
import { AwsS3Factory } from './aws-s3.factory';
import { CacheModule } from './cache/cache.module';
import { CliModule } from './cli/cli.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { CoreController } from './core.controller';
import { DataLoaderConfig } from './data-loader/data-loader.config';
import { DatabaseModule } from './database/database.module';
import { EdgeDBModule } from './edgedb/edgedb.module';
import { EventsModule } from './events';
import { ExceptionFilter } from './exception/exception.filter';
import { ExceptionNormalizer } from './exception/exception.normalizer';
import { GraphqlModule } from './graphql';
import { HttpModule } from './http';
import { ResourceModule } from './resources/resource.module';
import { ScalarProviders } from './scalars.resolver';
import { ShutdownHookProvider } from './shutdown.hook';
import { TimeoutInterceptor } from './timeout.interceptor';
import { TracingModule } from './tracing';
import { ValidationModule } from './validation/validation.module';
import { WaitResolver } from './wait.resolver';

@Global()
@Module({
  imports: [
    HttpModule,
    ConfigModule,
    CacheModule,
    CliModule,
    DatabaseModule,
    DataLoaderModule.registerAsync({ useClass: DataLoaderConfig }),
    EdgeDBModule,
    EmailModule.forRootAsync({ useExisting: ConfigService }),
    GraphqlModule,
    EventsModule,
    TracingModule,
    ResourceModule,
    ValidationModule,
  ],
  providers: [
    AwsS3Factory,
    ExceptionNormalizer,
    ExceptionFilter,
    { provide: APP_FILTER, useExisting: ExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    WaitResolver,
    ...ScalarProviders,
    ShutdownHookProvider,
  ],
  controllers: [CoreController],
  exports: [
    HttpModule,
    AwsS3Factory,
    ConfigModule,
    CacheModule,
    GraphqlModule,
    DatabaseModule,
    DataLoaderModule,
    EdgeDBModule,
    EmailModule,
    EventsModule,
    ResourceModule,
    ShutdownHookProvider,
    TracingModule,
    ValidationModule,
  ],
})
export class CoreModule {}
