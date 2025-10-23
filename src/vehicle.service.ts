import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { Repository } from 'typeorm';
import { CreateVehicleInput } from './dto/create-vehicle.input';
import { UpdateVehicleInput } from './dto/update-vehicle.input';
import { SearchVehicleinput } from './dto/search-vehicle.input';

@Injectable()
export class VehicleService {

  //with @injectRepository, we don't need to manually create interfaces for entities.typeorm automatically create them for entities
  constructor(@InjectRepository(Vehicle) private vehicleRepository: Repository<Vehicle>,) { }


  async findAll(): Promise<Vehicle[]> {
    return this.vehicleRepository.find({
      order: { manufactured_date: 'ASC' }
    });
  }

  async findOne(id: string) {
    return this.vehicleRepository.findOne({ where: { id } });
  }

  async create(vehicleObject: CreateVehicleInput): Promise<Vehicle> {
    try{
    let vehicle = this.vehicleRepository.create(vehicleObject
     )
    ;
    const savedVehicle= await this.vehicleRepository.save(vehicle)
    console.log("Saved vehicle:", savedVehicle);
    return savedVehicle
  }catch(error){
        console.error("Error saving vehicle:", error);
    throw new Error("Failed to create vehicle");
  }
  }

  async update(id: string, updateVehicleInput: UpdateVehicleInput) {
    let vehicle: Vehicle = this.vehicleRepository.create(updateVehicleInput);
    vehicle.id = id;
    return this.vehicleRepository.save(vehicle)
  }

  async remove(id: string) {
    let vehicle = await this.findOne(id)
    if (vehicle) {
      let result = await this.vehicleRepository.delete(id);
      if (result.affected == 1) {
        return result
      }
    }
    throw new NotFoundException(`Record cannot find by id ${id}`)
  }
  async search(search: SearchVehicleinput): Promise<Vehicle[]> {
    const query = this.vehicleRepository.createQueryBuilder('vehicle');

    if (search.car_model) {
      query.andWhere('vehicle.car_model ILIKE:car_model', { car_model: `%${search.car_model}%` });
    }
    return query.getMany()
  }

}
