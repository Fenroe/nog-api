import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateReminderDto {
    @IsNotEmpty()
    event: string;

    message: string;

    eventDate: Date;

    @IsEnum(['six hours before', 'twelve hours before', 'one day before'])
    remindOn: string;

    discordServerId: string;

    @IsEnum(['never', 'every day', 'every week', 'every two weeks'])
    recursOn: string;
}
