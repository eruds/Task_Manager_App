import { ID, Field, InputType } from "type-graphql";
import { Mission } from "../../../models/Mission";

@InputType({ description: "General Mission Input Type " })
export class MissionInput extends Mission {
	@Field(() => ID)
	missionId!: string;

	@Field(() => ID)
	skillId!: string;
}

@InputType({ description: "Add Mission input type" })
export class AddMissionInput extends MissionInput {
	@Field()
	title!: string;

	@Field()
	description!: string;
}

@InputType({ description: "Edit Mission input type " })
export class EditMissionInput extends MissionInput {
	@Field()
	description!: string;
}

@InputType({ description: "Add Mission Log input type " })
export class AddLogMissionInput extends MissionInput {
	@Field()
	description!: string;
}
