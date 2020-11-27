import { ID, Field, InputType } from "type-graphql";
import { Mission } from "../../../models/Mission";

@InputType({ description: "General Mission Input Type " })
export class MissionInput extends Mission {
	@Field()
	missionId!: string;

	@Field()
	skillId!: string;
}

@InputType({ description: "Add Mission input type" })
export class AddMissionInput implements Partial<MissionInput> {
	@Field()
	skillId!: string;

	@Field()
	title!: string;

	@Field()
	description!: string;
}

@InputType({ description: "Edit Mission input type " })
export class EditMissionInput implements Partial<MissionInput> {
	@Field()
	skillId!: string;

	@Field()
	missionId!: string;

	@Field()
	title!: string;

	@Field()
	description!: string;
}

@InputType({ description: "Add Mission Log input type " })
export class AddLogMissionInput implements Partial<MissionInput> {
	@Field()
	missionId!: string;

	@Field()
	skillId!: string;

	@Field()
	description!: string;
}
