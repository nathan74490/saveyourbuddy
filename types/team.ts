import User from "./user";

export default interface Team {
    id_team: number;
    team_name: string;
    id_game: number | null;
    users: User[];
}
