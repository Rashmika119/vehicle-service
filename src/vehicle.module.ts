import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { VehicleResolver } from './vehicle.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle]),GraphQLModule.forRoot<ApolloDriverConfig>(
    {
      driver:ApolloDriver,
      autoSchemaFile:join(process.cwd(),'src/vehicle-SchemaDropCommand.gpl'),
      playground:true,
      debug:true,
    }
  ),
  TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port:5432,
    username:'postgres',
    password:'admin1234',
    database:'vehicle',
    entities:["dist/**/*.entity{.ts,.js}"],
    //this automatically create and update the database tables based on the entities
    synchronize:true,

  }),
  VehicleModule],
  controllers:[],
  providers: [VehicleService,VehicleResolver],
})
export class VehicleModule {}
