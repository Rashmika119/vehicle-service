import { Field, Int, ObjectType } from "@nestjs/graphql"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"


@ObjectType()
@Entity()
export class Vehicle {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Field()
    @Column()
    first_name: string

    @Field()
    @Column()
    last_name: string

    @Field()
    @Column()
    email: string

    @Field()
    @Column()
    car_make: string

    @Field()
    @Column()
    car_model: string

    @Field()
    @Column()
    vin: string

    @Field()
    @Column()
    manufactured_date: Date

    @Field(()=>Int) 
    get age():number{
        const today=new Date();
        const manufactured=new Date(this.manufactured_date);

        let age_of_vehicle=today.getFullYear()-manufactured.getFullYear()
        const month_gap=today.getMonth()-manufactured.getMonth()
        const date_gap=today.getDate()-manufactured.getDate()

        if(month_gap<0 || month_gap==0 && date_gap<0){
            age_of_vehicle--;
        }

        return age_of_vehicle;   

    }
    


}