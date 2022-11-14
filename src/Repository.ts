import { Agent } from "./entity/Agent";
import { AppDataSource } from "./data-source";
import { Dispatch } from "./entity/Dispatch";
import { Division } from "./entity/Division";
import { Message } from "./entity/Message";

class Repository{
    divRepo= AppDataSource.getRepository(Division);
    msgRepo= AppDataSource.getRepository(Message);
    agtRepo= AppDataSource.getRepository(Agent);
    dspcRepo= AppDataSource.getRepository(Dispatch);

    async registerDivsion(){
        const div =new Division();
        this.divRepo.save(div);
    }
    async getDivision(id:number){
        return this.divRepo.findOneOrFail({
            where:{id : id },
        });
    }
    async getManyDivisions(n:number){
        return this.divRepo.find({
            take:n
        });
    }
    async registerMessage(content:string, divisionId:number , done:boolean){
        const msg =new Message();
        msg.content=content;
        this.getDivision(divisionId).then((value:Division)=> {
            msg.divisionId=value;
            this.msgRepo.save(msg);
            }).catch((err:String)=>console.log("no such division"));
        msg.done=done;
        this.msgRepo.save(msg);
    }
    async getMessage(id:number){
        return this.msgRepo.findOneOrFail({
            where:{id : id },
        });
    }
    async getManyMessages(n:number){
        return this.msgRepo.find({
            take:n
        });
    }
    async registerAgent(divisionId:number){
        const agt =new Agent();
        this.getDivision(divisionId).then((value:Division)=> {
            agt.divisionId=value;
            this.agtRepo.save(agt);
            }).catch((err:String)=>console.log("no such division"));
    }
    async getAgent(id:number){
        return this.agtRepo.findOneOrFail({
            where:{id : id },
        });
    }
    async getManyAgents(n:number){
        return this.agtRepo.find({
            take:n
        });
    }
    async registerDispach(agentId:number, messageId:number){
        const dspc =new Dispatch();
        this.getAgent(agentId).then((value:Agent)=> {
            dspc.agentId=value;
            this.getMessage(messageId).then((value:Message)=>{
            dspc.messageId=value;
            this.dspcRepo.save(dspc);}
            ).catch((err)=>console.log("no such message"));
            }).catch((err:String)=>console.log("no such agent"));
    }
    async getDispach(id:number){
        return this.dspcRepo.findOneOrFail({
            where:{id : id },
        });
    }
    async getManyDispaches(n:number){
        return this.dspcRepo.find({
            take:n
        });
    }
}
export default new Repository();