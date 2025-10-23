import { Field, InputType } from "@nestjs/graphql"

@InputType()
export class SearchVehicleinput{
    
        @Field({nullable:true})
        car_model: string
    

}